/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { useKey } from '@idux/cdk/utils'

import { tabsToken } from '../tokens'
import { tabPaneProps } from '../types'

export default defineComponent({
  name: 'IxTabPane',
  props: tabPaneProps,
  setup(props, { slots }) {
    const key = useKey()
    const { props: tabsProps, mergedPrefixCls } = inject(tabsToken)!
    const mergedForceRender = computed(() => props.forceRender ?? tabsProps.forceRender)

    let rendered = false
    return () => {
      if (!(rendered || props.selected || mergedForceRender.value)) {
        return null
      }
      rendered = true
      const contentNode = slots.content
        ? slots.content({ key, content: props.content, selected: props.selected })
        : props.content
      return (
        <div v-show={props.selected} class={`${mergedPrefixCls.value}-pane`}>
          {contentNode}
        </div>
      )
    }
  },
})
