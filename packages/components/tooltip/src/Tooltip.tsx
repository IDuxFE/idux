/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TooltipProps } from './types'
import type { OverlayInstance } from '@idux/components/_private'
import type { Slots } from 'vue'

import { defineComponent, ref } from 'vue'

import { IxOverlay } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { useMergedProp } from '@idux/components/utils'

import { tooltipProps } from './types'
import { useConfigProps } from './useConfigProps'

const defaultOffset: [number, number] = [0, 8]

export default defineComponent({
  name: 'IxTooltip',
  props: tooltipProps,
  setup(props, { slots, expose }) {
    const overlayRef = ref<OverlayInstance | null>(null)
    const config = useGlobalConfig('tooltip')
    const configProps = useConfigProps(props, config)
    const visibility = useMergedProp(props, 'visible')
    const updatePopper = () => overlayRef.value?.updatePopper()

    expose({ updatePopper })

    return () => (
      <IxOverlay
        ref={overlayRef}
        v-model={[visibility.value, 'visible']}
        v-slots={{ default: slots.default, content: () => renderTitle(props, slots) }}
        class="ix-tooltip"
        transitionName="ix-fade-fast"
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
  return <div class="ix-tooltip-title">{slots.title?.() ?? props.title}</div>
}
