/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { StepperProps } from './types'
import type { StepperConfig } from '@idux/components/config'
import type { ComputedRef, Slots } from 'vue'

import { computed, defineComponent, normalizeClass, provide, ref, watch } from 'vue'

import { callEmit, getSlotNodes, hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { stepperToken } from './token'
import { stepperProps } from './types'

export default defineComponent({
  name: 'IxStepper',
  props: stepperProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-stepper`)
    const config = useGlobalConfig('stepper')
    const classes = useClasses(props, slots, config, mergedPrefixCls)
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

function useClasses(props: StepperProps, slots: Slots, config: StepperConfig, mergedPrefixCls: ComputedRef<string>) {
  return computed(() => {
    const prefixCls = mergedPrefixCls.value

    const { direction, size = config.size, placement, progressDot } = props

    return normalizeClass({
      [prefixCls]: true,
      [`${prefixCls}-${direction}`]: true,
      [`${prefixCls}-${size}`]: true,
      [`${prefixCls}-vertical-placement`]: placement === 'vertical',
      [`${prefixCls}-vertical`]: direction === 'vertical',
      [`${prefixCls}-dot`]: progressDot || hasSlot(slots, 'progressDot'),
    })
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
