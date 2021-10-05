<template>
  <div :class="lineClasses">
    <div :class="`${prefixCls}-progress-outer`">
      <div :class="`${prefixCls}-progress-inner`">
        <div v-if="success.percent" :class="`${prefixCls}-progress-success-bg`" :style="successStyle"></div>
        <div :class="`${prefixCls}-progress-bg`" :style="bgStyle"></div>
      </div>
    </div>
    <div v-if="!hideInfo" :class="`${prefixCls}-progress-text`">
      <slot>
        <template v-if="showFormat">{{ formattedText }}</template>
        <IxIcon v-else-if="showSuccessIcon" :class="`${prefixCls}-progress-success-icon`" name="check-circle-filled" />
        <IxIcon
          v-else-if="showExceptionIcon"
          :class="`${prefixCls}-progress-exception-icon`"
          name="close-circle-filled"
        />
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { isObject } from 'lodash-es'
import { convertNumber } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { convertProgressProps } from './types'
import { useInfo, useStatus, useStatusClasses, useSmallSize } from './useCommonLogic'
import { handleGradient } from './util'

const defaultStrokeWidth = 8
const defaultSmallStrokeWidth = 6

export default defineComponent({
  name: 'IxProgressLine',
  components: { IxIcon },
  props: convertProgressProps,
  setup(props) {
    const { prefixCls } = useGlobalConfig('common')
    const progressConfig = useGlobalConfig('progress')
    const isSmallSize = useSmallSize(props, progressConfig)
    const strokeWidth = computed(() =>
      convertNumber(props.strokeWidth ?? (isSmallSize.value ? defaultSmallStrokeWidth : defaultStrokeWidth)),
    )
    const progressStatus = useStatus(props)
    const statusClass = useStatusClasses(progressStatus)
    const { formattedText, showSuccessIcon, showExceptionIcon, showFormat } = useInfo(
      props,
      progressConfig,
      progressStatus,
    )

    const lineClasses = computed(() => {
      return [
        `${prefixCls}-progress-line`,
        statusClass.value,
        props.hideInfo ? '' : `${prefixCls}-progress-show-info`,
        props.strokeLinecap === 'round' ? `${prefixCls}-progress-round` : '',
        isSmallSize.value ? `${prefixCls}-progress-small` : '',
      ]
    })
    const successStyle = computed(() => ({
      height: `${strokeWidth.value}px`,
      width: `${props.success.percent}%`,
      background: props.success?.strokeColor ?? '',
    }))
    const bgStyle = computed(() => ({
      height: `${strokeWidth.value}px`,
      width: `${props.percent}%`,
      background: isObject(props.strokeColor) ? handleGradient(props.strokeColor) : props.strokeColor ?? '',
    }))

    return {
      prefixCls,
      lineClasses,
      successStyle,
      bgStyle,
      formattedText,
      showFormat,
      showSuccessIcon,
      showExceptionIcon,
    }
  },
})
</script>
