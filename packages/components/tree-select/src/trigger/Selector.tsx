/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedNode } from '../composables/useDataSource'
import type { VNodeChild } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { Logger } from '@idux/cdk/utils'
import { ɵOverflow } from '@idux/components/_private/overflow'
import { IxIcon } from '@idux/components/icon'

import { treeSelectToken } from '../token'
import { treeSelectorProps } from '../types'
import Input from './Input'
import Item from './Item'

export default defineComponent({
  props: treeSelectorProps,
  setup(props) {
    const {
      props: treeSelectProps,
      slots,
      mergedPrefixCls,
      isDisabled,
      selectedValue,
      selectedNodes,
      handleItemRemove,
      handleClear,
      searchValue,
    } = inject(treeSelectToken)!

    const showItems = computed(() => {
      return treeSelectProps.multiple || (selectedValue.value.length > 0 && !searchValue.value)
    })

    const showPlaceholder = computed(() => {
      return selectedValue.value.length === 0 && (!searchValue.value || treeSelectProps.searchable === 'overlay')
    })

    return () => {
      const { clearable, suffix } = props
      const { multiple, readonly } = treeSelectProps
      const disabled = isDisabled.value
      const prefixCls = `${mergedPrefixCls.value}-selector`

      const itemPrefixCls = `${prefixCls}-item`

      if (__DEV__ && treeSelectProps.maxLabelCount) {
        Logger.warn('components/treeSelect', '`maxLabelCount` was deprecated, please use `maxLabel` instead')
      }

      if (__DEV__ && slots.maxLabel) {
        Logger.warn(
          'components/treeSelect',
          'slot `maxLabel` was deprecated, please use slot `overflowedLabel` instead',
        )
      }

      if (__DEV__ && slots.label) {
        Logger.warn('components/treeSelect', 'slots `label` was deprecated, please use slots `selectedLabel` instead')
      }

      const renderItem = (item: MergedNode) => {
        const { key, label, rawNode } = item
        const _disabled = disabled || item.selectDisabled
        const removable = multiple && !_disabled && !readonly

        const itemProps = {
          key,
          disabled: _disabled,
          prefixCls: itemPrefixCls,
          removable,
          title: label,
          handleItemRemove,
        }

        const selectedLabelSlot = slots.selectedLabel ?? slots.label
        const labelNode: VNodeChild | undefined = selectedLabelSlot ? selectedLabelSlot(rawNode) : label

        return <Item {...itemProps}>{labelNode}</Item>
      }
      const renderRest = (rest: MergedNode[]) => {
        const key = 'IDUX_TREE_SELECT_MAX_ITEM'

        const itemProps = {
          key,
          prefixCls: itemPrefixCls,
          removable: false,
        }

        const overflowedLabelSlot = slots.overflowedLabel ?? slots.maxLabel
        const labelNode: VNodeChild | undefined = overflowedLabelSlot?.(rest) ?? `+ ${rest.length} ...`

        return <Item {...itemProps}>{labelNode}</Item>
      }

      const singleItem = treeSelectProps.multiple ? null : selectedNodes.value.map(item => renderItem(item))

      const overflowSlot = {
        item: renderItem,
        rest: renderRest,
        suffix: () => <Input />,
      }

      return (
        <label class={prefixCls}>
          {treeSelectProps.multiple ? (
            <ɵOverflow
              v-slots={overflowSlot}
              prefixCls={prefixCls}
              dataSource={selectedNodes.value}
              maxLabel={treeSelectProps.maxLabelCount ?? treeSelectProps.maxLabel}
              getKey={(item: MergedNode) => item.key}
            />
          ) : (
            <>
              {showItems.value && singleItem}
              <Input />
            </>
          )}
          {showPlaceholder.value && (
            <div class={`${prefixCls}-placeholder`}> {slots.placeholder?.() ?? treeSelectProps.placeholder}</div>
          )}
          {(slots.suffix || suffix) && (
            <div class={`${prefixCls}-suffix`}>{slots.suffix?.() ?? <IxIcon name={suffix} />}</div>
          )}
          {clearable && (
            <div class={`${prefixCls}-clear`} onClick={handleClear}>
              <IxIcon name="close-circle" />
            </div>
          )}
        </label>
      )
    }
  },
})
