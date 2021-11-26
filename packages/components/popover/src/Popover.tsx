/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopoverProps } from './types'
import type { Slots, VNode } from 'vue'

import { computed, defineComponent } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { ɵUseConfigProps } from '@idux/components/tooltip'

import { popoverProps } from './types'

const defaultOffset: [number, number] = [0, 12]

export default defineComponent({
  name: 'IxPopover',
  props: popoverProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-popover`)
    const config = useGlobalConfig('popover')
    const [visibility, setVisibility] = useControlledProp(props, 'visible', false)
    const configProps = ɵUseConfigProps(props, config, setVisibility)

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <ɵOverlay
          visible={visibility.value}
          v-slots={{ default: slots.default, content: () => renderContent(props, slots, prefixCls) }}
          class={prefixCls}
          transitionName="ix-fade"
          {...configProps.value}
          offset={defaultOffset}
          showArrow
        />
      )
    }
  },
})

const renderContent = (props: PopoverProps, slots: Slots, prefixCls: string) => {
  if (!(slots.title || props.title || slots.content || props.content)) {
    return null
  }

  const child: VNode[] = []
  if (slots.title || props.title) {
    child.push(<div class={`${prefixCls}-title`}>{slots.title?.() ?? props.title}</div>)
  }

  if (slots.content || props.content) {
    child.push(<div class={`${prefixCls}-content`}>{slots.content?.() ?? props.content}</div>)
  }

  return child
}
