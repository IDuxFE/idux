/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ComputedRef, type Slots, computed, defineComponent, normalizeClass, provide, ref, watch } from 'vue'

import { isBoolean } from 'lodash-es'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { type VirtualScrollToFn } from '@idux/cdk/scroll'
import { type VKey, callEmit, useControlledProp, useState } from '@idux/cdk/utils'
import { IxSelector, type SelectorInstance } from '@idux/components//selector'
import { ɵInput } from '@idux/components/_private/input'
import { type SelectConfig, useGlobalConfig } from '@idux/components/config'
import { type ControlTriggerSlots, IxControlTrigger } from '@idux/components/control-trigger'
import { useFormItemRegister, useFormStatus } from '@idux/components/form'
import { IxSpin } from '@idux/components/spin'
import { useThemeToken } from '@idux/components/theme'
import { useMergedCommonControlProps } from '@idux/components/utils'

import { useActiveState } from './composables/useActiveState'
import { GetKeyFn, useGetOptionKey } from './composables/useGetOptionKey'
import { useKeyboardEvents } from './composables/useKeyboardEvents'
import { useConvertedOptions, useFilteredOptions, useFlattenedOptions, useOptionKeyMap } from './composables/useOptions'
import { usePanelProps } from './composables/usePanelProps'
import { useSelectedState } from './composables/useSelectedState'
import Panel from './panel/Panel'
import { SELECT_PANEL_DATA_TOKEN } from './token'
import { type SelectData, type SelectPanelInstance, type SelectProps, selectProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxSelect',
  inheritAttrs: false,
  props: selectProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('select')
    registerToken(getThemeTokens)

    const config = useGlobalConfig('select')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-select`)

    const triggerRef = ref<SelectorInstance>()
    const focus = () => triggerRef.value?.focus()
    const blur = () => triggerRef.value?.blur()

    const panelRef = ref<SelectPanelInstance>()
    const scrollTo: VirtualScrollToFn = (...params) => panelRef.value?.scrollTo(...params)
    const changeActiveIndex = (offset: number) => panelRef.value?.changeActiveIndex(offset)

    const [inputValue, _setInputValue] = useState('')
    const setInputValue = (input: string) => {
      _setInputValue(input)
      props.searchable && callEmit(props.onSearch, input)
    }
    const clearInput = () => {
      props.searchable === 'overlay' ? setInputValue('') : triggerRef.value?.clearInput()
    }

    expose({ focus, blur, scrollTo })

    const [overlayOpened, setOverlayOpened] = useControlledProp(props, 'open', false)
    const { accessor, control } = useAccessorAndControl()
    const commonControlProps = useMergedCommonControlProps(props, config)
    useFormItemRegister(control)
    const mergedStatus = useFormStatus(props, control)

    const getKey = useGetOptionKey(props, config)
    const { options, optionKeyMap } = useSelectOptions(props, config, slots, getKey, inputValue)

    provide(SELECT_PANEL_DATA_TOKEN, { flattenedOptions: options })

    const { selectedValue, selectedOptions, changeSelected, handleClear, handleRemove } = useSelectedState(
      props,
      accessor,
      optionKeyMap,
    )

    const { activeValue, setActiveValue } = useActiveState(props, inputValue)

    const handleKeyDown = useKeyboardEvents(
      props,
      inputValue,
      selectedValue,
      activeValue,
      overlayOpened,
      changeActiveIndex,
      changeSelected,
      handleRemove,
      clearInput,
      setOverlayOpened,
    )

    watch(overlayOpened, opened => {
      if (opened) {
        focus()
      }
    })

    const handleOptionClick = (option: SelectData) => {
      changeSelected(getKey.value(option) ?? option.key)
      ;(props.allowInput || !props.multiple) && clearInput()
      if (!props.multiple) {
        setOverlayOpened(false)
      }
    }

    const onFocus = (evt: FocusEvent) => {
      callEmit(props.onFocus, evt)
    }
    const onBlur = (evt: FocusEvent) => {
      if (props.allowInput && inputValue.value) {
        changeSelected(inputValue.value)
        clearInput()
      }

      accessor.markAsBlurred()
      callEmit(props.onBlur, evt)
    }

    const handleItemRemove = (value: VKey) => {
      focus()
      handleRemove(value)
    }

    const panelProps = usePanelProps(props, selectedValue, activeValue, setActiveValue, handleOptionClick)
    const overlayClasses = computed(() => {
      const { overlayClassName } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [`${prefixCls}-overlay`]: true,
        [overlayClassName || '']: !!overlayClassName,
      })
    })
    const selectorAllowInput = computed(() => {
      if (props.searchable === 'overlay') {
        return false
      }

      return props.searchable ? 'searchable' : props.allowInput
    })

    const renderTrigger: ControlTriggerSlots['trigger'] = ({
      borderless,
      status,
      clearable,
      clearIcon,
      readonly,
      disabled,
      size,
      suffix,
      suffixRotate,
      focused,
      opened,
    }) => [
      <IxSelector
        ref={triggerRef}
        v-slots={slots}
        class={mergedPrefixCls.value}
        allowInput={selectorAllowInput.value}
        autocomplete={props.autocomplete}
        autofocus={props.autofocus}
        borderless={borderless}
        clearable={clearable}
        clearIcon={clearIcon}
        dataSource={selectedOptions.value}
        disabled={disabled}
        focused={focused}
        maxLabel={props.maxLabel}
        multiple={props.multiple}
        monitorFocus={false}
        opened={opened}
        placeholder={props.placeholder}
        readonly={readonly}
        size={size}
        status={status}
        suffix={suffix}
        suffixRotate={suffixRotate}
        onClear={handleClear}
        onInputValueChange={setInputValue}
        onItemRemove={handleItemRemove}
        onKeydown={handleKeyDown}
      />,
    ]

    const renderLoading = (children: JSX.Element) => {
      const { spin } = props
      const spinProps = isBoolean(spin) ? { spinning: spin } : spin
      return spinProps ? <IxSpin {...spinProps}>{children}</IxSpin> : children
    }

    const renderContent: ControlTriggerSlots['overlay'] = () => {
      const children = [renderLoading(<Panel ref={panelRef} v-slots={slots} {...panelProps.value} />)]
      const { searchable, overlayRender } = props

      if (searchable === 'overlay') {
        const value = inputValue.value
        const clearIcon = props.clearIcon ?? config.clearIcon
        const handleSearchInput = (evt: Event) => {
          const { value } = evt.target as HTMLInputElement
          setInputValue(value)
        }
        const handleSearchClear = () => {
          setInputValue('')
        }

        children.unshift(
          <div class={`${mergedPrefixCls.value}-overlay-search-wrapper`}>
            <ɵInput
              clearable
              clearIcon={clearIcon}
              clearVisible={!!value}
              placeholder={props.searchPlaceholder}
              size="sm"
              suffix="search"
              value={value}
              onClear={handleSearchClear}
              onInput={handleSearchInput}
            />
          </div>,
        )
      }

      return [<div>{overlayRender ? overlayRender(children) : children}</div>]
    }

    return () => {
      const { suffix, borderless, clearIcon, size } = commonControlProps.value
      const controlTriggerProps = {
        autofocus: props.autofocus,
        overlayClassName: overlayClasses.value,
        overlayContainer: props.overlayContainer,
        overlayContainerFallback: `${mergedPrefixCls.value}-overlay-container`,
        overlayMatchWidth: props.overlayMatchWidth ?? config.overlayMatchWidth,
        class: mergedPrefixCls.value,
        borderless,
        value: selectedValue.value,
        offset: props.offset ?? config.offset,
        open: overlayOpened.value,
        readonly: props.readonly,
        size,
        status: mergedStatus.value,
        suffix,
        clearable: props.clearable,
        clearIcon,
        disabled: accessor.disabled,
        onFocus,
        onBlur,
        'onUpdate:open': setOverlayOpened,
      }

      const controlTriggerSlots = {
        trigger: renderTrigger,
        overlay: renderContent,
      }
      return <IxControlTrigger v-slots={controlTriggerSlots} {...controlTriggerProps} {...attrs} />
    }
  },
})

function useSelectOptions(
  props: SelectProps,
  config: SelectConfig,
  slots: Slots,
  getKey: ComputedRef<GetKeyFn>,
  inputValue: ComputedRef<string>,
) {
  const mergedChildrenKey = computed(() => props.childrenKey ?? config.childrenKey)
  const mergedLabelKey = computed(() => props.labelKey ?? config.labelKey)

  const convertedOptions = useConvertedOptions(props, slots)
  const flattenedOptions = useFlattenedOptions(convertedOptions, mergedChildrenKey, getKey, mergedLabelKey)
  const filteredOptions = useFilteredOptions(props, flattenedOptions, inputValue, mergedLabelKey)

  const optionKeyMap = useOptionKeyMap(flattenedOptions)

  return { options: filteredOptions, optionKeyMap }
}
