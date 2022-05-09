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

import { isFunction } from 'lodash-es'

import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { ɵInput } from '@idux/components/_private/input'
import { IxButton } from '@idux/components/button'
import { IxTree } from '@idux/components/tree'

import { convertMergeNodes, convertMergedNodeMap } from '../composables/useDataSource'
import { treeSelectToken } from '../token'

export default defineComponent({
  setup() {
    const {
      config,
      props,
      slots: treeSelectSlots,
      locale,
      mergedPrefixCls,
      mergedChildrenKey,
      mergedGetKey,
      mergedLabelKey,
      mergedNodeMap,
      inputValue,
      setInputValue,
      treeRef,
      expandedKeys,
      setExpandedKeys,
      selectedValue,
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
        visibleNodes.map(item => item.rawData),
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
      currStatus ? treeRef.value?.expandAll() : treeRef.value?.collapseAll()
      expandAllBtnStatus.value = !currStatus
      evt.stopPropagation()
    }

    const onLoaded = async (loadedKeys: VKey[], node: TreeSelectNode) => {
      const childrenNodes = node.children ?? []
      const key = node.key!
      const nodeMap = mergedNodeMap.value
      const currNode = nodeMap.get(key)
      if (childrenNodes.length && currNode) {
        const childrenKey = mergedChildrenKey.value
        const mergedChildren = convertMergeNodes(
          props,
          childrenNodes,
          childrenKey,
          mergedGetKey.value,
          mergedLabelKey.value,
          key,
        )
        convertMergedNodeMap(mergedChildren, nodeMap)
        currNode.rawData[childrenKey] = childrenNodes
        currNode.children = mergedChildren
        setLoadedKeys(loadedKeys)
        callEmit(props.onLoaded, loadedKeys, node)
      }
    }

    const mergedClearIcon = computed(() => props.clearIcon ?? config.clearIcon)
    const handleInput = (evt: Event) => setInputValue((evt.target as HTMLInputElement).value)
    const handleClear = () => setInputValue('')

    const checkable = computed(() => props.multiple && props.checkable)
    const cascade = computed(() => checkable.value && props.cascade)

    return () => {
      const {
        checkStrategy,
        customAdditional,
        dataSource,
        draggable,
        empty,
        expandIcon,
        multiple,
        leafLineIcon,
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
          customAdditional={customAdditional}
          expandedKeys={expandedKeys.value}
          loadedKeys={loadedKeys.value}
          labelKey={mergedLabelKey.value}
          checkable={checkable.value}
          cascade={cascade.value}
          childrenKey={mergedChildrenKey.value}
          checkStrategy={checkStrategy}
          dataSource={dataSource}
          draggable={draggable}
          droppable={droppable}
          disabled={treeDisabled}
          empty={empty}
          expandIcon={expandIcon}
          getKey={mergedGetKey.value}
          height={overlayHeight}
          loadChildren={loadChildren}
          leafLineIcon={leafLineIcon}
          virtual={virtual}
          selectable={multiple ? 'multiple' : true}
          selectedKeys={selectedValue.value}
          searchValue={searchFn !== false ? inputValue.value : undefined}
          searchFn={isFunction(searchFn) ? searchFn : undefined}
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
          onExpandedChange={handleExpandedChange}
          onScroll={onScroll}
          onScrolledBottom={onScrolledBottom}
          onScrolledChange={handleScrolledChange}
        />,
      ]

      if (searchable === 'overlay') {
        const value = inputValue.value
        children.unshift(
          <div class={`${prefixCls}-overlay-search-wrapper`}>
            <IxButton
              size="md"
              title={expandAllBtnStatus.value ? locale.treeSelect.expandAll : locale.treeSelect.collapseAll}
              icon={expandAllBtnStatus.value ? 'tree-expand' : 'tree-unexpand'}
              onClick={handleExpandAll}
            />
            <ɵInput
              clearable
              clearIcon={mergedClearIcon.value}
              clearVisible={!!value}
              size="sm"
              suffix="search"
              value={value}
              onClear={handleClear}
              onInput={handleInput}
            />
          </div>,
        )
      }

      return <div>{overlayRender ? overlayRender(children) : children}</div>
    }
  },
})
