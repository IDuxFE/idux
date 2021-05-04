import type { ComputedRef } from 'vue'
import type { MenuMode } from './types'

import { computed } from 'vue'

export const usePaddingLeft = (
  mode: ComputedRef<MenuMode>,
  indent: ComputedRef<number>,
  level: number,
  grouped: boolean,
): ComputedRef<string | null> => {
  return computed(() => {
    if (mode.value !== 'inline') {
      return null
    }
    const groupedLeft = grouped ? 8 : 0
    return `${indent.value * level + groupedLeft}px`
  })
}
