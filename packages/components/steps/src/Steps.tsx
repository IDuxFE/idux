import type { StepsProps } from './types'

import { computed, defineComponent, provide, ref, watch } from 'vue'
import { getSlotNodes } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { stepsToken } from './token'
import { stepsPropsDef } from './types'

export default defineComponent({
  name: 'IxSteps',
  props: stepsPropsDef,
  emits: ['update:active'],
  setup(props: StepsProps, { slots, emit, attrs }) {
    const progressDot = slots.progressDot
    const currActive = ref(props.active)
    watch(
      () => props.active,
      value => (currActive.value = value),
    )
    const changeActive = (index: number) => {
      currActive.value = index
      emit('update:active', index)
    }

    provide(stepsToken, { props, currActive, changeActive, progressDot })

    const config = useGlobalConfig('steps')

    const classes = computed(() => {
      const size = props.size ?? config.size
      return {
        'ix-steps': true,
        [`ix-steps-${props.direction}`]: true,
        [`ix-steps-${size}`]: true,
        'ix-steps-vertical-placement': props.placement === 'vertical',
        'ix-steps-vertical': props.direction === 'vertical',
        'ix-steps-dot': props.progressDot || !!progressDot,
      }
    })

    return { classes }
  },
  render() {
    const { classes, $slots } = this
    const children = getSlotNodes($slots)
    return (
      <div class={classes}>
        {children.map((item, index) => {
          item.props!.index = index
          return item
        })}
      </div>
    )
  },
})
