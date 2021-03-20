/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import type { ComputedRef } from 'vue'
import { reactive, computed } from 'vue'
import { matchMedia } from './mediaMatcher'

/** The current state of a layout breakpoint. */
export interface BreakpointState {
  /** Whether the breakpoint is currently matching. */
  matches: boolean
  /**
   * A key boolean pair for each query provided to the observe method,
   * with its current matched state.
   */
  breakpoints: Record<string, boolean>
}

/** The current state of a layout breakpoint. */
interface InternalBreakpointState {
  /** Whether the breakpoint is currently matching. */
  matches: boolean
  /** The media query being to be matched */
  query: string
}

interface Query {
  state: InternalBreakpointState
  mql: MediaQueryList
}

/**  A map of all media queries currently being listened for. */
const _queries = new Map<string, Query>()
/** A subject for all other observables to takeUntil based on. */
const _destroys: Array<() => void> = []

/**
 * Whether one or more media queries match the current viewport size.
 * @param value One or more media queries to check.
 * @returns Whether any of the media queries match.
 */
export function isMatchedBreakpoint(value: string | string[]): boolean {
  return splitQueries(value).some(mediaQuery => _registerQuery(mediaQuery).mql.matches)
}

/**
 * Gets an observable of results for the given queries that will emit new results for any changes
 * in matching of the given queries.
 * @param value One or more media queries to check.
 * @returns A stream of matches for the given queries.
 */
export function observeBreakpoint(value: string | string[]): ComputedRef<BreakpointState> {
  const breakpointStates = splitQueries(value).map(query => _registerQuery(query).state)

  return computed(() => {
    let matches = false
    const breakpoints: Record<string, boolean> = {}

    breakpointStates.forEach(state => {
      matches = matches || state.matches
      breakpoints[state.query] = state.matches
    })
    return { matches, breakpoints }
  })
}

/** Completes the active subject, signalling to all other observables to complete. */
export function cleanObservables(): void {
  _queries.clear()
  _destroys.forEach(destroy => destroy())
}

/** Registers a specific query to be listened for. */
function _registerQuery(query: string): Query {
  // Only set up a new MediaQueryList if it is not already being listened for.
  if (_queries.has(query)) {
    return _queries.get(query)!
  }

  const mql = matchMedia(query)

  const state = reactive({ query, matches: mql.matches })

  const handler = (e: MediaQueryListEvent) => {
    state.matches = e.matches
  }
  mql.addEventListener('change', handler)
  _destroys.push(() => mql.removeEventListener('change', handler))

  // Add the MediaQueryList to the set of queries.
  const output = { state, mql }
  _queries.set(query, output)
  return output
}

/**
 * Split each query string into separate query strings if two queries are provided as comma separated.
 */
function splitQueries(queries: string | string[]): string[] {
  const _queries = Array.isArray(queries) ? queries : [queries]
  return _queries
    .map((query: string) => query.split(','))
    .reduce((a1: string[], a2: string[]) => a1.concat(a2))
    .map(query => query.trim())
}
