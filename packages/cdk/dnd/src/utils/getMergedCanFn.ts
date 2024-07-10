/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { isBoolean } from 'lodash-es'

export function getMergedCanFn<
  O,
  T extends undefined | boolean | ((options: O) => boolean | undefined) =
    | undefined
    | boolean
    | ((options: O) => boolean | undefined),
>(fn: () => T): (options: O) => boolean | undefined {
  return (options: O) => {
    const v = fn()
    if (isBoolean(v)) {
      return v
    }

    return v?.(options)
  }
}
