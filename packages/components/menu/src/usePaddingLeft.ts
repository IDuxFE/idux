import type { ComputedRef } from 'vue'
import type { MenuMode } from './types'

import { computed } from 'vue'

export const usePaddingLeft = (
  mode: ComputedRef<MenuMode>,
  indent: ComputedRef<number>,
  level: number,
  grouped: boolean,
): ComputedRef<string | undefined> => {
  return computed(() => {
    if (mode.value !== 'inline') {
      return undefined
    }
    const groupedLeft = grouped ? 8 : 0
    return `${indent.value * level + groupedLeft}px`
  })
}
