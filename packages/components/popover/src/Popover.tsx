/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopoverProps } from './types'
import type { Slots, VNode } from 'vue'

import { defineComponent } from 'vue'

import { ɵOverlay, ɵUseVisibility } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { ɵUseConfigProps } from '@idux/components/tooltip'

import { popoverProps } from './types'

const defaultOffset: [number, number] = [0, 8]

export default defineComponent({
  name: 'IxPopover',
  props: popoverProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('popover')
    const configProps = ɵUseConfigProps(props, config)
    const visibility = ɵUseVisibility(props)

    return () => (
      <ɵOverlay
        v-model={[visibility.value, 'visible']}
        v-slots={{ default: slots.default, content: () => renderContent(props, slots) }}
        class="ix-popover"
        transitionName="ix-fade"
        {...configProps.value}
        offset={defaultOffset}
        showArrow
      />
    )
  },
})

const renderContent = (props: PopoverProps, slots: Slots) => {
  if (!(slots.title || props.title || slots.content || props.content)) {
    return null
  }

  const child: VNode[] = []
  if (slots.title || props.title) {
    child.push(<div class="ix-popover-title">{slots.title?.() ?? props.title}</div>)
  }

  if (slots.content || props.content) {
    child.push(<div class="ix-popover-content">{slots.content?.() ?? props.content}</div>)
  }

  return child
}
