import type { SetupContext } from 'vue'
import type { StepsProps } from './types'
import { stepsToken } from './token'
import { defineComponent, provide, computed  } from 'vue'
import { PropTypes, getSlotNodes } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

export default defineComponent({
  name: 'IxSteps',
  props: {
    active: PropTypes.number.def(0),
    direction: PropTypes.oneOf(['horizontal', 'vertical'] as const).def('horizontal'),
    placement: PropTypes.oneOf(['horizontal', 'vertical'] as const).def('horizontal'),
    percent: {
      type: Number,
      validator: function(value: number) {
        return value <= 100 && value >= 0
      }
    },
    progressDot: PropTypes.bool.def(false),
    size: PropTypes.oneOf(['medium', 'small'] as const).def('medium'),
    status: PropTypes.oneOf(['wait', 'process', 'finish', 'error'] as const).def('process'), // 当前步骤的状态
  },
  setup(props: StepsProps, {slots}: SetupContext) {

    const progressDotSlot = slots.progressDot;
    
    provide(stepsToken, { stepsProps: props, progressDotSlot })

    const stepsConfig = useGlobalConfig('steps')

    const size = computed(() => props.size ?? stepsConfig.size)
    
    const stepsSlot = getSlotNodes(slots)

    const stepsClass = computed(() => {
      return {
        'ix-steps': true,
        ['ix-steps-' + props.direction]: true,
        [`ix-steps-${size.value!}`]: true,
        'ix-steps-vertical-placement': props.placement === 'vertical',
        'ix-steps-vertical': props.direction === 'vertical',
        'ix-steps-dot': props.progressDot || progressDotSlot,
      }
    })

    return {
      stepsClass,
    }
  },
  render() { 
    const { stepsClass } = this
    const stepsSlot = getSlotNodes(this.$slots)
    const emitChange = (active: number) => {
      this.$emit('change', active)
    }
    return (
         <div class={stepsClass}>
           {stepsSlot.map((item, index) => {
             item.props = item.props??{}
             item.props.index = index
             item.props.onStepClick = emitChange
             return item
           })}
         </div>
    )
  }
})