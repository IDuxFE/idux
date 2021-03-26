import type { Ref, InjectionKey, ComputedRef } from 'vue'
import type { RowPropGutter, RowRecordGutter, RowRecordArrGutter } from './types'
import type { ScreenMatch } from '@idux/cdk/breakpoint'

import { isObject, isArray, isUndefined } from '@idux/cdk/utils'
import { BreakpointKeys } from '@idux/cdk/breakpoint'

export type GutterType = [number, number]

export const gutterToken: InjectionKey<ComputedRef<GutterType>> = Symbol()

// gutter is {xs: 10, lg: 12}
export const isRecordGutter = (gutter: unknown): gutter is RowRecordGutter => isObject(gutter) && !isArray(gutter)

// gutter is [{xs: 10}, {xs: 12}]
export const isRecordArrGutter = (gutter: unknown): gutter is RowRecordArrGutter =>
  isArray(gutter) && (isRecordGutter(gutter[0]) || isRecordGutter(gutter[1]))

export const haveBreakpointGutter = (gutter: RowPropGutter): boolean =>
  isRecordGutter(gutter) || isRecordArrGutter(gutter)

// gutter: RowPropGutter => [0, 0]
export const normalizeGutter = (propGutter: RowPropGutter, screens: Ref<ScreenMatch>): GutterType => {
  const results: GutterType = [0, 0]
  const normalizedGutters = isArray(propGutter) ? propGutter : [propGutter, 0]
  normalizedGutters.forEach((gutter, index) => {
    if (isObject(gutter)) {
      BreakpointKeys.some(breakpoint => {
        if (screens.value[breakpoint] && !isUndefined(gutter[breakpoint])) {
          results[index] = gutter[breakpoint]
          return true
        }
        return false
      })
    } else {
      results[index] = gutter || 0
    }
  })
  return results
}
