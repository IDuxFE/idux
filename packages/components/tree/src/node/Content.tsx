/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeNode } from '../types'
import type { Slot } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

import { treeToken } from '../token'
import { treeNodeContentProps } from '../types'

export default defineComponent({
  props: treeNodeContentProps,
  setup(props) {
    const { props: treeProps, mergedPrefixCls, slots, handleSelect, searchedKeys } = inject(treeToken)!

    const searched = computed(() => searchedKeys.value.includes(props.nodeKey))

    const onClick = (evt: Event) => {
      if (!props.disabled) {
        handleSelect(props.nodeKey)
      }
      callEmit(treeProps.onNodeClick, evt, props.rawNode)
    }

    const onContextmenu = (evt: Event) => {
      callEmit(treeProps.onNodeContextmenu, evt, props.rawNode)
    }

    return () => {
      const { nodeKey, label, rawNode, selected } = props
      const { prefix, suffix } = rawNode

      const iconProps = { key: nodeKey, selected, node: rawNode }
      const prefixIcon = slots.prefix?.(iconProps) || (prefix && <IxIcon name={prefix} />)
      const suffixIcon = slots.suffix?.(iconProps) || (suffix && <IxIcon name={suffix} />)

      const prefixCls = `${mergedPrefixCls.value}-node-content`
      return (
        <span class={prefixCls} onClick={onClick} onContextmenu={onContextmenu}>
          {prefixIcon && <span class={`${prefixCls}-prefix`}>{prefixIcon}</span>}
          <span class={`${prefixCls}-label`}>
            {renderLabel(slots.label, label, rawNode, treeProps.searchValue, searched.value, prefixCls)}
          </span>
          {suffixIcon && <span class={`${prefixCls}-suffix`}>{suffixIcon}</span>}
        </span>
      )
    }
  },
})

function renderLabel(
  labelSlot: Slot | undefined,
  label: string | undefined,
  node: TreeNode,
  searchValue: string | undefined,
  searched: boolean,
  prefixCls: string,
) {
  if (labelSlot) {
    return labelSlot({ node, searchValue, searched })
  }
  if (searched && label && searchValue) {
    const index = label.indexOf(searchValue)
    if (index > -1) {
      const beforeLabel = label.substr(0, index)
      const afterLabel = label.substr(index + searchValue.length)
      const highlightLabel = <span class={`${prefixCls}-label-highlight`}>{searchValue}</span>
      return [beforeLabel, highlightLabel, afterLabel]
    }
  }
  return label
}
