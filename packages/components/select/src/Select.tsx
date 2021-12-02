/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { VirtualScrollInstance, VirtualScrollToFn } from '@idux/cdk/scroll'

import { computed, defineComponent, normalizeClass, provide, ref, watch } from 'vue'

import { useSharedFocusMonitor } from '@idux/cdk/a11y'
import { ɵOverlay } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { useFormElement } from '@idux/components/utils'

import { useAccessor } from './composables/useAccessor'
import { useActiveState } from './composables/useActiveState'
import { useInputState } from './composables/useInputState'
import { useFlattedOptions, useMergedOptions } from './composables/useOptions'
import { useOverlayProps } from './composables/useOverlayProps'
import { useSelectedState } from './composables/useSelectedState'
import Content from './content/Content'
import { selectToken } from './token'
import Trigger from './trigger/Trigger'
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
    const focusMonitor = useSharedFocusMonitor()
    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()

    const virtualScrollRef = ref<VirtualScrollInstance>()
    const scrollTo: VirtualScrollToFn = options => {
      virtualScrollRef.value?.scrollTo(options)
    }

    expose({ focus, blur, scrollTo })

    const triggerRef = ref<HTMLDivElement>()
    const { overlayRef, overlayStyle, overlayOpened, setOverlayOpened } = useOverlayProps(props, triggerRef)

    const { accessor, isDisabled } = useAccessor()
    const mergedOptions = useMergedOptions(props, slots, config)
    const inputStateContext = useInputState(props, inputRef, accessor)
    const { inputValue, clearInput } = inputStateContext
    const flattedOptions = useFlattedOptions(props, mergedOptions, inputValue)
    const selectedStateContext = useSelectedState(props, accessor, mergedOptions)
    const { selectedValue, changeSelected } = selectedStateContext
    const activeStateContext = useActiveState(props, flattedOptions, selectedValue, inputValue, scrollTo)

    const handleOptionClick = (value: any) => {
      changeSelected(value)
      if (props.multiple) {
        focus()
        clearInput()
      } else {
        setOverlayOpened(false)
      }
    }

    provide(selectToken, {
      props,
      slots,
      config,
      mergedPrefixCls,
      focusMonitor,
      triggerRef,
      inputRef,
      virtualScrollRef,
      overlayOpened,
      setOverlayOpened,
      accessor,
      isDisabled,
      mergedOptions,
      flattedOptions,
      handleOptionClick,
      ...selectedStateContext,
      ...inputStateContext,
      ...activeStateContext,
    })

    watch(overlayOpened, opened => {
      if (!opened && props.allowInput && inputValue.value) {
        changeSelected(inputValue.value)
      }

      opened ? focus() : blur()

      clearInput()
    })

    const classes = computed(() => {
      const { overlayClassName } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-overlay`]: true,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const target = computed(() => props.target ?? config.target ?? `${mergedPrefixCls.value}-overlay-container`)

    return () => {
      const renderTrigger = () => <Trigger {...attrs}></Trigger>
      const renderContent = () => <Content></Content>
      const overlayProps = { 'onUpdate:visible': setOverlayOpened }
      return (
        <ɵOverlay
          ref={overlayRef}
          {...overlayProps}
          visible={overlayOpened.value}
          v-slots={{ default: renderTrigger, content: renderContent }}
          class={classes.value}
          style={overlayStyle.value}
          clickOutside
          disabled={isDisabled.value || props.readonly}
          offset={defaultOffset}
          placement="bottom"
          target={target.value}
          trigger="manual"
        />
      )
    }
  },
})
