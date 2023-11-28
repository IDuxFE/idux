/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, computed, defineComponent, inject } from 'vue'

import { isObject } from 'lodash-es'

import { convertNumber, uniqueId } from '@idux/cdk/utils'

import ProgressInfo from './ProgressInfo'
import { progressContext } from './tokens'
import { ProgressGapPositionType, ProgressProps, StringGradients } from './types'
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
  setup(_, { slots }) {
    const { props, mergedPrefixCls, mergedStrokeLinecap, percent, successPercent } = inject(progressContext)!

    const circleMergedPrefixCls = computed(() => `${mergedPrefixCls.value}-circle`)

    const strokeWidth = computed(() => convertNumber(props.strokeWidth, defaultStrokeWidth))
    const isGradient = computed(() => isObject(props.strokeColor))
    const linearGradientId = computed(() => `${mergedPrefixCls.value}-gradient-${uniqueId()}`)

    const calcSharedProperties = computed<CalcSharedProperties>(() => {
      const isCircle = props.type === 'circle'
      const radius = 50 - strokeWidth.value / 2
      return {
        isGradient: isGradient.value,
        percent: percent.value,
        linearGradientId: linearGradientId.value,
        radius,
        gapPosition: props.gapPosition ?? (isCircle ? 'top' : 'bottom'),
        len: Math.PI * 2 * radius,
        gapDegree: convertNumber(props.gapDegree ?? (isCircle ? 0 : 75)),
      }
    })
    const circleGradient = computed(() => {
      return isGradient.value ? handleCircleGradient(props.strokeColor as StringGradients) : []
    })
    const pathString = usePathString(calcSharedProperties)
    const trailPathStyle = useTrailPathStyle(calcSharedProperties)
    const strokePath = useCirclePath(calcSharedProperties, circleMergedPrefixCls, props, percent, successPercent)

    const trailPathAttr = computed(() => ({
      stroke: props.trailColor,
      'fill-opacity': '0',
      'stroke-linecap': mergedStrokeLinecap.value,
      'stroke-width': strokeWidth.value,
      d: pathString.value,
    }))
    const strokePathAttr = computed(() => ({
      'fill-opacity': '0',
      'stroke-linecap': mergedStrokeLinecap.value,
      'stroke-width': percent.value ? strokeWidth.value : 0,
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
      width: props.width && `${props.width}px`,
      height: props.width && `${props.width}px`,
      fontSize: props.width && `${convertNumber(props.width) * 0.15 + 6}px`,
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
        <ProgressInfo v-slots={slots} />
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
  circleMergedPrefixCls: ComputedRef<string>,
  props: ProgressProps,
  percent: ComputedRef<number>,
  successPercent: ComputedRef<number>,
) {
  return computed(() => {
    const { gapDegree, len, isGradient, linearGradientId } = calcSharedProperties.value
    const strokeProgress = successPercent.value > 0 ? [successPercent.value, percent.value] : [percent.value]
    const successColor = props.success?.strokeColor

    return strokeProgress
      .map((value, index) => {
        const hasSuccessPercent = strokeProgress.length > 1 && index === 0
        return {
          stroke: isGradient && !hasSuccessPercent ? `url(#${linearGradientId})` : undefined,
          strokeClasses: [
            !isGradient && hasSuccessPercent ? `${circleMergedPrefixCls.value}-success` : '',
            isGradient ? '' : `${circleMergedPrefixCls.value}-bg`,
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
