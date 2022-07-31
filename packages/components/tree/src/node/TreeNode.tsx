/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedNode } from '../composables/useDataSource'
import type { VKey } from '@idux/cdk/utils'

import { computed, defineComponent, inject } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { useKey } from '@idux/components/utils'

import { treeToken } from '../token'
import { treeNodeProps } from '../types'
import { getParentKeys } from '../utils'
import Checkbox from './Checkbox'
import Content from './Content'
import Expand from './Expand'
import Indent from './Indent'
import LeafLine from './LeafLine'

export default defineComponent({
  props: treeNodeProps,
  setup(props) {
    const {
      props: treeProps,
      flattedNodes,
      mergedPrefixCls,
      mergedShowLine,
      activeKey,
      selectedKeys,
      slots,
      draggableIcon,
      dragKey,
      dropKey,
      dropParentKey,
      dropType,
      handleDragstart,
      handleDragend,
      handleDragenter,
      handleDragover,
      handleDragleave,
      handleDrop,
    } = inject(treeToken)!

    const key = useKey()

    const isActive = computed(() => activeKey.value === key)
    const isLast = computed(() => mergedShowLine.value && props.isLast)
    const hasTopLine = computed(() => mergedShowLine.value && !props.isLeaf && props.level !== 0 && props.isFirst)
    const selected = computed(() => selectedKeys.value.includes(key))
    const disabled = computed(() => props.selectDisabled || !treeProps.selectable)

    const dragging = computed(() => dragKey.value === key)
    const dropping = computed(() => dropKey.value === key)
    const dropParent = computed(() => dropParentKey.value === key)
    const dropBefore = computed(() => dropping.value && dropType.value === 'before')
    const dropInside = computed(() => dropping.value && dropType.value === 'inside')
    const dropAfter = computed(() => dropping.value && dropType.value === 'after')

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-node`
      return {
        [prefixCls]: true,
        [`${prefixCls}-active`]: isActive.value,
        [`${prefixCls}-last`]: isLast.value,
        [`${prefixCls}-disabled`]: disabled.value,
        [`${prefixCls}-selected`]: selected.value,
        [`${prefixCls}-expanded`]: props.expanded,
        [`${prefixCls}-dragging`]: dragging.value,
        [`${prefixCls}-dropping`]: dropping.value,
        [`${prefixCls}-drop-parent`]: dropParent.value,
        [`${prefixCls}-drop-before`]: dropBefore.value,
        [`${prefixCls}-drop-inside`]: dropInside.value,
        [`${prefixCls}-drop-after`]: dropAfter.value,
      }
    })

    const onDragstart = (evt: DragEvent) => {
      evt.stopPropagation()

      handleDragstart(evt, props.node)

      // for firefox
      evt.dataTransfer?.setData('text/plain', '')
    }

    const onDragend = (evt: DragEvent) => {
      evt.stopPropagation()

      handleDragend(evt, props.node)
    }

    const onDragenter = (evt: DragEvent) => {
      evt.preventDefault()
      evt.stopPropagation()
      handleDragenter(evt, props.node)
    }

    const onDragover = (evt: DragEvent) => {
      evt.preventDefault()
      evt.stopPropagation()
      handleDragover(evt, props.node)
    }

    const onDragleave = (evt: DragEvent) => {
      evt.stopPropagation()
      handleDragleave(evt, props.node)
    }

    const onDrop = (evt: DragEvent) => {
      evt.stopPropagation()
      handleDrop(evt, props.node)
    }

    return () => {
      const nodeMap = new Map<VKey, MergedNode>()
      flattedNodes.value.forEach(node => {
        nodeMap.set(node.key, node)
      })

      const { isLeaf, label, level, rawNode, expanded, checkDisabled, dragDisabled, dropDisabled, node } = props
      const { checkable, draggable } = treeProps
      const mergedDraggable = draggable && !dragDisabled
      const draggableIconNode = slots.draggableIcon?.() ?? <IxIcon name={draggableIcon.value} />
      const currNode = nodeMap.get(key)
      const noopIdentUnitArr: number[] = []
      if (mergedShowLine.value) {
        getParentKeys(nodeMap, currNode)
          .reverse()
          .forEach((parentKey, index) => {
            if (nodeMap.get(parentKey)?.isLast) {
              noopIdentUnitArr.push(index)
            }
          })
      }

      const customAdditional = treeProps.customAdditional
        ? treeProps.customAdditional({ node: rawNode, level })
        : undefined

      return (
        <div
          class={classes.value}
          aria-grabbed={dragging.value || undefined}
          aria-label={label}
          aria-selected={selected.value}
          draggable={mergedDraggable || undefined}
          title={label}
          onDragstart={mergedDraggable ? onDragstart : undefined}
          onDragend={mergedDraggable ? onDragend : undefined}
          onDragenter={mergedDraggable ? onDragenter : undefined}
          onDragover={mergedDraggable ? onDragover : undefined}
          onDragleave={mergedDraggable ? onDragleave : undefined}
          onDrop={mergedDraggable && !dropDisabled ? onDrop : undefined}
          {...rawNode.additional}
          {...customAdditional}
        >
          <Indent level={level} noopIdentUnitArr={noopIdentUnitArr} prefixCls={mergedPrefixCls.value} />
          {mergedDraggable ? (
            <span class={`${mergedPrefixCls.value}-node-draggable-icon`}>{draggableIconNode}</span>
          ) : (
            draggable && <span class={`${mergedPrefixCls.value}-node-draggable-icon-noop`}></span>
          )}
          {isLeaf && mergedShowLine.value ? (
            <LeafLine />
          ) : (
            <Expand expanded={expanded} hasTopLine={hasTopLine.value} isLeaf={isLeaf} nodeKey={key} rawNode={rawNode} />
          )}
          {checkable && <Checkbox checkDisabled={checkDisabled} node={node} />}
          <Content disabled={disabled.value} node={node} nodeKey={key} label={label} selected={selected.value} />
        </div>
      )
    }
  },
})
