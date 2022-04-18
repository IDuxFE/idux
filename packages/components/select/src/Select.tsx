/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { computed, defineComponent, normalizeClass, provide, ref, watch } from 'vue'

import { type VirtualScrollInstance, type VirtualScrollToFn } from '@idux/cdk/scroll'
import { useState } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { ɵSelector, type ɵSelectorInstance } from '@idux/components/_private/selector'
import { useGlobalConfig } from '@idux/components/config'
import { useFormAccessor } from '@idux/components/utils'

import { useActiveState } from './composables/useActiveState'
import { useFlattedOptions, useMergedOptions } from './composables/useOptions'
import { useOverlayState } from './composables/useOverlayState'
import { useSelectedState } from './composables/useSelectedState'
import Content from './content/Content'
import { selectToken } from './token'
import { selectProps } from './types'

const defaultOffset: [number, number] = [0, 8]

export default defineComponent({
  name: 'IxSelect',
  inheritAttrs: false,
  props: selectProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-select`)
    const config = useGlobalConfig('select')
    const locale = useGlobalConfig('locale')

    const triggerRef = ref<ɵSelectorInstance>()
    const [inputValue, setInputValue] = useState('')
    const focus = () => triggerRef.value?.focus()
    const blur = () => triggerRef.value?.blur()
    const clearInput = () => {
      props.searchable === 'overlay' ? setInputValue('') : triggerRef.value?.clearInput()
    }

    const virtualScrollRef = ref<VirtualScrollInstance>()
    const scrollTo: VirtualScrollToFn = options => virtualScrollRef.value?.scrollTo(options)

    expose({ focus, blur, scrollTo })

    const { overlayRef, overlayStyle, updateOverlay, overlayOpened, setOverlayOpened } = useOverlayState(props)

    const accessor = useFormAccessor()

    const mergedOptions = useMergedOptions(props, slots, config)

    const flattedOptions = useFlattedOptions(props, mergedOptions, inputValue)
    const {
      selectedValue,
      selectedLimit,
      selectedLimitTitle,
      changeSelected,
      selectedOptions,
      handleClear,
      handleItemRemove,
    } = useSelectedState(props, accessor, mergedOptions, locale)

    const { activeIndex, activeOption, changeActive, scrollToActivated } = useActiveState(
      props,
      flattedOptions,
      selectedValue,
      inputValue,
      scrollTo,
    )

    const handleOptionClick = (value: any) => {
      changeSelected(value)
      if (props.multiple) {
        focus()
        clearInput()
      } else {
        setOverlayOpened(false)
      }
    }

    const handleBlur = () => accessor.markAsBlurred()

    provide(selectToken, {
      props,
      slots,
      config,
      mergedPrefixCls,
      virtualScrollRef,
      accessor,
      inputValue,
      setInputValue,
      overlayOpened,
      setOverlayOpened,
      mergedOptions,
      flattedOptions,
      handleOptionClick,
      selectedValue,
      selectedLimit,
      selectedLimitTitle,
      activeIndex,
      activeOption,
      changeActive,
      scrollToActivated,
    })

    watch(overlayOpened, opened => {
      if (!opened && props.allowInput && inputValue.value) {
        changeSelected(inputValue.value)
      }
      opened ? focus() : blur()
      clearInput()
    })

    const overlayClasses = computed(() => {
      const { overlayClassName, multiple } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-overlay`]: true,
        [`${prefixCls}-overlay-multiple`]: multiple,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const target = computed(() => props.target ?? config.target ?? `${mergedPrefixCls.value}-overlay-container`)

    const handleKeyDown = (evt: KeyboardEvent) => {
      switch (evt.code) {
        case 'ArrowUp':
          evt.preventDefault()
          changeActive(activeIndex.value - 1, -1)
          break
        case 'ArrowDown':
          evt.preventDefault()
          changeActive(activeIndex.value + 1, 1)
          break
        case 'Enter':
          evt.preventDefault()
          changeSelected(activeOption.value?.value)
          props.multiple ? clearInput() : setOverlayOpened(false)
          break
        case 'Escape':
          evt.preventDefault()
          setOverlayOpened(false)
          break
      }
    }

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
        disabled={accessor.disabled.value}
        maxLabel={props.maxLabelCount ?? props.maxLabel}
        multiple={props.multiple}
        opened={overlayOpened.value}
        placeholder={props.placeholder}
        readonly={props.readonly}
        searchable={props.searchable}
        size={props.size}
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

    const renderContent = () => <Content />

    return () => {
      const overlayProps = {
        class: overlayClasses.value,
        style: overlayStyle.value,
        clickOutside: true,
        disabled: accessor.disabled.value || props.readonly,
        offset: defaultOffset,
        placement: 'bottom',
        target: target.value,
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
