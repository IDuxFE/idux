/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, VNodeTypes, computed, defineComponent, inject, normalizeClass, watch } from 'vue'

import { VKey, useState } from '@idux/cdk/utils'
import { IxButton } from '@idux/components/button'
import { IxCheckbox } from '@idux/components/checkbox'
import { type DropdownProps, IxDropdown } from '@idux/components/dropdown'
import { TableLocale } from '@idux/components/i18n'
import { IxIcon } from '@idux/components/icon'
import { IxMenu, MenuData, type MenuItemProps, type MenuProps } from '@idux/components/menu'
import { IxRadio } from '@idux/components/radio'

import { TABLE_TOKEN } from '../../../token'
import { tableFilterableTriggerProps } from '../../../types'

export default defineComponent({
  props: tableFilterableTriggerProps,
  setup(props) {
    const { config, locale, mergedPrefixCls } = inject(TABLE_TOKEN)!

    const multiple = computed(() => props.filterable.multiple ?? config.columnBase.filterable.multiple)
    const footer = computed(() => props.filterable.footer ?? config.columnBase.filterable.footer)

    const labelRender = (item: MenuItemProps & { selected: boolean }) => {
      const prefixCls = `${mergedPrefixCls.value}-filterable-menu-label`
      const Node = multiple.value ? IxCheckbox : IxRadio
      return (
        <span class={prefixCls}>
          {<Node checked={item.selected} disabled={item.disabled} />}
          <span class={`${prefixCls}-content`}>{item.label}</span>
        </span>
      )
    }

    const mergedMenus = computed(() => {
      return props.filterable.menus.map(item => {
        const { type } = item
        if ((!type || type === 'item') && (!item.slots || !item.slots.label)) {
          return { ...item, slots: { label: labelRender, ...item.slots } }
        }
        return item
      })
    })

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

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-filterable-trigger`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-active`]: props.activeFilterBy.length > 0,
      })
    })

    const renderOverlay = () => {
      const children: VNodeTypes[] = [renderMenu(mergedMenus, multiple, selectedKeys, setSelectedKeys)]
      if (footer.value) {
        children.push(renderFooter(locale, mergedPrefixCls, handleConfirm, handleReset))
      }
      return children
    }

    const renderTrigger = () => (
      <span class={classes.value} onClick={evt => evt.stopPropagation()}>
        <IxIcon name="filter-filled" />
      </span>
    )

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
  mergedMenus: ComputedRef<MenuData[]>,
  multiple: ComputedRef<boolean>,
  selectedKeys: ComputedRef<VKey[]>,
  setSelectedKeys: (value: VKey[]) => void,
) => {
  const menuProps: MenuProps = {
    dataSource: mergedMenus.value,
    multiple: multiple.value,
    selectable: true,
    selectedKeys: selectedKeys.value,
    'onUpdate:selectedKeys': setSelectedKeys,
  }
  return <IxMenu {...menuProps} />
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
