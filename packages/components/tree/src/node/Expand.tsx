/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VNodeTypes } from 'vue'

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { isArray } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

import { treeToken } from '../token'
import { treeNodeExpandProps } from '../types'

export default defineComponent({
  props: treeNodeExpandProps,
  setup(props) {
    const { mergedPrefixCls, slots, expandIcon, loadingKeys, handleExpand } = inject(treeToken)!

    const isLoading = computed(() => loadingKeys.value.includes(props.nodeKey))
    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-node-expand`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-noop`]: props.isLeaf,
      })
    })

    const onClick = (evt: Event) => {
      handleExpand(props.nodeKey, props.rawNode)
      evt.stopPropagation()
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-node-expand`

      let children: VNodeTypes | undefined
      if (isLoading.value) {
        children = <IxIcon name="loading"></IxIcon>
      } else if (!props.isLeaf) {
        const { expanded } = props
        if (slots.expandIcon) {
          const { nodeKey: key, rawNode: node } = props
          children = slots.expandIcon({ key, expanded, node })
        } else {
          const expandIconValue = expandIcon.value
          const iconIsArray = isArray(expandIconValue)
          children = (
            <IxIcon
              name={iconIsArray ? (expanded ? expandIconValue[0] : expandIconValue[1]) : expandIconValue}
              rotate={expanded && !iconIsArray ? 90 : 0}
            />
          )
        }
      }
      return (
        <span class={classes.value} onClick={onClick}>
          {props.hasTopLine && <div class={`${prefixCls}-top-line`} />}
          {children}
        </span>
      )
    }
  },
})
