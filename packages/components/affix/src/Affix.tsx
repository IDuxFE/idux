/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ContentStyle } from './utils'
import type { CSSProperties } from 'vue'

import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

import { throttleRAF } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { convertTarget } from '@idux/components/utils'

import { affixProps } from './types'
import {
  calcStickyPosition,
  getTargetSize,
  isSticky,
  normalizeOffset,
  observeTarget,
  removeObserveTarget,
} from './utils'

export default defineComponent({
  name: 'IxAffix',
  props: affixProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-affix`)
    const contentStyle = ref<ContentStyle>({} as ContentStyle)
    const affixStyle = ref({} as CSSProperties)

    const targetRef = ref<Window | HTMLElement | null>(null)
    const affixRef = ref<HTMLElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)

    const offset = computed(() => normalizeOffset(props.offset))

    const isStickyRef = ref(false)
    watch(isStickyRef, value => props.onChange?.(value))

    const throttleMeasure = throttleRAF(measure)

    function measure(event?: unknown) {
      if (!affixRef.value || !targetRef.value || !contentRef.value) {
        clearStyle()
        return
      }

      isStickyRef.value = isSticky(affixRef.value, targetRef.value, offset.value)

      if (!isStickyRef.value) {
        clearStyle()
        return
      }

      // TODO:这里要优化一下，统一做事件判断
      if (event && (event as Event).type === 'resize') {
        clearStyle()
        nextTick(measure)
        return
      }

      const { width, height } = getTargetSize(contentRef.value)
      contentStyle.value = {
        ...calcStickyPosition(affixRef.value, targetRef.value, offset.value),
        width: `${width}px`,
        height: `${height}px`,
      }
      affixStyle.value = {
        width: `${width}px`,
        height: `${height}px`,
      }
      if (targetRef.value !== window) {
        affixStyle.value.position = 'relative'
      }
    }

    function clearStyle() {
      affixStyle.value = {}
      contentStyle.value = {}
    }

    function initContainer() {
      targetRef.value = convertTarget(props.target)
      observeTarget(targetRef.value, throttleMeasure)
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

    expose({
      update: throttleMeasure,
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <div ref={affixRef} style={affixStyle.value} class={prefixCls}>
          <div ref={contentRef} class={`${prefixCls}-content`} style={contentStyle.value}>
            {slots.default?.()}
          </div>
        </div>
      )
    }
  },
})
