/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, ref, watchEffect } from 'vue'

import { callEmit, convertNumber } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { rateProps } from './types'

const HALF = 2

export default defineComponent({
  name: 'IxRate',
  props: rateProps,
  setup(props) {
    const score = ref(props.value)
    const touchHalf = ref(false)
    const starRefs = ref([])

    const config = useGlobalConfig('rate')
    const rateCount = computed(() => convertNumber(props.count ?? config.count))
    const rateIcon = computed(() => props.icon ?? config.icon)
    const allowHalf = computed(() => props.allowHalf ?? config.allowHalf)
    const clearable = computed(() => props.clearable ?? config.clearable)

    watchEffect(() => {
      const value = convertNumber(props.value)
      score.value = value
      touchHalf.value = value !== Math.floor(value)
    })

    function getIconClass(item: number) {
      return item <= score.value ? 'ix-rate-highlight' : 'ix-rate-normal'
    }

    function showDecimalIcon(item: number) {
      return allowHalf.value && item - 0.5 <= score.value && item > score.value
    }

    function getTooltip(index: number) {
      if (!props.tooltips || !Array.isArray(props.tooltips)) {
        return
      }

      return props.tooltips[index] || ''
    }

    function handleMouseEnter(item: number, e: MouseEvent) {
      if (props.disabled) {
        return
      }

      if (allowHalf.value) {
        updateTouchHalf(item - 1, e)
        score.value = touchHalf.value ? item - 0.5 : item
      } else {
        score.value = item
      }
    }

    function updateTouchHalf(index: number, e: MouseEvent) {
      const target = starRefs.value[index] as HTMLElement

      if (e.offsetX <= target.clientWidth / HALF) {
        touchHalf.value = true
        return
      }

      touchHalf.value = false
    }

    function handleMouseLeave() {
      if (props.disabled) {
        return
      }

      const value = convertNumber(props.value)

      if (allowHalf.value) {
        touchHalf.value = value !== Math.floor(value)
      }
      score.value = value
    }

    function handleClick() {
      if (props.disabled) {
        return
      }

      let clearValue = false
      let emitValue = 0
      const beforeValue = convertNumber(props.value)
      const currentScore = convertNumber(score.value)

      if (clearable.value) {
        clearValue = beforeValue === currentScore
      }

      emitValue = clearValue ? 0 : currentScore

      if (emitValue !== beforeValue) {
        callEmit(props['onUpdate:value'], emitValue)
        callEmit(props.onChange, emitValue)
      }
    }

    return () => {
      const children = []
      for (let index = 0; index < rateCount.value; index++) {
        children.push(
          <div
            key={index}
            ref={el => (starRefs.value[index] = el)}
            class="ix-rate-item"
            title={getTooltip(index)}
            onClick={handleClick}
            onMousemove={$event => handleMouseEnter(index + 1, $event)}
            onMouseleave={handleMouseLeave}
          >
            <div class="ix-rate-full">
              <IxIcon class={getIconClass(index + 1)} name={rateIcon.value} />
            </div>
            {showDecimalIcon(index + 1) && (
              <div class="ix-rate-half">
                <IxIcon class="ix-rate-half-icon" name={rateIcon.value} />
              </div>
            )}
          </div>,
        )
      }
      return <div class="ix-rate">{children}</div>
    }
  },
})
