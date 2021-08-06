import type { DeepReadonly, Ref } from 'vue'
import type { BreakpointKey } from './breakpoints'

import { onBeforeUnmount, reactive, readonly, ref, watchEffect } from 'vue'
import { invert } from 'lodash-es'
import { convertArray } from '@idux/cdk/utils'
import { BREAKPOINTS } from './breakpoints'
import { matchMedia } from './mediaMatcher'

export interface BreakpointState {
  /** Whether the breakpoint is currently matching. */
  matches: boolean
  /**
   * A key boolean pair for each query provided to the observe method,
   * with its current matched state.
   */
  medias: Record<string, boolean>
}

interface Query {
  matches: Ref<boolean>
  media: string
  watcher: number
  destroy: () => void
}

/**  A map of all media queries currently being listened for. */
const _queries = new Map<string, Query>()
const defaultMediaScreen = invert(BREAKPOINTS)

/**
 * @param value One or more media queries to check.
 * @return The reactive state of a layout breakpoint.
 */
export function useBreakpoints(value: string | string[]): DeepReadonly<BreakpointState> {
  const state = reactive<BreakpointState>({ matches: false, medias: {} })
  const queries = splitQueries(value).map(query => _registerQuery(query))

  watchEffect(() => {
    let matches = false
    queries.forEach(query => {
      const currMatches = query.matches.value
      matches = matches || currMatches
      state.medias[query.media] = currMatches
    })
    state.matches = matches
  })

  onBeforeUnmount(() => {
    queries
      .filter(query => !defaultMediaScreen[query.media] && --query.watcher === 0)
      .forEach(query => {
        query.destroy()
        _queries.delete(query.media)
      })
  })

  return readonly(state)
}

export function useBreakpointsMatch<T extends string>(value: Record<T, string>): DeepReadonly<Record<T, boolean>> {
  const match = reactive({} as Record<string, boolean>)
  const breakpointState = useBreakpoints(Object.values(value))

  watchEffect(() => {
    Object.entries(value).forEach(([key, value]) => {
      match[key as T] = breakpointState.medias[value as string]
    })
  })

  return readonly(match) as DeepReadonly<Record<T, boolean>>
}

let cachedScreens: DeepReadonly<Record<BreakpointKey, boolean>> | null = null
export function useScreens(): DeepReadonly<Record<BreakpointKey, boolean>> {
  if (!cachedScreens) {
    cachedScreens = useBreakpointsMatch(BREAKPOINTS)
  }
  return cachedScreens
}

/**
 * Whether one or more media queries match the current viewport size.
 * @param value One or more media queries to check.
 * @returns Whether any of the media queries match.
 */
export function isMatched(value: string | string[]): boolean {
  return splitQueries(value).some(query => matchMedia(query).matches)
}

/** Registers a specific query to be listened for. */
function _registerQuery(query: string): Query {
  // Only set up a new MediaQueryList if it is not already being listened for.
  if (_queries.has(query)) {
    const item = _queries.get(query)!
    item.watcher++
    return item
  }

  const mql = matchMedia(query)
  const matches = ref(mql.matches)
  const handler = (evt: MediaQueryListEvent) => {
    matches.value = evt.matches
  }
  mql.addEventListener('change', handler)
  const destroy = () => mql.removeEventListener('change', handler)

  const output = { matches, destroy, media: query, watcher: 0 }
  _queries.set(query, output)
  return output
}

/**
 * Split each query string into separate query strings if two queries are provided as comma separated.
 */
function splitQueries(queries: string | string[]): string[] {
  return convertArray(queries)
    .map((query: string) => query.split(','))
    .reduce((a1: string[], a2: string[]) => a1.concat(a2))
    .map(query => query.trim())
}
