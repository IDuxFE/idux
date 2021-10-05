import type { Slots } from 'vue'
import type { StepperConfig } from '@idux/components/config'
import type { StepperProps } from './types'

import { computed, defineComponent, provide, ref, watch } from 'vue'
import { callEmit, getSlotNodes, hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { stepperToken } from './token'
import { stepperProps } from './types'

export default defineComponent({
  name: 'IxStepper',
  props: stepperProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('stepper')
    const classes = useClasses(props, slots, config)
    const currActive = useActive(props)

    provide(stepperToken, { props, slots, currActive })

    return () => {
      const children = getSlotNodes(slots).map((item, index) => {
        item.props!.index ??= index
        return item
      })
      return <div class={classes.value}>{children}</div>
    }
  },
})

function useClasses(props: StepperProps, slots: Slots, config: StepperConfig) {
  const { prefixCls } = useGlobalConfig('common')
  return computed(() => {
    const { direction, size = config.size, placement, progressDot } = props

    return {
      [`${prefixCls}-stepper`]: true,
      [`${prefixCls}-stepper-${direction}`]: true,
      [`${prefixCls}-stepper-${size}`]: true,
      [`${prefixCls}-stepper-vertical-placement`]: placement === 'vertical',
      [`${prefixCls}-stepper-vertical`]: direction === 'vertical',
      [`${prefixCls}-stepper-dot`]: progressDot || hasSlot(slots, 'progressDot'),
    }
  })
}

function useActive(props: StepperProps) {
  const currActive = ref(props.active)

  watch(
    () => props.active,
    value => (currActive.value = value),
  )

  return computed({
    get() {
      return currActive.value
    },
    set(index: number) {
      currActive.value = index
      callEmit(props['onUpdate:active'], index)
    },
  })
}
