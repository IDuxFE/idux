/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PanelRenderContext, Segment, TreeSelectPanelData, TreeSelectSearchField } from '../types'

import { isNil, isString, toString } from 'lodash-es'

import { type VKey, convertArray, traverseTree } from '@idux/cdk/utils'

import TreeSelectPanel from '../panel/TreeSelectPanel'
import { getSelectableCommonParams } from '../utils'

const defaultSeparator = '|'

export function createTreeSelectSegment(
  prefixCls: string,
  searchField: TreeSelectSearchField,
): Segment<VKey | VKey[] | undefined> {
  const {
    fieldConfig: {
      dataSource,
      checkable,
      cascaderStrategy,
      draggable,
      draggableIcon,
      customDraggableIcon,
      expandIcon,
      customExpandIcon,
      separator,
      showLine,
      searchable,
      searchFn,
      multiple,
      virtual,
      onCheck,
      onDragstart,
      onDragend,
      onDragenter,
      onDragleave,
      onDragover,
      onDrop,
      onExpand,
      onSelect,
      onSearch,
      onLoaded,
    },
    inputClassName,
    containerClassName,
    onPanelVisibleChange,
  } = searchField

  const nodeKeyMap = new Map<VKey, TreeSelectPanelData>()
  const nodeLabelMap = new Map<string | number, TreeSelectPanelData[]>()
  traverseTree(dataSource, 'children', item => {
    nodeKeyMap.set(item.key, item)
    nodeLabelMap.set(toString(item.label).trim(), [...(nodeLabelMap.get(item.label) ?? []), item])
  })

  const panelRenderer = (context: PanelRenderContext<VKey | VKey[] | undefined>) => {
    const { ok, cancel, slots, renderLocation } = context
    const { panelValue, searchInput, handleChange } = getSelectableCommonParams(
      context,
      !!multiple,
      renderLocation === 'individual' ? separator ?? defaultSeparator : undefined,
      !multiple || renderLocation === 'quick-select-panel',
    )

    const treeSelectPanelSlots = {
      draggableIcon: isString(customDraggableIcon) ? slots[customDraggableIcon] : customDraggableIcon,
      expandIcon: isString(customExpandIcon) ? slots[customExpandIcon] : customExpandIcon,
    }

    return (
      <TreeSelectPanel
        v-slots={treeSelectPanelSlots}
        value={panelValue}
        searchValue={searchable && searchInput ? searchInput : undefined}
        autoHeight={renderLocation === 'quick-select-panel'}
        dataSource={dataSource}
        draggable={draggable}
        draggableIcon={draggableIcon}
        checkable={checkable}
        cascaderStrategy={cascaderStrategy}
        expandIcon={expandIcon}
        multiple={multiple}
        virtual={virtual}
        showLine={showLine}
        showFooter={renderLocation === 'individual'}
        searchFn={searchFn}
        onCheck={onCheck}
        onDragstart={onDragstart}
        onDragend={onDragend}
        onDragenter={onDragenter}
        onDragleave={onDragleave}
        onDragover={onDragover}
        onDrop={onDrop}
        onExpand={onExpand}
        onSelect={onSelect}
        onSearch={onSearch}
        onLoaded={onLoaded}
        onChange={handleChange}
        onConfirm={ok}
        onCancel={cancel}
      />
    )
  }

  return {
    name: searchField.type,
    inputClassName: [inputClassName, `${prefixCls}-tree-select-segment-input`],
    containerClassName: [containerClassName, `${prefixCls}-tree-select-segment-container`],
    placeholder: searchField.placeholder,
    parse: input => parseInput(input, searchField, nodeLabelMap),
    format: value => formatValue(value, searchField, nodeKeyMap),
    panelRenderer,
    onVisibleChange: onPanelVisibleChange,
  }
}

function parseInput(
  input: string,
  searchField: TreeSelectSearchField,
  nodeLabelMap: Map<string | number, TreeSelectPanelData[]>,
): VKey | VKey[] | undefined {
  const { separator, multiple } = searchField.fieldConfig
  const trimedInput = input.trim()

  const keys = getKeyByLabels(nodeLabelMap, trimedInput.split(separator ?? defaultSeparator))

  return multiple ? (keys.length > 0 ? keys : undefined) : keys[0]
}

function formatValue(
  value: VKey | VKey[] | undefined,
  searchField: TreeSelectSearchField,
  nodeKeyMap: Map<VKey, TreeSelectPanelData>,
): string {
  const { separator } = searchField.fieldConfig
  if (isNil(value)) {
    return ''
  }

  return getLabelByKeys(nodeKeyMap, convertArray(value)).join(` ${separator ?? defaultSeparator} `)
}

function getLabelByKeys(nodeKeyMap: Map<VKey, TreeSelectPanelData>, keys: VKey[]): (string | number)[] {
  if (keys.length <= 0) {
    return []
  }

  return keys.map(key => nodeKeyMap.get(key)?.label).filter(Boolean) as (string | number)[]
}

function getKeyByLabels(nodeLabelMap: Map<string | number, TreeSelectPanelData[]>, labels: string[]): VKey[] {
  if (labels.length <= 0) {
    return []
  }

  const trimedLabels = labels.map(label => label.trim())

  return trimedLabels.map(label => nodeLabelMap.get(label)?.[0].key).filter(Boolean) as VKey[]
}
