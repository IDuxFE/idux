/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ComputedRef, Slots, computed, defineComponent, normalizeClass, provide, ref, watch } from 'vue'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { type VirtualScrollToFn } from '@idux/cdk/scroll'
import { type VKey, callEmit, useState } from '@idux/cdk/utils'
import { ɵInput } from '@idux/components/_private/input'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { ɵSelector, type ɵSelectorInstance } from '@idux/components/_private/selector'
import { type SelectConfig, useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister, useFormSize, useFormStatus } from '@idux/components/form'
import { useOverlayContainer } from '@idux/components/utils'

import { useActiveState } from './composables/useActiveState'
import { GetKeyFn, useGetOptionKey } from './composables/useGetOptionKey'
import { useKeyboardEvents } from './composables/useKeyboardEvents'
import { useConvertedOptions, useFilteredOptions, useFlattenedOptions, useOptionKeyMap } from './composables/useOptions'
import { useOverlayState } from './composables/useOverlayState'
import { usePanelProps } from './composables/usePanelProps'
import { useSelectedState } from './composables/useSelectedState'
import Panel from './panel/Panel'
import { SELECT_PANEL_DATA_TOKEN } from './token'
import { type SelectData, type SelectPanelInstance, type SelectProps, selectProps } from './types'

const defaultOffset: [number, number] = [0, 8]

export default defineComponent({
  name: 'IxSelect',
  inheritAttrs: false,
  props: selectProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('select')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-select`)
    const mergedOverlayContainer = useOverlayContainer(props, config, common, mergedPrefixCls)

    const triggerRef = ref<ɵSelectorInstance>()
    const focus = () => triggerRef.value?.focus()
    const blur = () => triggerRef.value?.blur()

    const panelRef = ref<SelectPanelInstance>()
    const scrollTo: VirtualScrollToFn = (...params) => panelRef.value?.scrollTo(...params)
    const changeActiveIndex = (offset: number) => panelRef.value?.changeActiveIndex(offset)

    const [inputValue, setInputValue] = useState('')
    const clearInput = () => {
      props.searchable === 'overlay' ? setInputValue('') : triggerRef.value?.clearInput()
    }

    expose({ focus, blur, scrollTo })

    const { overlayRef, overlayStyle, updateOverlay, overlayOpened, setOverlayOpened } = useOverlayState(
      props,
      config,
      triggerRef,
    )

    const { accessor, control } = useAccessorAndControl()
    useFormItemRegister(control)
    const mergedSize = useFormSize(props, config)
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
      computed(() => !!props.multiple),
      activeValue,
      changeActiveIndex,
      changeSelected,
      clearInput,
      setOverlayOpened,
    )

    watch(overlayOpened, opened => {
      if (!opened && props.allowInput && inputValue.value) {
        changeSelected(inputValue.value)
      }
      opened && focus()
      clearInput()
    })

    const handleOptionClick = (option: SelectData) => {
      changeSelected(getKey.value(option))
      if (props.multiple) {
        clearInput()
      } else {
        setOverlayOpened(false)
      }
    }

    const handleBlur = () => accessor.markAsBlurred()
    const handleItemRemove = (value: VKey) => {
      focus()
      handleRemove(value)
    }

    const panelProps = usePanelProps(props, selectedValue, activeValue, setActiveValue, handleOptionClick)
    const overlayClasses = computed(() => {
      const { overlayClassName, multiple } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-overlay`]: true,
        [`${prefixCls}-overlay-multiple`]: multiple,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const renderTrigger = () => (
      <ɵSelector
        ref={triggerRef}
        v-slots={slots}
        className={mergedPrefixCls.value}
        allowInput={props.allowInput}
        autocomplete={props.autocomplete}
        autofocus={props.autofocus}
        borderless={props.borderless}
        clearable={props.clearable}
        clearIcon={props.clearIcon}
        config={config}
        dataSource={selectedOptions.value}
        disabled={accessor.disabled}
        maxLabel={props.maxLabelCount ?? props.maxLabel}
        multiple={props.multiple}
        opened={overlayOpened.value}
        placeholder={props.placeholder}
        readonly={props.readonly}
        searchable={props.searchable}
        size={mergedSize.value}
        status={mergedStatus.value}
        suffix={props.suffix}
        value={selectedValue.value}
        onBlur={handleBlur}
        onClear={handleClear}
        onInputValueChange={setInputValue}
        onItemRemove={handleItemRemove}
        onKeydown={handleKeyDown}
        onOpenedChange={setOverlayOpened}
        onResize={updateOverlay}
        onSearch={props.onSearch}
        {...attrs}
      />
    )

    const renderContent = () => {
      const children = [<Panel ref={panelRef} v-slots={slots} {...panelProps.value} />]
      const { searchable, overlayRender } = props

      if (searchable === 'overlay') {
        const value = inputValue.value
        const clearIcon = props.clearIcon ?? config.clearIcon
        const handleSearchInput = (evt: Event) => {
          const { value } = evt.target as HTMLInputElement
          setInputValue(value)
          props.searchable && callEmit(props.onSearch, value)
        }
        const handleSearchClear = () => setInputValue('')

        children.unshift(
          <div class={`${mergedPrefixCls.value}-overlay-search-wrapper`}>
            <ɵInput
              clearable
              clearIcon={clearIcon}
              clearVisible={!!value}
              size="sm"
              suffix="search"
              value={value}
              onClear={handleSearchClear}
              onInput={handleSearchInput}
            />
          </div>,
        )
      }

      return <div>{overlayRender ? overlayRender(children) : children}</div>
    }

    return () => {
      const overlayProps = {
        class: overlayClasses.value,
        style: overlayStyle.value,
        clickOutside: true,
        container: mergedOverlayContainer.value,
        disabled: accessor.disabled || props.readonly,
        offset: defaultOffset,
        placement: 'bottomStart',
        trigger: 'manual',
        triggerId: attrs.id,
        visible: overlayOpened.value,
        'onUpdate:visible': setOverlayOpened,
      } as const

      const overlaySlots = { default: renderTrigger, content: renderContent }

      return <ɵOverlay ref={overlayRef} {...overlayProps} v-slots={overlaySlots} />
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
