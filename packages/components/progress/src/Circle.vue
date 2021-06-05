<template>
  <div class="ix-progress-circle" :style="circleStyle" :class="circleClasses">
    <svg viewBox="0 0 100 100">
      <defs v-if="isGradient">
        <linearGradient :id="linearGradientId" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop v-for="(v, idx) in circleGradient" :key="idx" :offset="v.offset" :stop-color="v.color"></stop>
        </linearGradient>
      </defs>
      <path class="ix-progress-circle-trail" v-bind="trailPathAttr" :style="trailPathStyle"></path>
      <path
        v-for="(p, idx) in strokePath"
        :key="idx"
        :stroke="p.stroke"
        class="ix-progress-circle-path"
        :class="p.strokeClasses"
        v-bind="strokePathAttr"
        :style="p.strokePathStyle"
      ></path>
    </svg>
    <div v-if="!hideInfo" class="ix-progress-text">
      <slot>
        <template v-if="showFormat">{{ formattedText }}</template>
        <ix-icon v-else-if="showSuccessIcon" class="ix-progress-success-icon" name="check" />
        <ix-icon v-else-if="showExceptionIcon" class="ix-progress-exception-icon" name="close" />
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, ComputedRef } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { isObject, uniqueId, toNumber } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useInfo, useStatus, useStatusClasses } from './useCommonLogic'
import { handleCircleGradient } from './util'
import { ConvertProgressProps, convertProgressPropsDef, ProgressGapPositionType, StringGradients } from './types'

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
  components: { IxIcon },
  props: convertProgressPropsDef,
  setup(props: ConvertProgressProps) {
    const progressConfig = useGlobalConfig('progress')
    const status = useStatus(props)
    const { formattedText, showSuccessIcon, showExceptionIcon, showFormat } = useInfo(props, progressConfig, status)
    const strokeWidth = computed(() => toNumber(props.strokeWidth, defaultStrokeWidth))
    const isGradient = computed(() => isObject(props.strokeColor))
    const statusClass = useStatusClasses(status)
    const linearGradientId = ref(`ix-progress-gradient-${uniqueId()}`)
    const calcSharedProperties = computed<CalcSharedProperties>(() => {
      const isCircle = props.type === 'circle'
      const radius = 50 - strokeWidth.value / 2
      return {
        isGradient: isGradient.value,
        percent: props.percent,
        linearGradientId: linearGradientId.value,
        radius,
        gapPosition: props.gapPosition ?? (isCircle ? 'top' : 'bottom'),
        len: Math.PI * 2 * radius,
        gapDegree: toNumber(props.gapDegree ?? (isCircle ? 0 : 75)),
      }
    })
    const circleGradient = computed(() => {
      return isGradient.value ? handleCircleGradient(props.strokeColor as StringGradients) : []
    })
    const pathString = usePathString(calcSharedProperties)
    const trailPathStyle = useTrailPathStyle(calcSharedProperties)
    const strokePath = useCirclePath(calcSharedProperties, props)

    const trailPathAttr = computed(() => ({
      stroke: '#f5f5f5',
      'fill-opacity': '0',
      'stroke-linecap': props.strokeLinecap,
      'stroke-width': strokeWidth.value,
      d: pathString.value,
    }))
    const strokePathAttr = computed(() => ({
      'fill-opacity': '0',
      'stroke-linecap': props.strokeLinecap,
      'stroke-width': props.percent ? strokeWidth.value : 0,
      d: pathString.value,
    }))
    const circleClasses = computed(() => [statusClass.value, isGradient.value ? 'ix-progress-circle-gradient' : ''])
    const circleStyle = computed(() => ({
      width: `${props.width}px`,
      height: `${props.width}px`,
      fontSize: `${toNumber(props.width) * 0.15 + 6}px`,
    }))

    return {
      calcSharedProperties,
      formattedText,
      showFormat,
      showSuccessIcon,
      showExceptionIcon,
      isGradient,
      linearGradientId,
      trailPathAttr,
      strokePathAttr,
      circleGradient,
      pathString,
      circleClasses,
      trailPathStyle,
      circleStyle,
      strokePath,
    }
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

function useCirclePath(calcSharedProperties: ComputedRef<CalcSharedProperties>, props: ConvertProgressProps) {
  return computed(() => {
    const { gapDegree, len, isGradient, linearGradientId } = calcSharedProperties.value
    const strokeProgress = props.success.percent > 0 ? [props.success.percent, props.percent] : [props.percent]
    const successColor = props.success?.strokeColor

    return strokeProgress
      .map((value, index) => {
        const hasSuccessPercent = strokeProgress.length > 1 && index === 0
        return {
          stroke: isGradient && !hasSuccessPercent ? `url(#${linearGradientId})` : null,
          strokeClasses: [
            !isGradient && hasSuccessPercent ? 'ix-progress-circle-success' : '',
            isGradient ? '' : 'ix-progress-circle-bg',
          ],
          strokePathStyle: {
            stroke: !isGradient ? (hasSuccessPercent ? successColor : (props.strokeColor as string)) : null,
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
</script>
