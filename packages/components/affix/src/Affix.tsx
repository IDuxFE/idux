/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AffixStyle } from './utils'
import type { CSSProperties } from 'vue'

import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

import { throttleRAF } from '@idux/cdk/utils'
import { getTarget } from '@idux/components/utils'

import { affixProps } from './types'
import {
  calcPosition,
  getTargetRect,
  getTargetSize,
  isSticky,
  normalizeOffset,
  observeTarget,
  removeObserveTarget,
} from './utils'

export default defineComponent({
  name: 'IxAffix',
  props: affixProps,
  setup(props) {
    const affixStyle = ref<AffixStyle>({} as AffixStyle)
    const wrapperStyle = ref({} as CSSProperties)

    const targetRef = ref<Window | HTMLElement | null>(null)
    const affixRef = ref<HTMLElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)

    const offset = computed(() => normalizeOffset(props.offset))

    const isStickyRef = ref(false)
    watch(isStickyRef, value => props.onChange?.(value))

    const throttleMeasure = throttleRAF(measure)

    function measure() {
      if (!affixRef.value || !targetRef.value) {
        return
      }
      const affixRect = getTargetRect(affixRef.value, targetRef.value)
      isStickyRef.value = isSticky(affixRect, offset.value)
      affixStyle.value = calcPosition(affixRect, offset.value, targetRef.value)
      if (isStickyRef.value && contentRef.value) {
        const { width, height } = getTargetSize(contentRef.value)
        affixStyle.value = {
          ...affixStyle.value,
          width: `${width}px`,
          height: `${height}px`,
        }
        wrapperStyle.value = {
          width: `${width}px`,
          height: `${height}px`,
        }
        if (targetRef.value !== window) {
          wrapperStyle.value.position = 'relative'
        }
      }
    }

    onMounted(() => {
      nextTick(() => {
        initContainer()
        measure()
      })
    })

    onUnmounted(() => {
      removeObserveTarget(targetRef.value!, throttleMeasure)
      throttleMeasure.cancel?.()
    })

    watch(() => props.offset, measure)
    watch(
      () => props.target,
      () => {
        removeObserveTarget(targetRef.value!, throttleMeasure)
        initContainer()
        measure()
      },
    )

    function initContainer() {
      targetRef.value = getTarget(props.target)
      observeTarget(targetRef.value, throttleMeasure)
    }

    return {
      affixRef,
      contentRef,
      affixStyle,
      wrapperStyle,
    }
  },
  render() {
    return (
      <div ref="affixRef" style={this.wrapperStyle} class="ix-affix">
        <div ref="contentRef" class="ix-affix-content" style={this.affixStyle}>
          {this.$slots.default?.()}
        </div>
      </div>
    )
  },
})
