/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Text, type VNodeChild } from 'vue'

import { isNumber, isObject, isString } from 'lodash-es'

import { Logger, type VKey, convertArray, flattenNode, uniqueId } from '@idux/cdk/utils'

import { type TableColumn } from '../types'

export function getColTitle(
  ellipsis: boolean | { title?: boolean } | undefined,
  children: VNodeChild,
  title: string | undefined,
): string | undefined {
  if (!ellipsis || (isObject(ellipsis) && ellipsis.title === false)) {
    return undefined
  }

  if (isString(children) || isNumber(children)) {
    return children as string
  }

  const textNode = flattenNode(children).find(node => node.type === Text)
  if (textNode) {
    return textNode.children as string
  }

  return title
}

export function getColumnKey(column: TableColumn): VKey {
  if ('key' in column) {
    return column.key!
  }
  if ('dataKey' in column) {
    return convertArray(column.dataKey).join('-')
  }
  if ('type' in column) {
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
