/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SliderContext } from './token'
import type { TooltipInstance } from '@idux/components/tooltip'

import { computed, defineComponent, inject, onUpdated, ref } from 'vue'

import { isFunction } from 'lodash-es'

import { NoopFunction, callEmit } from '@idux/cdk/utils'
import { IxTooltip } from '@idux/components/tooltip'

import { sliderToken } from './token'
import { sliderThumbProps } from './types'

export default defineComponent({
  name: 'IxSliderThumb',
  inheritAttrs: false,
  props: sliderThumbProps,
  setup(props, { attrs, expose }) {
    const { disabled, dragging, prefixCls, tooltipVisible, tooltipPlacement, tooltipFormatter } =
      inject<SliderContext>(sliderToken)!

    const mergedTooltipVisible = ref(tooltipVisible.value ?? false)
    const isHovering = ref(false)
    const tooltipRef = ref<TooltipInstance | null>(null)
    const thumbRef = ref<HTMLElement | null>(null)
    const mergedPrefixCls = computed(() => `${prefixCls.value}-thumb`)

    const showTooltip = () => tooltipVisible.value !== false && (mergedTooltipVisible.value = true)
    const hideTooltip = () => tooltipVisible.value !== true && (mergedTooltipVisible.value = false)

    onUpdated(() => mergedTooltipVisible.value && tooltipRef.value?.updatePopper())

    function handleMouseEnter() {
      isHovering.value = true
      showTooltip()
    }

    function handleMouseLeave() {
      isHovering.value = false
      if (!dragging.value) {
        hideTooltip()
      }
    }

    function handleFocus(evt: FocusEvent) {
      showTooltip()
      if (!dragging.value) {
        callEmit(props.onFocus, evt)
      }
    }

    function handleBlur(evt: FocusEvent) {
      hideTooltip()
      if (!dragging.value) {
        callEmit(props.onBlur, evt)
      }
    }

    expose({
      tooltipRef,
      thumbRef,
      isHovering,
      showTooltip,
      hideTooltip,
    })

    return () => {
      return (
        <IxTooltip
          ref={tooltipRef}
          visible={mergedTooltipVisible.value}
          placement={tooltipPlacement.value}
          trigger="manual"
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
          v-slots={{
            title: () =>
              isFunction(tooltipFormatter.value) ? tooltipFormatter.value(props.value!) : <span>{props.value}</span>,
          }}
        >
          <div
            {...attrs}
            ref={thumbRef}
            class={mergedPrefixCls.value}
            onMouseenter={handleMouseEnter}
            onMouseleave={handleMouseLeave}
            onFocus={disabled.value ? NoopFunction : handleFocus}
            onBlur={disabled.value ? NoopFunction : handleBlur}
          ></div>
        </IxTooltip>
      )
    }
  },
})
