/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

let nodeId = 0
export function uniqueId(prefix = 'ix'): string {
  return `${prefix}-${nodeId++}`
}
