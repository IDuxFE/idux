/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export const BREAKPOINTS = {
  xs: '(max-width: 767.99px)',
  sm: '(min-width: 768px) and (max-width: 1023.99px)',
  md: '(min-width: 1024px) and (max-width: 1279.99px)',
  lg: '(min-width: 1280px) and (max-width: 1719.99px)',
  xl: '(min-width: 1720px)',
} as const

export const BREAKPOINTS_KEYS = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export type BreakpointKey = typeof BREAKPOINTS_KEYS[number]
