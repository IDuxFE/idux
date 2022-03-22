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
import { ɵOverflow } from '@idux/components/_private/overflow'
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
      config,
      mergedPrefixCls,
      isDisabled,
      selectedValue,
      selectedOptions,
      handleItemRemove,
      handleClear,
      inputValue,
      isComposing,
    } = inject(selectToken)!

    const showPlaceholder = computed(() => {
      return (
        selectedValue.value.length === 0 &&
        !isComposing.value &&
        (!inputValue.value || selectProps.searchable === 'overlay')
      )
    })

    const clearIcon = computed(() => selectProps.clearIcon ?? config.clearIcon)

    return () => {
      const { clearable, suffix } = props
      const { multiple, readonly } = selectProps
      const disabled = isDisabled.value
      const prefixCls = `${mergedPrefixCls.value}-selector`

      const itemPrefixCls = `${prefixCls}-item`

      if (__DEV__ && selectProps.maxLabelCount) {
        Logger.warn('components/select', '`maxLabelCount` was deprecated, please use `maxLabel` instead')
      }

      if (__DEV__ && slots.maxLabel) {
        Logger.warn('components/select', 'slot `maxLabel` was deprecated, please use slot `overflowedLabel` instead')
      }

      if (__DEV__ && slots.label) {
        Logger.warn('components/select', 'slots `label` was deprecated, please use slots `selectedLabel` instead')
      }

      const showItems = computed(() => {
        return (
          selectProps.multiple ||
          (selectedValue.value.length > 0 &&
            !isComposing.value &&
            (!inputValue.value || selectProps.searchable === 'overlay'))
        )
      })

      const renderItem = (item: MergedOption) => {
        const { key, label, value, rawOption } = item
        const _disabled = disabled || item.disabled
        const removable = multiple && !_disabled && !readonly
        const itemProps = {
          key,
          disabled: _disabled,
          prefixCls: itemPrefixCls,
          removable,
          value,
          handleItemRemove,
          title: label,
        }

        const selectedLabelSlot = slots.label ?? slots.selectedLabel
        const labelNode: VNodeChild | undefined = selectedLabelSlot
          ? selectedLabelSlot(rawOption)
          : renderOptionLabel(slots, rawOption, label)

        return <Item {...itemProps}>{labelNode}</Item>
      }
      const renderRest = (rest: MergedOption[]) => {
        const key = 'IDUX_SELECT_MAX_ITEM'
        const itemProps = {
          key,
          prefixCls: itemPrefixCls,
          removable: false,
          value: null,
        }

        const overflowedLabelSlot = slots.overflowedLabel ?? slots.maxLabel
        const labelNode: VNodeChild | undefined = overflowedLabelSlot?.(rest) ?? `+ ${rest.length} ...`

        return <Item {...itemProps}>{labelNode}</Item>
      }

      const singleItem = selectProps.multiple ? null : selectedOptions.value.map(item => renderItem(item))

      const overflowSlot = {
        item: renderItem,
        rest: renderRest,
        suffix: () => <Input />,
      }

      return (
        <div class={prefixCls}>
          {selectProps.multiple ? (
            <ɵOverflow
              v-slots={overflowSlot}
              prefixCls={prefixCls}
              dataSource={selectedOptions.value}
              maxLabel={selectProps.maxLabelCount ?? selectProps.maxLabel}
              getKey={(item: MergedOption) => item.key}
            />
          ) : (
            <>
              {showItems.value && singleItem}
              <Input />
            </>
          )}

          {showPlaceholder.value && (
            <div class={`${prefixCls}-placeholder`}> {slots.placeholder?.() ?? selectProps.placeholder}</div>
          )}
          {(slots.suffix || suffix) && (
            <div class={`${prefixCls}-suffix`}>{slots.suffix?.() ?? <IxIcon name={suffix} />}</div>
          )}
          {clearable && (
            <div class={`${prefixCls}-clear`} onClick={handleClear}>
              {slots.clearIcon ? slots.clearIcon() : <IxIcon name={clearIcon.value} />}
            </div>
          )}
        </div>
      )
    }
  },
})
