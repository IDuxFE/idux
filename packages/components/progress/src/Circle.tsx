/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, computed, defineComponent, inject, ref } from 'vue'

import { isObject } from 'lodash-es'

import { convertNumber, uniqueId } from '@idux/cdk/utils'

import ProgressInfo from './ProgressInfo'
import { useProps } from './composables/useProps'
import { progressContext } from './tokens'
import { ConvertProgressSuccess, ProgressGapPositionType, ProgressProps, StringGradients } from './types'
import { handleCircleGradient } from './util'

export interface CalcSharedProperties {
  isGradient: boolean
  percent: number
  linearGradientId: string
  radius: number
  gapPosition: ProgressGapPositionType
  len: number
  gapDegree: number
}

const defaultStrokeWidth = 6

export default defineComponent({
  name: 'IxProgressCircle',
  setup() {
    const { props, config, mergedPrefixCls, percent, formattedSuccess } = inject(progressContext)!

    const circleMergedPrefixCls = computed(() => `${mergedPrefixCls.value}-circle`)
    const computedProps = useProps(props, config)

    const strokeWidth = computed(() =>
      convertNumber(computedProps.value.strokeWidth ?? config.defaultCircleStrokeWidth, defaultStrokeWidth),
    )
    const isGradient = computed(() => isObject(computedProps.value.strokeColor))
    const linearGradientId = ref(`ix-progress-gradient-${uniqueId()}`)
    const calcSharedProperties = computed<CalcSharedProperties>(() => {
      const isCircle = computedProps.value.type === 'circle'
      const radius = 50 - strokeWidth.value / 2
      return {
        isGradient: isGradient.value,
        percent: percent.value,
        linearGradientId: linearGradientId.value,
        radius,
        gapPosition: computedProps.value.gapPosition ?? (isCircle ? 'top' : 'bottom'),
        len: Math.PI * 2 * radius,
        gapDegree: convertNumber(computedProps.value.gapDegree ?? (isCircle ? 0 : 75)),
      }
    })
    const circleGradient = computed(() => {
      return isGradient.value ? handleCircleGradient(computedProps.value.strokeColor as StringGradients) : []
    })
    const pathString = usePathString(calcSharedProperties)
    const trailPathStyle = useTrailPathStyle(calcSharedProperties)
    const strokePath = useCirclePath(calcSharedProperties, computedProps.value, percent, formattedSuccess)

    const trailPathAttr = computed(() => ({
      stroke: computedProps.value.trailColor ?? '#f5f5f5',
      'fill-opacity': '0',
      'stroke-linecap': computedProps.value.strokeLinecap,
      'stroke-width': strokeWidth.value,
      d: pathString.value,
    }))
    const strokePathAttr = computed(() => ({
      'fill-opacity': '0',
      'stroke-linecap': computedProps.value.strokeLinecap,
      'stroke-width': computedProps.value.percent ? strokeWidth.value : 0,
      d: pathString.value,
    }))

    const circleClasses = computed(() => {
      const prefixCls = circleMergedPrefixCls.value

      return {
        [prefixCls]: true,
        [`${prefixCls}-gradient`]: isGradient.value,
      }
    })
    const circleStyle = computed(() => ({
      width: computedProps.value.width && `${computedProps.value.width}px`,
      height: computedProps.value.width && `${computedProps.value.width}px`,
      fontSize: computedProps.value.width && `${convertNumber(computedProps.value.width) * 0.15 + 6}px`,
    }))

    const renderDefs = () => {
      if (!isGradient.value) {
        return null
      }

      return (
        <defs>
          <linearGradient id={linearGradientId.value} x1="100%" y1="0%" x2="0%" y2="0%">
            {circleGradient.value.map(gradient => (
              <stop offset={gradient.offset} stop-color={gradient.color}></stop>
            ))}
          </linearGradient>
        </defs>
      )
    }

    const renderStrokePath = () =>
      strokePath.value.map(p => (
        <path
          class={[`${circleMergedPrefixCls.value}-path`, ...p.strokeClasses]}
          style={p.strokePathStyle}
          stroke={p.stroke}
          {...strokePathAttr.value}
        ></path>
      ))

    return () => (
      <div class={circleClasses.value} style={circleStyle.value}>
        <svg viewBox="0 0 100 100">
          {renderDefs()}
          <path
            class={`${circleMergedPrefixCls.value}-trail`}
            style={trailPathStyle.value}
            {...trailPathAttr.value}
          ></path>
          {renderStrokePath()}
        </svg>
        <ProgressInfo />
      </div>
    )
  },
})

function usePathString(calcSharedProperties: ComputedRef<CalcSharedProperties>): ComputedRef<string> {
  return computed(() => {
    const { radius, gapPosition } = calcSharedProperties.value
    let beginPositionX = 0
    let beginPositionY = -radius
    let endPositionX = 0
    let endPositionY = radius * -2

    switch (gapPosition) {
      case 'left':
        beginPositionX = -radius
        beginPositionY = 0
        endPositionX = radius * 2
        endPositionY = 0
        break
      case 'right':
        beginPositionX = radius
        beginPositionY = 0
        endPositionX = radius * -2
        endPositionY = 0
        break
      case 'bottom':
        beginPositionY = radius
        endPositionY = radius * 2
        break
      default:
    }

    return `M 50,50 m ${beginPositionX},${beginPositionY}
       a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
       a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`
  })
}

function useTrailPathStyle(calcSharedProperties: ComputedRef<CalcSharedProperties>): ComputedRef<{
  strokeDasharray: string
  strokeDashoffset: string
  transition: string
}> {
  return computed(() => {
    const { len, gapDegree } = calcSharedProperties.value
    return {
      strokeDasharray: `${len - gapDegree}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
    }
  })
}

function useCirclePath(
  calcSharedProperties: ComputedRef<CalcSharedProperties>,
  props: ProgressProps,
  percent: ComputedRef<number>,
  success: ComputedRef<ConvertProgressSuccess>,
) {
  return computed(() => {
    const successPercent = success.value.percent

    const { gapDegree, len, isGradient, linearGradientId } = calcSharedProperties.value
    const strokeProgress = successPercent > 0 ? [successPercent, percent.value] : [percent.value]
    const successColor = props.success?.strokeColor

    return strokeProgress
      .map((value, index) => {
        const hasSuccessPercent = strokeProgress.length > 1 && index === 0
        return {
          stroke: isGradient && !hasSuccessPercent ? `url(#${linearGradientId})` : undefined,
          strokeClasses: [
            !isGradient && hasSuccessPercent ? 'ix-progress-circle-success' : '',
            isGradient ? '' : 'ix-progress-circle-bg',
          ],
          strokePathStyle: {
            stroke: !isGradient ? (hasSuccessPercent ? successColor : (props.strokeColor as string)) : undefined,
            transition:
              'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
            strokeDasharray: `${(value / 100) * (len - gapDegree)}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`,
          },
        }
      })
      .reverse()
  })
}
