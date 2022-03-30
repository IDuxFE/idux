/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { loadingProps } from './types'
export default defineComponent({
  name: 'ɵLoading',
  props: loadingProps,
  setup(props) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-loading`)
    return () => {
      const prefixCls = mergedPrefixCls.value
      const { duration, strokeWidth, radius } = props

      const animationDur = `${duration}s`
      const viewBoxSize = radius * 2
      const circleLength = Math.PI * 2 * radius

      const fstArchLength = 0.23 * circleLength
      const sndArchLength = 0.11 * circleLength

      return (
        <div class={prefixCls} role="img" aria-label="loading">
          <svg class={`${prefixCls}-icon`} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
            <g id="loading-48" fill="none" fill-rule="evenodd" transform={`rotate(-90,${radius},${radius})`}>
              <circle
                class={`${prefixCls}-snd-arch`}
                cx={radius}
                cy={radius}
                r={radius - strokeWidth / 2}
                stroke-width={strokeWidth}
                stroke-linecap="round"
                stroke-dasharray={`${sndArchLength} ${circleLength + 1}`}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values={`${sndArchLength};${sndArchLength};${-circleLength}`}
                  dur={animationDur}
                  begin="0s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.3333;1"
                  keySplines="0 0 0 0;0.42 0 0.58 1;"
                />
              </circle>
              <circle
                class={`${prefixCls}-fst-arch`}
                cx={radius}
                cy={radius}
                r={radius - strokeWidth / 2}
                stroke-width={strokeWidth}
                stroke-linecap="round"
                stroke-dasharray={`${fstArchLength} ${circleLength + 1}`}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values={`${fstArchLength};${fstArchLength};${-circleLength};${-circleLength}`}
                  dur={animationDur}
                  begin="0s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.3333;0.7;1"
                  keySplines="0 0 0 0;0.42 0 0.58 1;0 0 0 0"
                />
              </circle>
              <circle
                class={`${prefixCls}-bg-circle`}
                cx={radius}
                cy={radius}
                r={radius - strokeWidth / 2}
                stroke-width={strokeWidth}
                stroke-linecap="round"
                stroke-dasharray={`${circleLength} ${circleLength + 1}`}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values={`${circleLength};0;${-circleLength};${-circleLength}`}
                  dur={animationDur}
                  begin="0s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.3333;0.666;1"
                  keySplines="0.6 0 0.4 1;0.6 0 0.4 1;0,0,0,0"
                />
              </circle>
            </g>
          </svg>
        </div>
      )
    }
  },
})
