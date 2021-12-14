/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

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
      mergedPrefixCls,
      mergedNodeMap,
      activeKey,
      selectedKeys,
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

    const key = computed(() => props.node.key)

    const isActive = computed(() => activeKey.value === key.value)
    const isLast = computed(() => treeProps.showLine && props.node.isLast)
    const hasTopLine = computed(
      () => treeProps.showLine && !props.node.isLeaf && props.node.level !== 0 && props.node.isFirst,
    )
    const selected = computed(() => selectedKeys.value.includes(key.value))
    const disabled = computed(() => props.node.selectDisabled || !treeProps.selectable)

    const dragging = computed(() => dragKey.value === key.value)
    const dropping = computed(() => dropKey.value === key.value)
    const dropParent = computed(() => dropParentKey.value === key.value)
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
        [`${prefixCls}-expanded`]: props.node.expanded,
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
      const nodeMap = mergedNodeMap.value
      const node = props.node

      const { isLeaf, key, label, level, rawNode, expanded, dragDisabled, dropDisabled } = node
      const { showLine, checkable, draggable } = treeProps
      const mergedDraggable = draggable && !dragDisabled
      const currNode = nodeMap.get(key)
      let noopIdentUnit = 0
      if (treeProps.showLine) {
        getParentKeys(nodeMap, currNode).forEach(parentKey => {
          if (nodeMap.get(parentKey)?.isLast) {
            noopIdentUnit++
          }
        })
      }

      return (
        <div
          {...rawNode.additional}
          class={classes.value}
          aria-grabbed={dragging.value || undefined}
          draggable={mergedDraggable || undefined}
          onDragstart={mergedDraggable ? onDragstart : undefined}
          onDragend={mergedDraggable ? onDragend : undefined}
          onDragenter={mergedDraggable ? onDragenter : undefined}
          onDragover={mergedDraggable ? onDragover : undefined}
          onDragleave={mergedDraggable ? onDragleave : undefined}
          onDrop={mergedDraggable && !dropDisabled ? onDrop : undefined}
        >
          <Indent level={level} noopIdentUnit={noopIdentUnit} prefixCls={mergedPrefixCls.value} />
          {isLeaf && showLine ? (
            <LeafLine />
          ) : (
            <Expand expanded={expanded} hasTopLine={hasTopLine.value} isLeaf={isLeaf} nodeKey={key} rawNode={rawNode} />
          )}
          {checkable && <Checkbox node={node} />}
          <Content disabled={disabled.value} nodeKey={key} label={label} rawNode={rawNode} selected={selected.value} />
        </div>
      )
    }
  },
})
