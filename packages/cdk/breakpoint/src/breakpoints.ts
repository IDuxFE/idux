import invert from 'lodash/invert'

type KeyFromValue<V, T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T]: V extends T[K] ? K : never
}[keyof T]

type Invert<T extends Record<PropertyKey, PropertyKey>> = {
  [V in T[keyof T]]: KeyFromValue<V, T>
}

export const BreakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const Breakpoints = {
  xs: '(max-width: 767.99px)',
  sm: '(min-width: 768px) and (max-width: 1023.99px)',
  md: '(min-width: 1024px) and (max-width: 1279.99px)',
  lg: '(min-width: 1280px) and (max-width: 1719.99px)',
  xl: '(min-width: 1720px)',
} as const

export type BreakpointKey = keyof typeof Breakpoints

export type ScreenMatch = Partial<Record<BreakpointKey, boolean>>

// { '(max-width: 767.99px)': 'xs' }
const mediaScreenMap = invert(Breakpoints) as Invert<typeof Breakpoints>

/** { '(min-width: 768px) and (max-width: 1023.99px)': true } => { sm: true } */
export const convertMediaToScreen = (medias: Record<keyof typeof mediaScreenMap, boolean>): ScreenMatch => {
  const result: ScreenMatch = {}
  const keys = Object.keys(medias) as Array<keyof typeof mediaScreenMap>
  keys.forEach(media => (result[mediaScreenMap[media]] = medias[media]))
  return result
}
