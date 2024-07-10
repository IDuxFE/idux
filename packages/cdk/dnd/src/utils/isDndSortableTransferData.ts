/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DndSortableTransferData } from '../types'

import { isNumber, isPlainObject, isString, isSymbol } from 'lodash-es'

export function isDndSortableTransferData(data: Record<string, unknown>): data is DndSortableTransferData {
  return (
    isNumber(data.listDataIndex) &&
    (isString(data.key) || isNumber(data.key) || isSymbol(data.key)) &&
    isPlainObject(data.listData)
  )
}
