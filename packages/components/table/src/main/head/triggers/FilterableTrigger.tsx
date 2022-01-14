/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type VNodeChild, computed, defineComponent, inject, normalizeClass, watch } from 'vue'

import { isFunction, isString } from 'lodash-es'

import { type VKey, useState } from '@idux/cdk/utils'
import { IxButton } from '@idux/components/button'
import { IxCheckbox } from '@idux/components/checkbox'
import { type DropdownProps, IxDropdown } from '@idux/components/dropdown'
import { type TableLocale } from '@idux/components/i18n'
import { IxIcon } from '@idux/components/icon'
import { IxMenu, type MenuData, type MenuItemProps, type MenuProps } from '@idux/components/menu'
import { IxRadio } from '@idux/components/radio'

import { TABLE_TOKEN } from '../../../token'
import { tableFilterableTriggerProps } from '../../../types'

export default defineComponent({
  props: tableFilterableTriggerProps,
  setup(props) {
    const { slots, config, locale, mergedPrefixCls } = inject(TABLE_TOKEN)!

    const multiple = computed(() => props.filterable.multiple ?? config.columnBase.filterable.multiple)
    const footer = computed(() => props.filterable.footer ?? config.columnBase.filterable.footer)

    // eslint-disable-next-line vue/no-setup-props-destructure
    const initSelectedKeys = props.activeFilterBy
    const [selectedKeys, setSelectedKeys] = useState(() => initSelectedKeys)
    watch(
      () => props.activeFilterBy,
      keys => setSelectedKeys(keys),
    )

    const [visible, setVisible] = useState(false)
    const onUpdateVisible = (value: boolean) => {
      setVisible(value)
      if (!value) {
        props.onUpdateFilterBy(selectedKeys.value)
      }
    }

    const handleConfirm = () => {
      setVisible(false)
      props.onUpdateFilterBy(selectedKeys.value)
    }

    const handleReset = () => {
      setSelectedKeys(initSelectedKeys)
    }

    const customLabel = (item: MenuItemProps & { selected: boolean }) => {
      const prefixCls = `${mergedPrefixCls.value}-filterable-menu-label`
      const Node = multiple.value ? IxCheckbox : IxRadio
      return (
        <span class={prefixCls}>
          {<Node checked={item.selected} disabled={item.disabled} />}
          <span class={`${prefixCls}-content`}>{item.label}</span>
        </span>
      )
    }

    const renderOverlay = () => {
      const children: VNodeChild[] = []
      const { customMenu, menus } = props.filterable
      if (isFunction(customMenu)) {
        children.push(customMenu())
      } else if (isString(customMenu) && slots[customMenu]) {
        children.push(slots[customMenu]!())
      } else {
        children.push(renderMenu(menus, multiple, selectedKeys, setSelectedKeys, customLabel))
      }
      if (footer.value) {
        children.push(renderFooter(locale, mergedPrefixCls, handleConfirm, handleReset))
      }
      return children
    }

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-filterable-trigger`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-active`]: props.activeFilterBy.length > 0,
      })
    })

    const renderTrigger = () => {
      const { customTrigger } = props.filterable
      if (isFunction(customTrigger)) {
        return customTrigger()
      }
      if (isString(customTrigger) && slots[customTrigger]) {
        return slots[customTrigger]!()
      }
      return (
        <span class={classes.value} onClick={evt => evt.stopPropagation()}>
          <IxIcon name="filter-filled" />
        </span>
      )
    }

    return () => {
      const dropdownProps: DropdownProps = {
        visible: visible.value,
        hideOnClick: !footer.value,
        placement: 'bottomEnd',
        trigger: 'click',
        'onUpdate:visible': onUpdateVisible,
      }

      return <IxDropdown {...dropdownProps} v-slots={{ default: renderTrigger, overlay: renderOverlay }} />
    }
  },
})

const renderMenu = (
  menus: MenuData[],
  multiple: ComputedRef<boolean>,
  selectedKeys: ComputedRef<VKey[]>,
  setSelectedKeys: (value: VKey[]) => void,
  customLabel: (item: MenuItemProps & { selected: boolean }) => VNodeChild,
) => {
  const menuProps: MenuProps = {
    dataSource: menus,
    multiple: multiple.value,
    selectable: true,
    selectedKeys: selectedKeys.value,
    'onUpdate:selectedKeys': setSelectedKeys,
  }
  const slots = { itemLabel: customLabel }
  return <IxMenu v-slots={slots} {...menuProps} />
}

const renderFooter = (
  locale: ComputedRef<TableLocale>,
  mergedPrefixCls: ComputedRef<string>,
  handleConfirm: () => void,
  handleReset: () => void,
) => {
  const { filterConfirm, filterReset } = locale.value
  return (
    <div class={`${mergedPrefixCls.value}-filterable-trigger-footer`}>
      <IxButton mode="primary" size="sm" onClick={handleConfirm}>
        {filterConfirm}
      </IxButton>
      <IxButton size="sm" onClick={handleReset}>
        {filterReset}
      </IxButton>
    </div>
  )
}
