/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, Ref, computed, ref } from 'vue'

import { convertArray, tryOnScopeDispose } from '@idux/cdk/utils'

import { matchMedia } from './mediaMatcher'

export interface MediaQueryState {
  /** Whether the media queries is currently matching. */
  matches: boolean
  /**
   * A key boolean pair for each query provided to the observe method,
   * with its current matched state.
   */
  medias: Record<string, boolean>
}

interface Query {
  referenceCnt: number
  media: string
  matches: Ref<boolean>
  destroy: () => void
}

/**  A map of all media queries currently being listened for. */
const _queries = new Map<string, Query>()

/**
 * @param value One or more media queries to check.
 * @return The matched state .
 */
export function useMediaQuery(value: string | string[]): ComputedRef<MediaQueryState> {
  const queries = splitQueries(value).map(query => registerQuery(query))
  tryOnScopeDispose(() => {
    queries.forEach(query => {
      // minus reference count
      query.referenceCnt--

      // do not destroy when the same query is used in more than one scope
      if (query.referenceCnt > 0) {
        return
      }

      query.destroy()
      _queries.delete(query.media)
    })
  })

  return computed(() => {
    let matches = false
    const medias: Record<string, boolean> = {}
    queries.forEach(query => {
      const currMatches = query.matches.value
      matches = matches || currMatches
      medias[query.media] = currMatches
    })
    return { matches, medias }
  })
}

/**
 * Whether one or more media queries match the current viewport size.
 *
 * @param value One or more media queries to check.
 * @returns Whether any of the media queries match.
 */
export function isMediaMatched(value: string | string[]): boolean {
  return splitQueries(value).some(query => matchMedia(query).matches)
}

/** Registers a specific query to be listened for. */
function registerQuery(query: string): Query {
  // Only set up a new MediaQueryList if it is not already being listened for.
  if (_queries.has(query)) {
    const output = _queries.get(query)!
    output.referenceCnt++

    return output
  }

  const mql = matchMedia(query)
  const matches = ref(mql.matches)
  const handler = (evt: MediaQueryListEvent) => {
    matches.value = evt.matches
  }
  mql.addEventListener('change', handler)
  const destroy = () => mql.removeEventListener('change', handler)

  const output = { referenceCnt: 1, matches, destroy, media: query }
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
