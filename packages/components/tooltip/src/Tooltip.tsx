import type { Slots } from 'vue'
import type { TooltipProps } from './types'

import { defineComponent } from 'vue'
import { IxOverlay, ɵUseVisibility } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { useConfigProps } from './useConfigProps'
import { tooltipProps } from './types'

const defaultOffset: [number, number] = [0, 8]

export default defineComponent({
  name: 'IxTooltip',
  props: tooltipProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('tooltip')
    const { prefixCls } = useGlobalConfig('common')

    const configProps = useConfigProps(props, config)
    const visibility = ɵUseVisibility(props)
    return () => (
      <IxOverlay
        v-model={[visibility.value, 'visible']}
        v-slots={{ default: slots.default, content: () => renderTitle(props, slots) }}
        class={`${prefixCls}-tooltip`}
        transitionName={`${prefixCls}-fade-fast`}
        {...configProps.value}
        offset={defaultOffset}
      />
    )
  },
})

const renderTitle = (props: TooltipProps, slots: Slots) => {
  if (!(slots.title || props.title)) {
    return null
  }
  const { prefixCls } = useGlobalConfig('common')
  return <div class={`${prefixCls}-tooltip-title`}>{slots.title?.() ?? props.title}</div>
}
