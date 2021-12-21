/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TreeSelectNode } from '../types'
import type { VKey } from '@idux/cdk/utils'

import { computed, defineComponent, inject, ref } from 'vue'

import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { IxButton } from '@idux/components/button'
import { IxInput } from '@idux/components/input'
import { IxTree } from '@idux/components/tree'

import { covertMergeNodes, covertMergedNodeMap } from '../composables/useDataSource'
import { treeSelectToken } from '../token'

export default defineComponent({
  setup() {
    const {
      config,
      props,
      slots: treeSelectSlots,
      getNodeKey,
      mergedPrefixCls,
      mergedNodeMap,
      selectedValue,
      searchValue,
      expandedKeys,
      treeRef,
      setExpandedKeys,
      setExpandAll,
      changeSelected,
      handleNodeClick,
    } = inject(treeSelectToken)!

    //onMounted(() => scrollToActivated())

    const [loadedKeys, setLoadedKeys] = useControlledProp(props, 'loadedKeys', () => [])
    const expandAllBtnStatus = ref(false)

    const handleScrolledChange = (startIndex: number, endIndex: number, visibleNodes: any[]) => {
      const { onScrolledChange } = props
      callEmit(
        onScrolledChange,
        startIndex,
        endIndex,
        visibleNodes.map(item => item.rawNode),
      )
    }

    // 防止异步请求模式下触发outside click
    const handleClick = (evt: Event) => {
      evt.stopPropagation()
    }

    const handleCheck = (checked: boolean, node: TreeSelectNode) => {
      const { onCheck } = props
      callEmit(onCheck, checked, node)
      handleNodeClick()
    }

    const handleSelect = (selected: boolean, node: TreeSelectNode) => {
      const { onSelect } = props
      callEmit(onSelect, selected, node)
      handleNodeClick()
    }

    const handleExpand = (expanded: boolean, node: TreeSelectNode) => {
      const { onExpand } = props
      callEmit(onExpand, expanded, node)
    }

    const handleExpandedChange = (expendedKeys: VKey[], expendedNodes: TreeSelectNode[]) => {
      const { onExpandedChange } = props
      callEmit(onExpandedChange, expendedKeys, expendedNodes)
      setExpandedKeys(expendedKeys)
    }

    const handleExpandAll = (evt: Event) => {
      const currStatus = expandAllBtnStatus.value
      setExpandAll(!currStatus)
      expandAllBtnStatus.value = !currStatus
      evt.stopPropagation()
    }

    const onLoaded = async (loadedKeys: VKey[], node: TreeSelectNode) => {
      const childrenNodes = node.children ?? []
      const key = node.key!
      const nodeMap = mergedNodeMap.value
      const currNode = nodeMap.get(key)
      if (childrenNodes.length && currNode) {
        const mergedChildren = covertMergeNodes(props, getNodeKey, childrenNodes, config, key)
        covertMergedNodeMap(mergedChildren, nodeMap)
        currNode.rawNode.children = childrenNodes
        currNode.children = mergedChildren
        setLoadedKeys(loadedKeys)
        callEmit(props.onLoaded, loadedKeys, node)
      }
    }

    const handleSearchInput = (evt: Event) => {
      const { value } = evt.target as HTMLInputElement
      if (value !== searchValue.value) {
        searchValue.value = value
      }
    }

    const handleSearchClear = (evt: Event) => {
      searchValue.value = ''
      evt.stopPropagation()
    }

    const checkable = computed(() => props.multiple && props.checkable)
    const cascade = computed(() => checkable.value && props.cascade)

    return () => {
      const {
        checkStrategy,
        childrenKey,
        dataSource,
        draggable,
        empty,
        expandIcon,
        multiple,
        nodeKey,
        leafLineIcon,
        labelKey,
        virtual,
        searchable,
        showLine,
        onDragstart,
        onDragend,
        onDragenter,
        onDragleave,
        onDragover,
        onDrop,
        onNodeClick,
        onNodeContextmenu,
        onScroll,
        onScrolledBottom,
        onSearchedChange,
        droppable,
        treeDisabled,
        loadChildren,
        searchFn,
        overlayRender,
        overlayHeight,
      } = props

      const prefixCls = mergedPrefixCls.value
      const treeSlots = {
        label: treeSelectSlots.treeLabel,
        prefix: treeSelectSlots.treePrefix,
        suffix: treeSelectSlots.treeSuffix,
        leafLineIcon: treeSelectSlots.leafLineIcon,
        empty: treeSelectSlots.empty,
        expandIcon: treeSelectSlots.expandIcon,
      }

      const children = [
        <IxTree
          ref={treeRef}
          v-slots={treeSlots}
          blocked
          checkedKeys={selectedValue.value}
          expandedKeys={expandedKeys.value}
          loadedKeys={loadedKeys.value}
          labelKey={labelKey ?? config.labelKey}
          checkable={checkable.value}
          cascade={cascade.value}
          childrenKey={childrenKey ?? config.childrenKey}
          checkStrategy={checkStrategy}
          dataSource={dataSource}
          draggable={draggable}
          droppable={droppable}
          disabled={treeDisabled}
          empty={empty}
          expandIcon={expandIcon}
          height={overlayHeight}
          nodeKey={nodeKey ?? config.nodeKey}
          loadChildren={loadChildren}
          leafLineIcon={leafLineIcon}
          virtual={virtual}
          selectable={multiple ? 'multiple' : true}
          selectedKeys={selectedValue.value}
          searchValue={searchValue.value}
          searchFn={searchFn}
          showLine={showLine}
          onClick={handleClick}
          onCheck={handleCheck}
          onDragstart={onDragstart}
          onDragend={onDragend}
          onDragenter={onDragenter}
          onDragleave={onDragleave}
          onDragover={onDragover}
          onDrop={onDrop}
          onNodeClick={onNodeClick}
          onNodeContextmenu={onNodeContextmenu}
          onExpand={handleExpand}
          onSelect={handleSelect}
          onLoaded={onLoaded}
          onCheckedChange={changeSelected}
          onSelectedChange={changeSelected}
          onSearchedChange={onSearchedChange}
          onExpandedChange={handleExpandedChange}
          onScroll={onScroll}
          onScrolledBottom={onScrolledBottom}
          onScrolledChange={handleScrolledChange}
        />,
      ]

      if (searchable === 'overlay') {
        children.unshift(
          <div class={`${prefixCls}-overlay-search-wrapper`}>
            <IxButton
              size="md"
              icon={expandAllBtnStatus.value ? 'tree-expand' : 'tree-unexpand'}
              onClick={handleExpandAll}
            />
            <IxInput
              clearable
              suffix="search"
              value={searchValue.value}
              onInput={handleSearchInput}
              onClear={handleSearchClear}
            />
          </div>,
        )
      }

      return overlayRender ? overlayRender(children) : <div>{children}</div>
    }
  },
})
