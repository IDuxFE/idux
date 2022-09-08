/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopoverProps } from './types'

import { Ref, Slots, VNode, computed, defineComponent } from 'vue'

import { ɵHeader } from '@idux/components/_private/header'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { useGlobalConfig } from '@idux/components/config'
import { ɵUseTooltipOverlay } from '@idux/components/tooltip'

import { popoverProps } from './types'

export default defineComponent({
  name: 'IxPopover',
  props: popoverProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('popover')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-popover`)
    const { overlayRef, updatePopper, overlayProps, setVisible } = ɵUseTooltipOverlay(
      props,
      config,
      common,
      mergedPrefixCls,
    )

    expose({ updatePopper })

    const closeIcon = computed(() => props.closeIcon ?? config.closeIcon)

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <ɵOverlay
          ref={overlayRef}
          class={prefixCls}
          {...overlayProps.value}
          v-slots={{
            default: slots.default,
            content: () => renderContent(props, slots, closeIcon, setVisible, prefixCls),
          }}
          transitionName={`${common.prefixCls}-fade`}
        />
      )
    }
  },
})

const renderContent = (
  props: PopoverProps,
  slots: Slots,
  closeIcon: Ref<string | VNode>,
  setVisibility: (visible: boolean) => void,
  prefixCls: string,
) => {
  if (!(slots.header || props.header || slots.content || props.content)) {
    return null
  }

  let cls = `${prefixCls}-wrapper`

  const children: VNode[] = []
  if (slots.header || props.header) {
    children.push(
      <ɵHeader
        size="sm"
        closable={props.closable}
        closeIcon={closeIcon.value}
        header={props.header ?? props.title}
        onClose={() => setVisibility(false)}
        v-slots={{ header: slots.header }}
      />,
    )

    cls += ` ${prefixCls}-with-header`
  }

  if (slots.content || props.content) {
    children.push(<div class={`${prefixCls}-content`}>{slots.content?.() ?? props.content}</div>)
  }

  return <div class={cls}>{children}</div>
}
