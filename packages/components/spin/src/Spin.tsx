/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SpinProps } from './types'
import type { SpinConfig } from '@idux/components/config'
import type { ComputedRef, Slot } from 'vue'

import { computed, defineComponent } from 'vue'

import { hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { spinProps } from './types'

export default defineComponent({
  name: 'IxSpin',
  props: spinProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-spin`)
    const spinConfig = useGlobalConfig('spin')

    const hasDefaultSlot = computed(() => hasSlot(slots))
    const icon$$ = computed(() => props.icon ?? spinConfig.icon)
    const tip$$ = computed(() => props.tip ?? spinConfig.tip)

    const { spinnerClassName, containerClassName } = useClasses(props, spinConfig, hasDefaultSlot, mergedPrefixCls)

    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <div class={prefixCls}>
          {renderSpinner(props.spinning, spinnerClassName.value, icon$$.value, slots.icon, tip$$.value, prefixCls)}
          {renderContent(slots.default, containerClassName.value)}
        </div>
      )
    }
  },
})

const useClasses = (
  props: SpinProps,
  config: SpinConfig,
  hasDefaultSlot: ComputedRef<boolean>,
  mergedPrefixCls: ComputedRef<string>,
) => {
  const prefixCls = mergedPrefixCls.value

  const spinnerClassName = computed(() => {
    const size = props.size ?? config.size
    const tipAlign = props.tipAlign ?? config.tipAlign
    return [`${prefixCls}-spinner`, `${prefixCls}-spinner-tip-${tipAlign}`, `${prefixCls}-spinner-${size}`]
  })

  const containerClassName = computed(() => {
    if (!hasDefaultSlot.value) {
      return []
    }
    return [`${prefixCls}-container`, props.spinning ? `${prefixCls}-container-blur` : '']
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
  prefixCls: string,
) => {
  if (!spinning) {
    return null
  }
  const iconNode = iconSlot ? iconSlot() : <IxIcon name={icon} />
  const tipNode = renderTip(tip, prefixCls)
  return (
    <div class={spinnerClassName}>
      <div class={`${prefixCls}-spinner-icon`}>{iconNode}</div>
      {tipNode}
    </div>
  )
}

const renderTip = (tip: string | undefined, prefixCls: string) => {
  if (!tip) {
    return null
  }

  return <div class={`${prefixCls}-spinner-tip`}>{tip}</div>
}

const renderContent = (defaultSlot: Slot | undefined, containerClassName: string[]) => {
  if (!defaultSlot) {
    return null
  }
  return <div class={containerClassName}>{defaultSlot()}</div>
}
