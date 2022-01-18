/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedOption } from '../composables/useOptions'
import type { VNodeChild } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { Logger } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

import { selectToken } from '../token'
import { selectorProps } from '../types'
import { renderOptionLabel } from '../utils/renderOptionLabel'
import Input from './Input'
import Item from './Item'

export default defineComponent({
  props: selectorProps,
  setup(props) {
    const {
      props: selectProps,
      slots,
      mergedPrefixCls,
      isDisabled,
      selectedValue,
      selectedOptions,
      handleItemRemove,
      handleClear,
      inputValue,
      isComposing,
    } = inject(selectToken)!

    const selectedItems = computed(() => {
      const { maxLabelCount } = selectProps
      const options = selectedOptions.value
      const items = options.slice(0, maxLabelCount) as Array<MergedOption & { isMax?: boolean }>
      if (options.length > maxLabelCount) {
        const key = 'IDUX_SELECT_MAX_ITEM'
        const label = `+ ${options.length - maxLabelCount} ...`
        const value = options.slice(maxLabelCount).map(option => option.rawOption)
        items.push({ isMax: true, key, label, value } as MergedOption & { isMax?: boolean })
      }
      return items
    })

    const showItems = computed(() => {
      return (
        selectProps.multiple ||
        (selectedValue.value.length > 0 &&
          !isComposing.value &&
          (!inputValue.value || selectProps.searchable === 'overlay'))
      )
    })

    const showPlaceholder = computed(() => {
      return (
        selectedValue.value.length === 0 &&
        !isComposing.value &&
        (!inputValue.value || selectProps.searchable === 'overlay')
      )
    })

    return () => {
      const { clearable, suffix } = props
      const { multiple, readonly } = selectProps
      const disabled = isDisabled.value
      const prefixCls = `${mergedPrefixCls.value}-selector`

      const itemPrefixCls = `${prefixCls}-item`
      const itemNodes = selectedItems.value.map(item => {
        const { key, isMax, label, value, rawOption } = item
        const _disabled = disabled || item.disabled
        const removable = multiple && !_disabled && !readonly && !isMax
        const itemProps = {
          key,
          disabled: _disabled,
          prefixCls: itemPrefixCls,
          removable,
          value,
          handleItemRemove,
          title: label,
        }
        let labelNode: VNodeChild | undefined
        if (isMax) {
          if (__DEV__ && slots.maxLabel) {
            Logger.warn('components/select', 'slot `maxLabel` is deprecated, please use slot `overflowedLabel` instead')
          }
          const overflowedLabelSlot = slots.overflowedLabel ?? slots.maxLabel
          labelNode = overflowedLabelSlot?.(item.value) ?? label
        } else {
          if (__DEV__ && slots.label) {
            Logger.warn('components/select', 'slots `label` is deprecated, please use slots `selectedLabel` instead')
          }
          const selectedLabelSlot = slots.label ?? slots.selectedLabel
          labelNode = selectedLabelSlot ? selectedLabelSlot(rawOption) : renderOptionLabel(slots, rawOption, label)
        }

        return <Item {...itemProps}>{labelNode}</Item>
      })

      return (
        <div class={prefixCls}>
          {showItems.value && itemNodes}
          <Input></Input>
          {showPlaceholder.value && (
            <div class={`${prefixCls}-placeholder`}> {slots.placeholder?.() ?? selectProps.placeholder}</div>
          )}
          {(slots.suffix || suffix) && (
            <div class={`${prefixCls}-suffix`}>{slots.suffix?.() ?? <IxIcon name={suffix} />}</div>
          )}
          {clearable && (
            <div class={`${prefixCls}-clear`} onClick={handleClear}>
              <IxIcon name="close-circle" />
            </div>
          )}
        </div>
      )
    }
  },
})
