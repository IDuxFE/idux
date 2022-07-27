/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */

import { type VNode, type VNodeChild } from 'vue'

import { isObject, isString } from 'lodash-es'

import { Logger, type VKey, convertArray, getFirstValidNode, uniqueId } from '@idux/cdk/utils'

import { type TableColumn } from '../types'

export function getColTitle(
  ellipsis: boolean | { title?: boolean },
  children: VNodeChild,
  title: string | undefined,
): string | undefined {
  if (!ellipsis || (isObject(ellipsis) && !ellipsis.title)) {
    return undefined
  }

  let _title = title
  if (isString(children)) {
    _title = children
  } else {
    const node = getFirstValidNode(children as VNode)
    if (node && isString(node.children)) {
      _title = node.children
    }
  }
  return _title
}

export function getColumnKey(column: TableColumn): VKey {
  if (column.key) {
    return column.key
  }
  // @ts-ignore
  if (column.dataKey && column.dataKey) {
    // @ts-ignore
    return convertArray(column.dataKey).join('-')
  }
  // @ts-ignore
  if (column.type) {
    // @ts-ignore
    return `__IDUX_table_column_key_${column.type}`
  }
  __DEV__ &&
    Logger.warn(
      'components/table',
      'Each column in table should have a unique `key`, `dataKey` or `type` prop.',
      column,
    )

  return uniqueId('__IDUX_table_column_key_')
}
