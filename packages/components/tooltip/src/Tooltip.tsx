/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TooltipProps } from './types'
import type { Slots } from 'vue'

import { computed, defineComponent } from 'vue'

import { ɵOverlay } from '@idux/components/_private/overlay'
import { useGlobalConfig } from '@idux/components/config'

import { tooltipProps } from './types'
import { useTooltipOverlay } from './useTooltipOverlay'

export default defineComponent({
  name: 'IxTooltip',
  props: tooltipProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('tooltip')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tooltip`)
    const { overlayRef, updatePopper, overlayProps } = useTooltipOverlay(props, config, common, mergedPrefixCls)
    expose({ updatePopper })

    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <ɵOverlay
          ref={overlayRef}
          v-slots={{ default: slots.default, content: () => renderContent(props, slots, prefixCls) }}
          class={prefixCls}
          transitionName={`${common.prefixCls}-fade-fast`}
          {...overlayProps.value}
        />
      )
    }
  },
})

const renderContent = (props: TooltipProps, slots: Slots, prefixCls: string) => {
  if (!(slots.title || props.title)) {
    return null
  }
  return <div class={`${prefixCls}-wrapper`}>{slots.title?.() ?? props.title}</div>
}
