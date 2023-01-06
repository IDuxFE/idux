/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InjectionKey } from 'vue'

import { inject, reactive, watchEffect } from 'vue'

import { createSharedComposable } from '@idux/cdk/utils'

import { useMediaQuery } from './mediaQuery'

export const BREAKPOINTS_KEYS = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export type BreakpointKey = (typeof BREAKPOINTS_KEYS)[number]

export const BREAKPOINTS: Record<BreakpointKey, string> = {
  xs: '(max-width: 599.99px)',
  sm: '(min-width: 600px) and (max-width: 959.99px)',
  md: '(min-width: 960px) and (max-width: 1279.99px)',
  lg: '(min-width: 1280px) and (max-width: 1719.99px)',
  xl: '(min-width: 1720px)',
}

export const BREAKPOINTS_TOKEN: InjectionKey<Record<BreakpointKey, string>> = Symbol('cdk-breakpoints')

export function useBreakpoints(): Record<BreakpointKey, boolean>
export function useBreakpoints<T extends string>(value: Record<T, string>): Record<T, boolean>
export function useBreakpoints<T extends string>(value?: Record<T, string>): Record<T, boolean> {
  const medias = value ?? inject(BREAKPOINTS_TOKEN, BREAKPOINTS)
  const queryState = useMediaQuery(Object.values(medias))
  const match = reactive({} as Record<string, boolean>)
  watchEffect(() => {
    const state = queryState.value
    Object.entries(medias).forEach(([key, value]) => {
      match[key as T] = state.medias[value as string]
    })
  })

  return match as Record<T, boolean>
}

export const useSharedBreakpoints = createSharedComposable(() => useBreakpoints())
