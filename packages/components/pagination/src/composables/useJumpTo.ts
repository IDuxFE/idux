/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, withKeys } from 'vue'

import { convertNumber } from '@idux/cdk/utils'

export function useJumpToIndex(
  activeIndex: ComputedRef<number>,
  changePageIndex: (index: number) => void,
  simple: ComputedRef<boolean>,
): (event: KeyboardEvent) => void {
  const jumpToIndex = (evt: KeyboardEvent) => {
    const target = evt.target as HTMLInputElement
    const index = Math.floor(convertNumber(target.value, activeIndex.value))
    changePageIndex(index)
    target.value = simple.value ? `${activeIndex.value}` : ''
  }

  return withKeys(jumpToIndex, ['enter'])
}
