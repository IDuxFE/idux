import type { ComputedRef, Slot } from 'vue'
import type { SpinProps } from './types'
import type { SpinConfig } from '@idux/components/config'

import { computed, defineComponent } from 'vue'
import { hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { spinProps } from './types'

export default defineComponent({
  name: 'IxSpin',
  props: spinProps,
  setup(props, { slots }) {
    const spinConfig = useGlobalConfig('spin')

    const hasDefaultSlot = computed(() => hasSlot(slots))
    const icon$$ = computed(() => props.icon ?? spinConfig.icon)
    const tip$$ = computed(() => props.tip ?? spinConfig.tip)

    const { spinnerClassName, containerClassName } = useClasses(props, spinConfig, hasDefaultSlot)

    return {
      tip$$,
      icon$$,
      spinnerClassName,
      containerClassName,
    }
  },
  render() {
    const { spinning, spinnerClassName, containerClassName, icon$$, tip$$, $slots } = this

    return (
      <div class="ix-spin">
        {renderSpinner(spinning, spinnerClassName, icon$$, $slots.icon, tip$$)}
        {renderContent($slots.default, containerClassName)}
      </div>
    )
  },
})

const useClasses = (props: SpinProps, config: SpinConfig, hasDefaultSlot: ComputedRef<boolean>) => {
  const spinnerClassName = computed(() => {
    const size = props.size ?? config.size
    const tipAlign = props.tipAlign ?? config.tipAlign
    return ['ix-spin-spinner', `ix-spin-spinner-tip-${tipAlign}`, size !== 'medium' ? `ix-spin-spinner-${size}` : '']
  })

  const containerClassName = computed(() => {
    if (!hasDefaultSlot.value) {
      return []
    }
    return ['ix-spin-container', props.spinning ? 'ix-spin-container-blur' : '']
  })

  return {
    spinnerClassName,
    containerClassName,
  }
}

const renderSpinner = (
  spinning: boolean,
  spinnerClassName: string[],
  icon: string,
  iconSlot: Slot | undefined,
  tip: string | undefined,
) => {
  if (!spinning) {
    return null
  }
  const iconNode = iconSlot ? iconSlot() : <IxIcon name={icon} />
  const tipNode = renderTip(tip)
  return (
    <div class={spinnerClassName}>
      <div class="ix-spin-spinner-icon">{iconNode}</div>
      {tipNode}
    </div>
  )
}

const renderTip = (tip: string | undefined) => {
  if (!tip) {
    return null
  }

  return <div class="ix-spin-spinner-tip">{tip}</div>
}

const renderContent = (defaultSlot: Slot | undefined, containerClassName: string[]) => {
  if (!defaultSlot) {
    return null
  }
  return <div class={containerClassName}>{defaultSlot()}</div>
}
