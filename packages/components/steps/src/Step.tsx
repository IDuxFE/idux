import type { ComputedRef, Slot } from 'vue'
import type { StepProps, StepsProps, StepStatus } from './types'

import { defineComponent, inject, computed } from 'vue'
import { hasSlot, isBoolean, isNil } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { StepsContext, stepsToken } from './token'
import { stepPropsDef } from './types'

export default defineComponent({
  name: 'IxStep',
  props: stepPropsDef,
  emits: ['change'],
  setup(props: StepProps, { slots }) {
    // stepsContext must exist
    const stepsContext = inject(stepsToken)!
    const { isActive, onClick } = useRegister(stepsContext, props)
    const hasIconSlot = hasSlot(slots, 'icon')
    const status = useStatus(props, isActive, stepsContext)
    const classes = useClasses(props, stepsContext.props, status, hasIconSlot)
    const deg = useDeg(stepsContext.props, status)
    const progressDot = computed(() => stepsContext.progressDot ?? stepsContext.props.progressDot)
    // 点状或自定义图标，都不支持展示进度环
    const canShowPercent = computed(() => {
      return !isNil(stepsContext.props.percent) && status.value === 'process' && !progressDot.value && !hasIconSlot
    })
    return {
      status,
      onClick,
      classes,
      progressDot,
      canShowPercent,
      deg,
    }
  },
  render() {
    const { onClick, classes, canShowPercent, deg, index, progressDot, status, icon, $slots } = this
    const title = this.title ?? this.$slots.title?.()
    const subTitle = this.subTitle ?? this.$slots.subTitle?.()
    const description = this.description ?? this.$slots.description?.()

    let headContent
    if (canShowPercent) {
      headContent = renderHeadPercent(deg, index)
    } else if (progressDot) {
      headContent = renderHeadProcessDot(progressDot, index, status, title, subTitle, description)
    } else {
      const _icon = renderHeadIcon($slots.icon, icon, status)
      headContent = _icon ?? <span class="ix-step-head-text">{index + 1}</span>
    }

    return (
      <div class={classes} onClick={onClick}>
        <div class="ix-step-tail"></div>
        <div class="ix-step-head">{headContent}</div>
        <div class="ix-step-content">
          <div class="ix-step-title">
            {title}
            <span class="ix-step-subtitle">{subTitle}</span>
          </div>
          <div class="ix-step-description">{description}</div>
        </div>
      </div>
    )
  },
})

const useRegister = (stepsContext: StepsContext, props: StepProps) => {
  const { props: parentProps, currActive, changeActive } = stepsContext
  const isActive = computed(() => currActive.value === props.index)

  const onClick = () => {
    if (props.disabled || !parentProps.clickable || isActive.value) {
      return
    }
    changeActive(props.index)
  }

  return { isActive, onClick }
}

const useStatus = (props: StepProps, isActive: ComputedRef<boolean>, stepsContext: StepsContext) => {
  return computed(() => {
    if (props.status) {
      return props.status
    }
    const { props: parentProps, currActive } = stepsContext
    if (isActive.value) {
      return parentProps.status
    }

    return currActive.value > props.index ? 'finish' : 'wait'
  })
}

const useClasses = (
  props: StepProps,
  parentProps: StepsProps,
  status: ComputedRef<StepStatus>,
  hasIconSlot: boolean,
) => {
  return computed(() => {
    const disabled = props.disabled
    return {
      'ix-step': true,
      'ix-step-disabled': disabled,
      'ix-step-clickable': !disabled && parentProps.clickable,
      [`ix-step-${status.value!}`]: true,
      'ix-step-custom': hasIconSlot || props.icon,
    }
  })
}

interface Deg {
  left: number
  right: number
}

function useDeg(parentProps: StepsProps, status: ComputedRef<StepStatus>) {
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

    let curDeg = Math.round((percent! / 100) * 360)

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

const renderHeadPercent = (deg: Deg, index: number) => {
  const { left, right } = deg
  return (
    <>
      <div class="ix-step-head-percent">
        <div class="ix-step-head-percent-right">
          <div class="ix-step-head-percent-circle" style={'transform: rotate(' + right + 'deg)'}></div>
        </div>
        <div class="ix-step-head-percent-left">
          <div class="ix-step-head-percent-circle" style={'transform: rotate(' + left + 'deg)'}></div>
        </div>
      </div>
      <span class="ix-step-head-text">{index + 1}</span>
    </>
  )
}

const renderHeadProcessDot = (
  progressDot: boolean | Slot,
  index: number,
  status: string,
  title: string,
  subTitle: string,
  description: string,
) => {
  if (isBoolean(progressDot)) {
    return <span class="ix-step-head-dot"></span>
  }
  return progressDot({
    index,
    status,
    title,
    subTitle,
    description,
    prefixCls: 'ix-step',
  })
}

const statusIconMap: Partial<Record<StepStatus, string>> = {
  finish: 'check',
  error: 'close',
}

const renderHeadIcon = (iconSlot: Slot | undefined, iconName: string | undefined, status: StepStatus) => {
  if (iconSlot) {
    return <span class="ix-step-head-icon">{iconSlot()}</span>
  }
  let _iconName = iconName ? iconName : statusIconMap[status]
  if (_iconName) {
    return <IxIcon class="ix-step-head-icon" name={_iconName} />
  }
  return null
}
