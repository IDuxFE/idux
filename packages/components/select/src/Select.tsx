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
    const { overlayRef, overlayStyle, overlayOpened, changeOverlayOpened } = useOverlayProps(props, triggerRef)

    const { accessor, isDisabled } = useAccessor()
    const mergedOptions = useMergedOptions(props, slots, config)
    const inputStateContext = useInputState(props, inputRef, accessor)
    const { inputValue, clearInput } = inputStateContext
    const flattedOptions = useFlattedOptions(props, mergedOptions, inputValue)
    const selectedStateContext = useSelectedState(
      props,
      accessor,
      mergedOptions,
      focus,
      changeOverlayOpened,
      clearInput,
    )
    const { selectedValue, changeSelected } = selectedStateContext
    const activeStateContext = useActiveState(props, flattedOptions, selectedValue, inputValue, scrollTo)

    provide(selectToken, {
      props,
      slots,
      config,
      mergedPrefixCls,
      focusMonitor,
      inputRef,
      focus,
      blur,
      virtualScrollRef,
      triggerRef,
      overlayOpened,
      changeOverlayOpened,
      accessor,
      isDisabled,
      mergedOptions,
      flattedOptions,
      ...selectedStateContext,
      ...inputStateContext,
      ...activeStateContext,
    })

    watch(overlayOpened, opened => {
      if (!opened && props.allowInput && inputValue.value) {
        changeSelected(inputValue.value)
      }
      clearInput()
    })

    const classes = computed(() => {
      const { overlayClassName } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-dropdown`]: true,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const target = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return `${prefixCls}-overlay`
    })

    return () => {
      const renderTrigger = () => <Trigger {...attrs}></Trigger>
      const renderContent = () => <Content></Content>
      return (
        <ɵOverlay
          ref={overlayRef}
          v-model={[overlayOpened.value, 'visible']}
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
