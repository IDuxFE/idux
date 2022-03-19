/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type UnwrapRef, unref } from 'vue'

export type ConvertToSlotParams<T> = {
  [key in keyof T]: UnwrapRef<T[key]>
}
export function convertToSlotParams<T = Record<string, unknown>>(obj: T): ConvertToSlotParams<T> {
  const params: Record<string, unknown> = {}

  Object.keys(obj).forEach(key => {
    params[key] = unref(obj[key as keyof T])
  })

  return params as ConvertToSlotParams<T>
}
