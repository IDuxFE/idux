/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeTypes, defineComponent, inject, normalizeClass, onMounted, ref, watch, withKeys } from 'vue'

import { isArray } from 'lodash-es'

import { useState } from '@idux/cdk/utils'
import { ɵInput, type ɵInputInstance } from '@idux/components/_private/input'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxIcon } from '@idux/components/icon'

import { TRANSFER_OPERATIONS_TOKEN, TRANSFER_SOURCE_TOKEN, TRANSFER_TARGET_TOKEN, transferContext } from '../token'
import { transferHeaderProps } from '../types'
import { convertToSlotParams } from '../utils'

export default defineComponent({
  props: transferHeaderProps,
  setup(props) {
    const { props: transferProps, slots, config, locale, mergedPrefixCls } = inject(transferContext)!
    const transferBindings = props.isSource ? inject(TRANSFER_SOURCE_TOKEN)! : inject(TRANSFER_TARGET_TOKEN)!
    const { clearDisabled, triggerClear } = inject(TRANSFER_OPERATIONS_TOKEN)!

    const {
      showSelectAll,
      data,
      selectAllDisabled,
      selectAllStatus,
      searchable,
      searchPlaceholder,
      searchValue,
      handleSearchChange,
      selectAll,
    } = transferBindings

    const [searchInputValue, setSearchInputValue] = useState<string>('')

    const inputRef = ref<ɵInputInstance>()
    const syncValue = () => {
      const element = inputRef.value?.getInputElement()
      if (element && element.value !== searchValue.value) {
        element.value = searchValue.value
      }
      if (searchInputValue.value !== searchValue.value) {
        setSearchInputValue(searchValue.value)
      }
    }
    onMounted(() => {
      syncValue()
    })
    watch(searchValue, () => {
      syncValue()
    })
    const triggerSearch = () => {
      handleSearchChange(searchInputValue.value)
    }

    const handleInput = (evt: Event) => {
      const value = (evt.target as HTMLInputElement).value
      setSearchInputValue(value)

      if (!value) {
        triggerSearch()
      }
    }
    const handleKeyDown = withKeys(() => {
      triggerSearch()
    }, ['enter'])
    const handleCheckChange = (value: boolean | string | number) => {
      selectAll(!!value)
    }

    const renderCheckAll = (prefixCls: string) => {
      if (!showSelectAll.value || (!props.isSource && transferProps.mode === 'immediate')) {
        return
      }

      return (
        <IxCheckbox
          class={`${prefixCls}-check-all`}
          checked={selectAllStatus.value.checked}
          indeterminate={selectAllStatus.value.indeterminate}
          disabled={selectAllDisabled.value}
          onChange={handleCheckChange}
        />
      )
    }
    const renderLabel = (prefixCls: string) => {
      let children: VNodeTypes
      if (slots.headerLabel) {
        children = slots.headerLabel({ data: data.value, isSource: props.isSource })
      } else {
        children = `${props.isSource ? locale.toSelect : locale.selected} (${data.value.length})`
      }

      return <span class={`${prefixCls}-label`}>{children}</span>
    }
    const renderInput = (prefixCls: string) => {
      if (!searchable.value) {
        return
      }

      const inputSlots = {
        suffix: () => <IxIcon class={`${prefixCls}-search-icon`} name="search" onClick={triggerSearch} />,
      }

      return (
        <ɵInput
          ref={inputRef}
          class={`${prefixCls}-search-input`}
          v-slots={inputSlots}
          disabled={transferProps.disabled}
          type="text"
          size="sm"
          placeholder={searchPlaceholder.value}
          onInput={handleInput}
          onKeydown={handleKeyDown}
        />
      )
    }
    const renderClearIcon = (prefixCls: string) => {
      if (props.isSource || !(transferProps.clearable ?? config.clearable)) {
        return
      }

      const classes = normalizeClass({
        [`${prefixCls}-clear-icon`]: true,
        [`${prefixCls}-clear-icon-disabled`]: clearDisabled.value,
      })

      return (
        <span class={classes} onClick={triggerClear}>
          {slots.clearIcon ? slots.clearIcon() : <IxIcon name={transferProps.clearIcon ?? config.clearIcon} />}
        </span>
      )
    }

    const renderSuffix = (prefixCls: string) => {
      const suffix = slots.headerSuffix?.({ isSource: props.isSource })

      return suffix && <span class={`${prefixCls}-suffix`}>{suffix}</span>
    }

    const renderHeader = (prefixCls: string) => {
      if (slots.header) {
        return slots.header({ ...convertToSlotParams(transferBindings), isSource: props.isSource })
      }

      return (
        <div class={`${prefixCls}-inner`}>
          {renderCheckAll(prefixCls)}
          {renderLabel(prefixCls)}
          {renderInput(prefixCls)}
          {renderClearIcon(prefixCls)}
          {renderSuffix(prefixCls)}
        </div>
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-header`

      const children = renderHeader(prefixCls)

      if (!children || (isArray(children) && children.length <= 0)) {
        return
      }

      return <div class={prefixCls}>{children}</div>
    }
  },
})
