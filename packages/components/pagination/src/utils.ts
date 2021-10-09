/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { inject, withKeys } from 'vue'

import { convertNumber } from '@idux/cdk/utils'

import { paginationToken } from './token'

export function useJumpToIndex(isClear: boolean): (event: KeyboardEvent) => void {
  const { activeIndex, onPageIndexChange } = inject(paginationToken)!

  const _jumpToIndex = (evt: KeyboardEvent) => {
    const target = evt.target as HTMLInputElement
    const index = Math.floor(convertNumber(target.value, activeIndex.value))
    onPageIndexChange(index)
    if (isClear) {
      target.value = ''
    }
  }

  return withKeys(_jumpToIndex, ['enter'])
}
