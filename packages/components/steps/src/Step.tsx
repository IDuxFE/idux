import type { SetupContext } from 'vue'
import type { StepProps } from './types'
import { PropTypes } from '@idux/cdk/utils'
import { stepsToken } from './token'
import { defineComponent, inject, computed, watchEffect, ref } from 'vue'
import { isNumber } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

export default defineComponent({
  name: 'IxStep',
  props: {
    index: PropTypes.number,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    description: PropTypes.string,
    disabled: PropTypes.bool.def(false),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.vNode]),
    status: PropTypes.oneOf(['wait', 'process', 'finish', 'error'] as const),
    onStepClick: PropTypes.func,
  },
  emits: ['change'],
  setup(props: StepProps, { slots }: SetupContext) {
    const { stepsProps, progressDotSlot } = inject(stepsToken)
    let percent = ref()
    let leftDeg = ref()
    let rightDeg = ref()
    const slotIcon = slots.icon?.(),
      title = props.title || slots.title?.(),
      subTitle = props.subTitle || slots.subTitle?.(),
      description = props.description || slots.description?.()

    const curStatus = computed(() => {
      if (props.status) {
        return props.status
      }
      if (stepsProps.active! > props.index) {
        return 'finish'
      }

      if (stepsProps.active! === props.index) {
        return stepsProps.status!
      }
      return 'wait'
    })

    const isActive = computed(() => curStatus.value === 'process')

    const iconName = computed(() => props.icon)

    const isFinish = computed(() => curStatus.value === 'finish')

    const isError = computed(() => curStatus.value === 'error')

    const isDot = computed(() => stepsProps.progressDot)

    const canClick = computed(() => props.onStepClick && !props.disabled)

    const stepClass = computed(() => {
      return {
        [`ix-step-${curStatus.value!}`]: true,
        'ix-step-custom': slotIcon || iconName.value,
        'ix-step-can-click': canClick.value,
        'ix-step-disabled': props.disabled,
      }
    })

    watchEffect(() => {
      percent.value = stepsProps.percent
      let deg = usePercent(percent.value, isActive.value, isError.value)
      leftDeg.value = deg.leftDeg
      rightDeg.value = deg.rightDeg
    })

    // 点状或自定义图标，都不支持展示进度环
    const canShowPercent = computed(() => isNumber(percent.value) && isActive.value && !isDot.value && !slotIcon)

    const emitChange = () => {
      if (!canClick.value || stepsProps.active === props.index) {
        return
      }
      props.onStepClick(props.index)
    }

    const renderHeadNode = () => {
      let headNode

      if (canShowPercent.value) {
        headNode = (
          <>
            <div class="ix-step-head-percent">
              <div class="ix-step-head-percent-right">
                <div class="ix-step-head-percent-circle" style={'transform: rotate(' + rightDeg.value + 'deg)'}></div>
              </div>
              <div class="ix-step-head-percent-left">
                <div class="ix-step-head-percent-circle" style={'transform: rotate(' + leftDeg.value + 'deg)'}></div>
              </div>
            </div>
            <span class="ix-step-head-text">{props.index + 1}</span>
          </>
        )
      } else if (progressDotSlot) {
        headNode = progressDotSlot({
          index: props.index,
          status: curStatus.value,
          title,
          subTitle,
          description,
          prefixCls: 'ix-step',
        })
      } else if (isDot.value) {
        headNode = <span class="ix-step-head-dot"></span>
      } else if (slotIcon) {
        headNode = <span class="ix-step-head-icon">{slotIcon}</span>
      } else if (iconName.value) {
        headNode = <IxIcon class="ix-step-head-icon" name={iconName.value} />
      } else if (isFinish.value) {
        headNode = <IxIcon class="ix-step-head-icon" name="check" />
      } else if (isError.value) {
        headNode = <IxIcon class="ix-step-head-icon" name="close" />
      } else {
        headNode = <span class="ix-step-head-text">{props.index + 1}</span>
      }

      return headNode
    }

    return {
      title,
      subTitle,
      description,
      stepClass,
      emitChange,
      renderHeadNode,
    }
  },
  render() {
    const { stepClass, title, subTitle, description, emitChange, renderHeadNode } = this

    return (
      <div class="ix-step" class={stepClass} onclick={emitChange}>
        <div class="ix-step-tail"></div>
        <div class="ix-step-head">{renderHeadNode()}</div>
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

function usePercent(percent: number | undefined, isActive: boolean, isError: boolean) {
  if (!isNumber(percent) || !isActive || isError) {
    return {}
  }

  const maxDeg = 225 // 每个半圆最大只能旋转到225度
  const baseDeg = 45 // 默认2个半圆已经旋转了45度
  const halfRoundDeg = 180
  let leftDeg = baseDeg
  let rightDeg = baseDeg

  let curDeg = Math.round((percent! / 100) * 360)

  if (curDeg + baseDeg > maxDeg) {
    // 超过50%
    rightDeg = maxDeg
    leftDeg += curDeg - halfRoundDeg
    leftDeg = leftDeg > maxDeg ? maxDeg : leftDeg
  } else {
    rightDeg += curDeg
  }

  return {
    leftDeg,
    rightDeg,
  }
}
