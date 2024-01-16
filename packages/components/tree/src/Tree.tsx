/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, type VNodeTypes, computed, defineComponent, normalizeStyle, provide, ref } from 'vue'

import { isNil } from 'lodash-es'

import {
  CdkVirtualScroll,
  type VirtualRowRenderFn,
  type VirtualScrollInstance,
  type VirtualScrollToOptions,
} from '@idux/cdk/scroll'
import { type VKey, callEmit, convertCssPixel } from '@idux/cdk/utils'
import { ɵEmpty } from '@idux/components/_private/empty'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'
import { useGetKey } from '@idux/components/utils'

import { useCheckable } from './composables/useCheckable'
import { type MergedNode, useFlattedNodes, useMergeNodes } from './composables/useDataSource'
import { useDragDrop } from './composables/useDragDrop'
import { useEvents } from './composables/useEvents'
import { useExpandable } from './composables/useExpandable'
import { useSearchable } from './composables/useSearchable'
import { useSelectable } from './composables/useSelectable'
import TreeNode from './node/TreeNode'
import { treeToken } from './token'
import { treeProps } from './types'
import { getThemeTokens } from '../theme'

const hiddenStyle: CSSProperties = {
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
    const { globalHashId, hashId, registerToken } = useThemeToken('tree')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-tree`)
    const config = useGlobalConfig('tree')

    const autoHeight = computed(() => props.autoHeight ?? config.autoHeight)
    const mergedChildrenKey = computed(() => props.childrenKey ?? config.childrenKey)
    const mergedGetKey = useGetKey(props, config, 'components/tree')
    const mergedLabelKey = computed(() => props.labelKey ?? config.labelKey)
    const mergedShowLine = computed(() => props.showLine ?? config.showLine)
    const mergedBlocked = computed(() => props.blocked ?? config.blocked)
    const mergedCheckOnClick = computed(() => props.checkable && props.checkOnClick)
    const { mergedNodes, mergedNodeMap } = useMergeNodes(props, mergedChildrenKey, mergedGetKey, mergedLabelKey)
    const { searchedKeys } = useSearchable(props, mergedNodeMap, mergedLabelKey)
    const expandableContext = useExpandable(
      props,
      config,
      mergedChildrenKey,
      mergedGetKey,
      mergedLabelKey,
      mergedNodeMap,
      searchedKeys,
    )
    const flattedNodes = useFlattedNodes(mergedNodes, expandableContext, props, searchedKeys)
    const checkableContext = useCheckable(props, mergedNodeMap)
    const dragDropContext = useDragDrop(props, config, expandableContext)
    const selectableContext = useSelectable(props, mergedNodeMap)

    provide(treeToken, {
      props,
      config,
      flattedNodes,
      mergedPrefixCls,
      mergedNodeMap,
      mergedGetKey,
      mergedShowLine,
      mergedCheckOnClick,
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
      return {
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-active`]: !isNil(activeKey.value),
        [`${prefixCls}-blocked`]: mergedBlocked.value,
        [`${prefixCls}-virtual`]: props.virtual,
        [`${prefixCls}-auto-height`]: autoHeight.value,
        [`${prefixCls}-focused`]: focused.value,
        [`${prefixCls}-show-line`]: mergedShowLine.value,
        [`${prefixCls}-empty`]: !flattedNodes.value.length,
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

    const focus = (options?: FocusOptions) => {
      inputRef?.value?.focus(options)
    }
    const blur = () => {
      inputRef?.value?.blur()
    }
    const scrollTo = (option?: number | VirtualScrollToOptions) => {
      virtualScrollRef.value?.scrollTo(option)
    }

    const getNode = (key: VKey) => {
      return mergedNodeMap.value.get(key)?.rawNode
    }

    const _getFlattedNodes = () => {
      return flattedNodes.value
    }

    expose({
      focus,
      blur,
      expandAll: expandableContext.expandAll,
      collapseAll: expandableContext.collapseAll,
      scrollTo,
      getNode,

      // private
      _getFlattedNodes,
    })

    const handleScrolledChange = (startIndex: number, endIndex: number, visibleNodes: MergedNode[]) => {
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
        const rowRender: VirtualRowRenderFn<MergedNode> = ({ item }) => (
          <TreeNode v-slots={slots} node={item} {...item}></TreeNode>
        )
        const { height, virtual, virtualItemHeight, virtualScrollMode, onScroll, onScrolledBottom } = props
        children = virtual ? (
          <CdkVirtualScroll
            ref={virtualScrollRef}
            class={`${mergedPrefixCls.value}-content`}
            dataSource={nodes}
            getKey="key"
            height={autoHeight.value ? '100%' : height}
            rowHeight={virtualItemHeight}
            rowRender={rowRender}
            virtual
            scrollMode={virtualScrollMode}
            onScroll={onScroll}
            onScrolledBottom={onScrolledBottom}
            onScrolledChange={handleScrolledChange}
          />
        ) : (
          <div
            class={`${mergedPrefixCls.value}-content`}
            style={normalizeStyle(autoHeight.value ? undefined : { maxHeight: convertCssPixel(height) })}
          >
            <div class={`${mergedPrefixCls.value}-content-inner`}>
              {nodes.map(item => (
                <TreeNode v-slots={slots} node={item} {...item}></TreeNode>
              ))}
            </div>
          </div>
        )
      } else {
        children = <ɵEmpty v-slots={slots} empty={props.empty} />
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
