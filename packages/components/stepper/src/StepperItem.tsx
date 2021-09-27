import type { ComputedRef, Slot, VNodeTypes, WritableComputedRef } from 'vue'
import type { StepperProps, StepperItemProps, StepperStatus } from './types'

import { defineComponent, inject, computed } from 'vue'
import { isBoolean, isNil } from 'lodash-es'
import { hasSlot } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { stepperToken } from './token'
import { stepperItemProps } from './types'

export default defineComponent({
  name: 'IxStepperItem',
  props: stepperItemProps,
  setup(props, { slots }) {
    // stepsContext must exist
    const { props: parentProps, slots: parentSlots, currActive } = inject(stepperToken)!
    const isActive = computed(() => currActive.value === props.index)

    const onClick = () => {
      if (props.disabled || !parentProps.clickable || isActive.value) {
        return
      }
      currActive.value = props.index
    }

    const hasIcon = computed(() => hasSlot(slots, 'icon'))
    const status = useStatus(props, isActive, parentProps, currActive)
    const classes = useClasses(props, parentProps, status, hasIcon)
    const deg = useDeg(parentProps, status)

    const progressDot = computed(() => parentSlots.progressDot ?? parentProps.progressDot)
    // 点状或自定义图标，都不支持展示进度环
    const canShowPercent = computed(() => {
      return !isNil(parentProps.percent) && status.value === 'process' && !progressDot.value && !hasIcon.value
    })

    return () => {
      let headContent
      if (canShowPercent.value) {
        headContent = renderHeadPercent(props, deg)
      } else if (progressDot.value) {
        headContent = renderHeadProcessDot(props, progressDot, status)
      } else {
        const _icon = renderHeadIcon(props, slots.icon, status)
        headContent = _icon ?? <span class="ix-stepper-item-head-text">{props.index + 1}</span>
      }

      const title = slots.title?.() ?? props.title
      const subTitle = slots.subTitle?.() ?? props.subTitle
      const description = slots.description?.() ?? props.description
      return (
        <div class={classes.value} onClick={onClick}>
          <div class="ix-stepper-item-tail"></div>
          <div class="ix-stepper-item-head">{headContent}</div>
          <div class="ix-stepper-item-content">
            <div class="ix-stepper-item-title">
              {title}
              <span class="ix-stepper-item-subtitle">{subTitle}</span>
            </div>
            <div class="ix-stepper-item-description">{description}</div>
          </div>
        </div>
      )
    }
  },
})

const useStatus = (
  props: StepperItemProps,
  isActive: ComputedRef<boolean>,
  parentProps: StepperProps,
  currActive: WritableComputedRef<number>,
) => {
  return computed(() => {
    if (props.status) {
      return props.status
    }

    if (isActive.value) {
      return parentProps.status
    }

    return currActive.value > props.index ? 'finish' : 'wait'
  })
}

const useClasses = (
  props: StepperItemProps,
  parentProps: StepperProps,
  status: ComputedRef<StepperStatus>,
  hasIcon: ComputedRef<boolean>,
) => {
  return computed(() => {
    const { disabled, icon } = props
    return {
      'ix-stepper-item': true,
      'ix-stepper-item-disabled': disabled,
      'ix-stepper-item-clickable': !disabled && parentProps.clickable,
      'ix-stepper-item-custom': icon || hasIcon.value,
      [`ix-stepper-item-${status.value!}`]: true,
    }
  })
}

interface Deg {
  left: number
  right: number
}

function useDeg(parentProps: StepperProps, status: ComputedRef<StepperStatus>) {
  return computed(() => {
    const percent = parentProps.percent

    if (isNil(percent) || status.value !== 'process') {
      return { left: 0, right: 0 }
    }

    const halfRoundDeg = 180
    const maxDeg = 225 // 每个半圆最大只能旋转到225度
    const baseDeg = 45 // 默认2个半圆已经旋转了45度

    let left = baseDeg
    let right = baseDeg

    const curDeg = Math.round((percent! / 100) * 360)

    if (curDeg + baseDeg > maxDeg) {
      // 超过50%
      right = maxDeg
      left += curDeg - halfRoundDeg
      left = left > maxDeg ? maxDeg : left
    } else {
      right += curDeg
    }

    return { left, right }
  })
}

const renderHeadPercent = (props: StepperItemProps, deg: ComputedRef<Deg>) => {
  const { left, right } = deg.value
  return (
    <>
      <div class="ix-stepper-item-head-percent">
        <div class="ix-stepper-item-head-percent-right">
          <div class="ix-stepper-item-head-percent-circle" style={'transform: rotate(' + right + 'deg)'}></div>
        </div>
        <div class="ix-stepper-item-head-percent-left">
          <div class="ix-stepper-item-head-percent-circle" style={'transform: rotate(' + left + 'deg)'}></div>
        </div>
      </div>
      <span class="ix-stepper-item-head-text">{props.index + 1}</span>
    </>
  )
}

const renderHeadProcessDot = (
  props: StepperItemProps,
  progressDot: ComputedRef<boolean | Slot>,
  status: ComputedRef<StepperStatus>,
) => {
  if (isBoolean(progressDot.value)) {
    return <span class="ix-stepper-item-head-dot"></span>
  }
  return progressDot.value({ index: props.index, status: status.value })
}

const statusIconMap: Partial<Record<StepperStatus, string>> = {
  finish: 'check',
  error: 'close',
}

const renderHeadIcon = (props: StepperItemProps, iconSlot: Slot | undefined, status: ComputedRef<StepperStatus>) => {
  let iconNode: VNodeTypes | undefined

  if (iconSlot) {
    iconNode = iconSlot({ status: status.value })
  } else {
    const { icon = statusIconMap[status.value] } = props
    if (icon) {
      iconNode = <IxIcon name={icon} />
    }
  }

  return iconNode ? <span class="ix-stepper-item-head-icon">{iconNode}</span> : null
}
