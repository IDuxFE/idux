/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualItemRenderFn, VirtualScrollInstance, VirtualScrollToOptions } from '@idux/cdk/scroll'
import type { StyleValue, VNodeTypes } from 'vue'

import { computed, defineComponent, provide, ref } from 'vue'

import { isNil, isString } from 'lodash-es'

import { CdkVirtualScroll } from '@idux/cdk/scroll'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxEmpty } from '@idux/components/empty'

import { useCheckable } from './composables/useCheckable'
import { FlattedNode, useFlattedNodes, useMergeNodes } from './composables/useDataSource'
import { useDragDrop } from './composables/useDragDrop'
import { useEvents } from './composables/useEvents'
import { useExpandable } from './composables/useExpandable'
import { useGetNodeKey } from './composables/useGetNodeKey'
import { useSearchable } from './composables/useSearchable'
import { useSelectable } from './composables/useSelectable'
import TreeNode from './node/TreeNode'
import { treeToken } from './token'
import { treeProps } from './types'

const hiddenStyle: StyleValue = {
  width: 0,
  height: 0,
  display: 'flex',
  overflow: 'hidden',
  opacity: 0,
  border: 0,
  padding: 0,
  margin: 0,
}

export default defineComponent({
  name: 'IxTree',
  props: treeProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tree`)
    const config = useGlobalConfig('tree')
    const getNodeKey = useGetNodeKey(props, config)
    const { mergedNodes, mergedNodeMap } = useMergeNodes(props, getNodeKey)
    const { searchedKeys, lastEffectiveSearchedKeys } = useSearchable(props, mergedNodeMap)
    const expandableContext = useExpandable(
      props,
      config,
      getNodeKey,
      mergedNodeMap,
      searchedKeys,
      lastEffectiveSearchedKeys,
    )
    const flattedNodes = useFlattedNodes(mergedNodes, expandableContext)
    const checkableContext = useCheckable(props, mergedNodeMap)
    const dragDropContext = useDragDrop(props, expandableContext)
    const selectableContext = useSelectable(props, mergedNodeMap)

    provide(treeToken, {
      props,
      slots,
      config,
      mergedPrefixCls,
      mergedNodeMap,
      getNodeKey,
      searchedKeys,
      ...checkableContext,
      ...expandableContext,
      ...dragDropContext,
      ...selectableContext,
    })

    const inputRef = ref<HTMLInputElement>()
    const virtualScrollRef = ref<VirtualScrollInstance>()

    const { activeKey } = selectableContext

    const { focused, handleFocus, handleBlur, handleKeydown, handleKeyup } = useEvents(
      props,
      mergedNodeMap,
      flattedNodes,
      expandableContext,
      selectableContext,
    )

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { blocked = config.blocked, showLine = config.showLine } = props
      return {
        [prefixCls]: true,
        [`${prefixCls}-active`]: activeKey.value !== undefined,
        [`${prefixCls}-blocked`]: blocked,
        [`${prefixCls}-focused`]: focused.value,
        [`${prefixCls}-show-line`]: showLine,
      }
    })

    const accessibilityPath = computed(() => {
      const _activeKey = activeKey.value
      if (isNil(_activeKey)) {
        return ''
      }
      const nodeMap = mergedNodeMap.value
      let path = String(_activeKey)
      let parentKey = nodeMap.get(_activeKey)?.parentKey
      while (parentKey) {
        path = `${String(parentKey)} > ${path}`
        parentKey = nodeMap.get(parentKey)?.parentKey
      }
      return path
    })

    const emptyProps = computed(() => {
      const { empty } = props
      return isString(empty) ? { description: empty } : empty
    })

    const focus = (options?: FocusOptions) => {
      inputRef?.value?.focus(options)
    }
    const blur = () => {
      inputRef?.value?.blur()
    }
    const scrollTo = (option?: number | VirtualScrollToOptions) => {
      virtualScrollRef?.value?.scrollTo(option)
    }

    expose({ focus, blur, scrollTo })

    const handleScrolledChange = (startIndex: number, endIndex: number, visibleNodes: FlattedNode[]) => {
      callEmit(
        props.onScrolledChange,
        startIndex,
        endIndex,
        visibleNodes.map(item => item.rawNode),
      )
    }

    return () => {
      const nodes = flattedNodes.value

      let children: VNodeTypes
      if (nodes.length > 0) {
        const itemRender: VirtualItemRenderFn<FlattedNode> = ({ item }) => (
          <TreeNode key={item.key} node={item}></TreeNode>
        )
        const { height, virtual, onScroll, onScrolledBottom } = props
        children = (
          <CdkVirtualScroll
            ref={virtualScrollRef}
            dataSource={nodes}
            height={height}
            itemHeight={28}
            itemKey="key"
            itemRender={itemRender}
            virtual={virtual}
            onScroll={onScroll}
            onScrolledBottom={onScrolledBottom}
            onScrolledChange={handleScrolledChange}
          />
        )
      } else {
        children = <IxEmpty {...emptyProps.value}></IxEmpty>
      }

      return (
        <div class={classes.value} role="tree">
          {focused.value && (
            <span style={hiddenStyle} aria-live="assertive">
              {accessibilityPath.value}
            </span>
          )}
          <input
            ref={inputRef}
            style={hiddenStyle}
            tabindex={(attrs.tabIndex as number) ?? 0}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeydown={handleKeydown}
            onKeyup={handleKeyup}
            value=""
            aria-label="for screen reader"
          />
          {children}
        </div>
      )
    }
  },
})
