/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { IxIcon } from '@idux/components/icon'

import { treeToken } from '../token'
import { treeNodeExpandProps } from '../types'

export default defineComponent({
  props: treeNodeExpandProps,
  setup(props) {
    const { prefixCls, slots, expandIcon, loadingKeys, handleExpand } = inject(treeToken)!

    const isLoading = computed(() => loadingKeys.value.includes(props.nodeKey))

    const onClick = () => handleExpand(props.nodeKey, props.rawNode)

    return () => {
      let children: VNodeTypes | undefined
      if (isLoading.value) {
        children = <IxIcon name="loading"></IxIcon>
      } else {
        if (slots.expandIcon) {
          const { nodeKey: key, expanded, rawNode: node } = props
          children = slots.expandIcon({ key, expanded, node })
        } else {
          children = <IxIcon name={expandIcon.value} rotate={props.expanded ? 90 : 0}></IxIcon>
        }
      }
      return (
        <span class={`${prefixCls.value}-node-expand`} onClick={onClick}>
          {children}
        </span>
      )
    }
  },
})
