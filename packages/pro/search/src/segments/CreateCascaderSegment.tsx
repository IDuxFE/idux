/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CascaderPanelData, CascaderSearchField, PanelRenderContext, Segment } from '../types'

import { ref } from 'vue'

import { isNil, toString } from 'lodash-es'

import { type VKey, convertArray, traverseTree } from '@idux/cdk/utils'
import { type TreeCheckStateResolver, useTreeCheckStateResolver } from '@idux/components/utils'

import CascaderPanel from '../panel/CascaderPanel'
import { getSelectableCommonParams } from '../utils'

const defaultSeparator = '|'
const defaultPathSeparator = '/'
const defaultCascaderStrategy = 'parent'
const defaultFullPath = false

export function createCascaderSegment(
  prefixCls: string,
  searchField: CascaderSearchField,
): Segment<VKey | (VKey | VKey[])[] | undefined> {
  const {
    fieldConfig: {
      dataSource,
      cascaderStrategy,
      expandIcon,
      expandTrigger,
      fullPath,
      pathSeparator,
      separator,
      searchable,
      searchFn,
      multiple,
      virtual,
      onExpand,
      onSearch,
      onLoaded,
    },
    defaultValue,
    inputClassName,
    onPanelVisibleChange,
  } = searchField

  const nodeKeyMap = new Map<VKey, CascaderPanelData>()
  const parentKeyMap = new Map<VKey, VKey>()
  const nodeLabelMap = new Map<string | number, CascaderPanelData[]>()
  const depthMap = new Map<VKey, number>()

  const mergedCascaderStrategy = cascaderStrategy ?? defaultCascaderStrategy
  traverseTree(dataSource, 'children', (item, parents) => {
    nodeKeyMap.set(item.key, item)
    nodeLabelMap.set(toString(item.label).trim(), [...(nodeLabelMap.get(item.label) ?? []), item])
    parents[0] && parentKeyMap.set(item.key, parents[0].key)
    depthMap.set(item.key, parents.length)
  })
  const checkedKeysResolver = useTreeCheckStateResolver(
    ref({
      data: dataSource,
      dataMap: nodeKeyMap,
      parentKeyMap,
      depthMap,
    }),
    ref('children'),
    ref((item: CascaderPanelData) => item.key),
    ref(mergedCascaderStrategy),
  )

  const panelRenderer = (context: PanelRenderContext<VKey | (VKey | VKey[])[] | undefined>) => {
    const { ok, cancel } = context
    const { panelValue, searchInput, handleChange } = getSelectableCommonParams<VKey | VKey[]>(
      context,
      !!multiple,
      separator ?? defaultSeparator,
    )

    return (
      <CascaderPanel
        value={panelValue}
        searchValue={searchable && searchInput ? searchInput : undefined}
        dataSource={dataSource}
        expandIcon={expandIcon}
        expandTrigger={expandTrigger}
        fullPath={fullPath ?? defaultFullPath}
        strategy={mergedCascaderStrategy}
        separator={pathSeparator}
        multiple={multiple}
        virtual={virtual}
        searchFn={searchFn}
        onExpand={onExpand}
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
    inputClassName: [inputClassName, `${prefixCls}-cascader-segment-input`],
    placeholder: searchField.placeholder,
    defaultValue,
    parse: input => parseInput(input, searchField, nodeLabelMap, checkedKeysResolver, parentKeyMap),
    format: value => formatValue(value, searchField, nodeKeyMap),
    panelRenderer,
    onVisibleChange: onPanelVisibleChange,
  }
}

function parseInput(
  input: string,
  searchField: CascaderSearchField,
  nodeLabelMap: Map<string | number, CascaderPanelData[]>,
  checkedKeysResolver: TreeCheckStateResolver<CascaderPanelData, 'children'>,
  parentKeyMap: Map<VKey, VKey>,
): VKey | (VKey | VKey[])[] | undefined {
  const { fullPath, separator, multiple, pathSeparator } = searchField.fieldConfig
  const trimedInput = input.trim()

  const keys = getKeyByLabels(
    nodeLabelMap,
    trimedInput.split(separator ?? defaultSeparator),
    checkedKeysResolver,
    parentKeyMap,
    fullPath ?? defaultFullPath ? pathSeparator ?? defaultPathSeparator : undefined,
  )

  return multiple ? (keys.length > 0 ? keys : undefined) : keys[0]
}

function formatValue(
  value: VKey | (VKey | VKey[])[] | undefined,
  searchField: CascaderSearchField,
  nodeKeyMap: Map<VKey, CascaderPanelData>,
): string {
  const { fullPath, multiple, separator, pathSeparator } = searchField.fieldConfig
  if (isNil(value)) {
    return ''
  }

  return getLabelByKeys(
    nodeKeyMap,
    (multiple ? value : [value]) as VKey[] | VKey[][],
    fullPath ?? defaultFullPath ? pathSeparator ?? defaultPathSeparator : undefined,
  ).join(` ${separator ?? defaultSeparator} `)
}

function getLabelByKeys(
  nodeKeyMap: Map<VKey, CascaderPanelData>,
  keys: VKey[] | VKey[][],
  pathSeparator: string | undefined,
): string[] {
  if (keys.length <= 0) {
    return []
  }

  return keys
    .map(_keys =>
      convertArray(_keys)
        .map(key => nodeKeyMap.get(key)?.label)
        .join(pathSeparator),
    )
    .filter(Boolean) as string[]
}

function getKeyByLabels(
  nodeLabelMap: Map<string | number, CascaderPanelData[]>,
  labels: string[],
  checkedKeysResolver: TreeCheckStateResolver<CascaderPanelData, 'children'>,
  parentKeyMap: Map<VKey, VKey>,
  pathSeparator: string | undefined,
): (VKey | VKey[])[] {
  if (labels.length <= 0) {
    return []
  }

  const trimedLabels = labels.map(label => label.trim())

  const keys = trimedLabels
    .map(label => {
      if (!pathSeparator) {
        return nodeLabelMap.get(label)?.[0].key
      }

      const separatedLabels = label.split(pathSeparator)
      return separatedLabels.length > 0 && nodeLabelMap.get(separatedLabels.pop()!)?.[0].key
    })
    .filter(Boolean) as VKey[]

  const checkedKeys = checkedKeysResolver.appendKeys([], keys)

  if (!pathSeparator) {
    return checkedKeys
  }

  const getKeys = (key: VKey) => {
    const keys = [key]
    let currentKey = key

    while (parentKeyMap.has(currentKey)) {
      keys.unshift((currentKey = parentKeyMap.get(currentKey)!))
    }

    return keys
  }

  return checkedKeys.map(key => getKeys(key))
}
