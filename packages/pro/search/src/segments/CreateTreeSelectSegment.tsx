/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PanelRenderContext, Segment, SegmentState, TreeSelectPanelData, TreeSelectSearchField } from '../types'

import { isNil, isString, toString } from 'lodash-es'

import { type VKey, convertArray, traverseTree } from '@idux/cdk/utils'

import TreeSelectPanel from '../panel/TreeSelectPanel'
import { getSelectableCommonParams } from '../utils'

const defaultSeparator = '|'

export function createTreeSelectSegment(
  prefixCls: string,
  config: TreeSelectSearchField['fieldConfig'],
): Segment<VKey | VKey[] | undefined> {
  const {
    dataSource,
    checkable,
    cascaderStrategy,
    draggable,
    draggableIcon,
    defaultExpandedKeys,
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
  } = config

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
        defaultExpandedKeys={defaultExpandedKeys}
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
    name: 'treeSelect',
    inputClassName: [`${prefixCls}-tree-select-segment-input`],
    containerClassName: [`${prefixCls}-tree-select-segment-container`],
    parse: input => parseInput(input, config, nodeLabelMap),
    format: (value, states) => formatValue(value, states, config, nodeKeyMap),
    panelRenderer,
  }
}

function parseInput(
  input: string,
  config: TreeSelectSearchField['fieldConfig'],
  nodeLabelMap: Map<string | number, TreeSelectPanelData[]>,
): VKey | VKey[] | undefined {
  const { separator, multiple } = config
  const trimedInput = input.trim()

  const keys = getKeyByLabels(nodeLabelMap, trimedInput.split(separator ?? defaultSeparator))

  return multiple ? (keys.length > 0 ? keys : undefined) : keys[0]
}

function formatValue(
  value: VKey | VKey[] | undefined,
  states: SegmentState[] | undefined,
  config: TreeSelectSearchField['fieldConfig'],
  nodeKeyMap: Map<VKey, TreeSelectPanelData>,
): string {
  const { separator, searchable } = config
  if (isNil(value)) {
    return ''
  }

  const _separator = separator ?? defaultSeparator
  const labels = getLabelByKeys(nodeKeyMap, convertArray(value))

  if (searchable) {
    const inputParts = states ? states[states.length - 1]?.input?.split(_separator) ?? [] : []
    const lastInputPart = inputParts[inputParts.length - 1]?.trim() as string | undefined

    if (lastInputPart && !labels.includes(lastInputPart)) {
      return [...labels, lastInputPart].join(` ${_separator} `)
    }
  }

  return labels.join(` ${_separator} `)
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
