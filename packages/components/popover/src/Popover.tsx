/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopoverProps } from './types'
import type { Slots, VNode } from 'vue'

import { computed, defineComponent } from 'vue'

import { ɵOverlay } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { ɵUseTooltipOverlay } from '@idux/components/tooltip'

import { popoverProps } from './types'

export default defineComponent({
  name: 'IxPopover',
  props: popoverProps,
  setup(props, { expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-popover`)
    const config = useGlobalConfig('popover')
    const { overlayRef, updatePopper, overlayProps } = ɵUseTooltipOverlay(props, config, mergedPrefixCls)
    expose({ updatePopper })

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <ɵOverlay
          ref={overlayRef}
          v-slots={{ default: slots.default, content: () => renderContent(props, slots, prefixCls) }}
          class={prefixCls}
          transitionName={`${common.prefixCls}-fade`}
          {...overlayProps.value}
        />
      )
    }
  },
})

const renderContent = (props: PopoverProps, slots: Slots, prefixCls: string) => {
  if (!(slots.title || props.title || slots.content || props.content)) {
    return null
  }

  const children: VNode[] = []
  if (slots.title || props.title) {
    children.push(<div class={`${prefixCls}-title`}>{slots.title?.() ?? props.title}</div>)
  }

  if (slots.content || props.content) {
    children.push(<div class={`${prefixCls}-content`}>{slots.content?.() ?? props.content}</div>)
  }

  return <div class={`${prefixCls}-wrapper`}>{children}</div>
}
