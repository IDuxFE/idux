/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TooltipProps } from './types'
import type { ɵOverlayInstance } from '@idux/components/_private'
import type { Slots } from 'vue'

import { computed, defineComponent, ref } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'

import { tooltipProps } from './types'
import { useConfigProps } from './useConfigProps'

const defaultOffset: [number, number] = [0, 8]

export default defineComponent({
  name: 'IxTooltip',
  props: tooltipProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tooltip`)
    const overlayRef = ref<ɵOverlayInstance | null>(null)
    const config = useGlobalConfig('tooltip')
    const [visibility, setVisibility] = useControlledProp(props, 'visible', false)
    const configProps = useConfigProps(props, config, setVisibility)
    const updatePopper = () => overlayRef.value?.updatePopper()

    expose({ updatePopper })

    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <ɵOverlay
          ref={overlayRef}
          visible={visibility.value}
          v-slots={{ default: slots.default, content: () => renderTitle(props, slots, prefixCls) }}
          class={prefixCls}
          transitionName="ix-fade-fast"
          {...configProps.value}
          offset={defaultOffset}
          showArrow
        />
      )
    }
  },
})

const renderTitle = (props: TooltipProps, slots: Slots, prefixCls: string) => {
  if (!(slots.title || props.title)) {
    return null
  }
  return <div class={`${prefixCls}-title`}>{slots.title?.() ?? props.title}</div>
}
