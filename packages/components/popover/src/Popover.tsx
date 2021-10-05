import type { Slots, VNode } from 'vue'
import type { PopoverProps } from './types'

import { defineComponent } from 'vue'
import { IxOverlay, ɵUseVisibility } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { ɵUseConfigProps } from '@idux/components/tooltip'
import { popoverProps } from './types'

const defaultOffset: [number, number] = [0, 8]

export default defineComponent({
  name: 'IxPopover',
  props: popoverProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    const config = useGlobalConfig('popover')
    const configProps = ɵUseConfigProps(props, config)
    const visibility = ɵUseVisibility(props)

    return () => (
      <IxOverlay
        v-model={[visibility.value, 'visible']}
        v-slots={{ default: slots.default, content: () => renderContent(prefixCls, props, slots) }}
        class={`${prefixCls}-popover`}
        transitionName={`${prefixCls}-fade`}
        {...configProps.value}
        offset={defaultOffset}
      />
    )
  },
})

const renderContent = (prefixCls: string, props: PopoverProps, slots: Slots) => {
  if (!(slots.title || props.title || slots.content || props.content)) {
    return null
  }

  const child: VNode[] = []
  if (slots.title || props.title) {
    child.push(<div class={`${prefixCls}-popover-title`}>{slots.title?.() ?? props.title}</div>)
  }

  if (slots.content || props.content) {
    child.push(<div class={`${prefixCls}-popover-content`}>{slots.content?.() ?? props.content}</div>)
  }

  return child
}
