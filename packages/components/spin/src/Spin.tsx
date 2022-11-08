/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, defineComponent, normalizeClass, normalizeStyle } from 'vue'

import { hasSlot } from '@idux/cdk/utils'
import { ɵLoading } from '@idux/components/_private/loading'
import { type SpinConfig, useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { type SpinProps, type SpinSize, spinProps } from './types'

const defaultStrokeWidth: Record<SpinSize, number> = {
  sm: 3,
  md: 3,
  lg: 4,
}
const defaultRadius: Record<SpinSize, number> = {
  sm: 14,
  md: 14,
  lg: 24,
}

export default defineComponent({
  name: 'IxSpin',
  props: spinProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-spin`)
    const spinConfig = useGlobalConfig('spin')

    const { size, strokeWidth, radius } = useSize(props, spinConfig)

    const hasDefaultSlot = computed(() => hasSlot(slots))
    const mergedIcon = computed(() => props.icon ?? spinConfig.icon)
    const mergedTip = computed(() => props.tip ?? spinConfig.tip)

    const { spinnerClassName, containerClassName } = useClasses(
      props,
      spinConfig,
      size,
      hasDefaultSlot,
      mergedPrefixCls,
    )

    const renderContent = () => {
      if (!slots.default) {
        return null
      }
      return <div class={containerClassName.value}>{slots.default()}</div>
    }

    const renderTip = () => {
      if (!mergedTip.value) {
        return null
      }

      return <div class={`${mergedPrefixCls.value}-spinner-tip`}>{mergedTip.value}</div>
    }

    const renderIcon = () => {
      const iconCls = `${mergedPrefixCls.value}-spinner-icon`

      if (slots.icon) {
        return <div class={iconCls}>{slots.icon()}</div>
      }

      if (mergedIcon.value) {
        const iconStyle = normalizeStyle(props.duration && { animationDuration: `${props.duration}s` })
        return (
          <div class={[iconCls, props.rotate && `${iconCls}--rotate`]} style={iconStyle}>
            <IxIcon name={mergedIcon.value} />
          </div>
        )
      }

      return (
        <div class={iconCls}>
          <ɵLoading strokeWidth={strokeWidth.value} radius={radius.value} duration={props.duration} />
        </div>
      )
    }

    const renderSpinner = () => {
      if (!props.spinning) {
        return null
      }

      return (
        <div class={spinnerClassName.value}>
          {renderIcon()}
          {renderTip()}
        </div>
      )
    }

    return () => (
      <div class={mergedPrefixCls.value}>
        {renderSpinner()}
        {renderContent()}
      </div>
    )
  },
})

const useSize = (props: SpinProps, config: SpinConfig) => {
  const size = computed(() => props.size ?? config.size)
  const strokeWidth = computed(
    () => props.strokeWidth ?? config.strokeWidth?.[size.value] ?? defaultStrokeWidth[size.value],
  )
  const radius = computed(() => props.radius ?? config.radius?.[size.value] ?? defaultRadius[size.value])

  return {
    size,
    strokeWidth,
    radius,
  }
}

const useClasses = (
  props: SpinProps,
  config: SpinConfig,
  size: ComputedRef<SpinSize>,
  hasDefaultSlot: ComputedRef<boolean>,
  mergedPrefixCls: ComputedRef<string>,
) => {
  const prefixCls = mergedPrefixCls.value

  const spinnerClassName = computed(() => {
    const tipAlign = props.tipAlign ?? config.tipAlign
    return normalizeClass([
      `${prefixCls}-spinner`,
      `${prefixCls}-spinner-tip-${tipAlign}`,
      `${prefixCls}-spinner-${size.value}`,
    ])
  })

  const containerClassName = computed(() => {
    if (!hasDefaultSlot.value) {
      return []
    }
    return normalizeClass([`${prefixCls}-container`, props.spinning ? `${prefixCls}-container-blur` : ''])
  })

  return {
    spinnerClassName,
    containerClassName,
  }
}
