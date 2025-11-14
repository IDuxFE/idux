/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { IxIcon } from '@idux/components/icon'

import Checkbox from './Checkbox'
import Content from './Content'
import Expand from './Expand'
import Indent from './Indent'
import LeafLine from './LeafLine'
import { treeToken } from '../token'
import { treeNodeProps } from '../types'
import { getParentKeys } from '../utils'

export default defineComponent({
  props: treeNodeProps,
  setup(props, { slots }) {
    const {
      props: treeProps,
      flattenedNodeMap,
      mergedPrefixCls,
      mergedShowLine,
      activeKey,
      selectedKeys,
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
      isChecked,
    } = inject(treeToken)!

    const nodeKey = computed(() => props.node.key)

    const isActive = computed(() => activeKey.value === nodeKey.value)
    const isLast = computed(() => mergedShowLine.value && props.isLast)
    const hasTopLine = computed(() => mergedShowLine.value && !props.isLeaf && (!props.isFirst || props.level !== 0))
    const hasBottomLine = computed(() => mergedShowLine.value && !props.isLeaf && !props.isLast)
    const selected = computed(() => selectedKeys.value.includes(nodeKey.value))
    const checked = computed(() => isChecked(props.node.key))
    const disabled = computed(() => props.selectDisabled || !treeProps.selectable)

    const dragging = computed(() => dragKey.value === nodeKey.value)
    const dropping = computed(() => dropKey.value === nodeKey.value)
    const dropParent = computed(() => dropParentKey.value === nodeKey.value)
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
      const nodeMap = flattenedNodeMap.value

      const { isLeaf, label, level, rawNode, expanded, checkDisabled, dragDisabled, dropDisabled, node } = props
      const { checkable, draggable } = treeProps
      const mergedDraggable = draggable && !dragDisabled
      const draggableIconNode = slots.draggableIcon?.() ?? <IxIcon name={draggableIcon.value} />
      const currNode = nodeMap.get(nodeKey.value)
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
          aria-selected={String(checked.value)}
          aria-expanded={!isLeaf ? String(expanded) : undefined}
          aria-level={level}
          role="treeitem"
          draggable={mergedDraggable || undefined}
          title={label}
          onDragstart={mergedDraggable ? onDragstart : undefined}
          onDragend={mergedDraggable ? onDragend : undefined}
          onDragenter={mergedDraggable ? onDragenter : undefined}
          onDragover={mergedDraggable ? onDragover : undefined}
          onDragleave={mergedDraggable ? onDragleave : undefined}
          onDrop={mergedDraggable && !dropDisabled ? onDrop : undefined}
          {...customAdditional}
        >
          <Indent level={level} noopIdentUnitArr={noopIdentUnitArr} prefixCls={mergedPrefixCls.value} />
          {mergedDraggable ? (
            <span class={`${mergedPrefixCls.value}-node-draggable-icon`} role="img">
              {draggableIconNode}
            </span>
          ) : (
            draggable && <span class={`${mergedPrefixCls.value}-node-draggable-icon-noop`}></span>
          )}
          {isLeaf && mergedShowLine.value ? (
            <LeafLine v-slots={slots} />
          ) : (
            <Expand
              v-slots={slots}
              expanded={expanded}
              hasTopLine={hasTopLine.value}
              hasBottomLine={hasBottomLine.value}
              isLeaf={isLeaf}
              nodeKey={nodeKey.value}
              rawNode={rawNode}
            />
          )}
          {checkable && <Checkbox checkDisabled={checkDisabled} node={node} />}
          <Content
            v-slots={slots}
            disabled={disabled.value}
            node={node}
            nodeKey={nodeKey.value}
            label={label}
            selected={selected.value}
          />
        </div>
      )
    }
  },
})
