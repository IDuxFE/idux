/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedNode } from '../composables/useDataSource'
import type { VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'

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

    const selectedItems = computed(() => {
      const { maxLabelCount } = treeSelectProps
      const nodes = selectedNodes.value
      const items = nodes.slice(0, maxLabelCount) as Array<MergedNode & { isMax?: boolean }>
      if (nodes.length > maxLabelCount) {
        const label = `+ ${nodes.length - maxLabelCount} ...`
        const key = nodes.slice(maxLabelCount).map(node => node.rawNode)
        items.push({ isMax: true, key, label } as unknown as MergedNode & { isMax?: boolean })
      }
      return items
    })

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
      const itemNodes = selectedItems.value.map(item => {
        const { key, isMax, label } = item
        const _disabled = disabled || item.selectDisabled
        const removable = multiple && !_disabled && !readonly && !isMax

        const itemProps = {
          key,
          disabled: _disabled,
          prefixCls: itemPrefixCls,
          removable,
          title: label,
          handleItemRemove,
        }
        let labelNode: VNodeTypes | undefined
        if (isMax) {
          labelNode = slots.maxLabel?.(item.key) ?? label
        } else {
          labelNode = slots.label?.(item.rawNode) ?? label
        }
        return <Item {...itemProps}>{labelNode}</Item>
      })

      return (
        <label class={prefixCls}>
          {showItems.value && itemNodes}
          <Input></Input>
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
