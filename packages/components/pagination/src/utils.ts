import { inject, withKeys } from 'vue'
import { toNumber } from '@idux/cdk/utils'
import { paginationToken } from './token'

export function useJumpToIndex(isClear: boolean): (event: KeyboardEvent) => void {
  const { activeIndex, onPageIndexChange } = inject(paginationToken)!

  const _jumpToIndex = (evt: KeyboardEvent) => {
    const target = evt.target as HTMLInputElement
    const index = Math.floor(toNumber(target.value, activeIndex.value))
    onPageIndexChange(index)
    if (isClear) {
      target.value = ''
    }
  }

  return withKeys(_jumpToIndex, ['enter'])
}
