/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { isBrowser, isWebKit } from '@idux/cdk/platform'
import { Logger } from '@idux/cdk/utils'

/** Global registry for all dynamically-created, injected media queries. */
const mediaQueriesForWebkitCompatibility: Set<string> = new Set<string>()

/** Style tag that holds all of the dynamically-created media queries. */
let mediaQueryStyleNode: HTMLStyleElement | undefined

/**
 * For Webkit engines that only trigger the MediaQueryListListener when
 * there is at least one CSS selector for the respective media query.
 */
function createEmptyStyleRule(query: string): void {
  if (mediaQueriesForWebkitCompatibility.has(query)) {
    return
  }

  try {
    if (!mediaQueryStyleNode) {
      mediaQueryStyleNode = document.createElement('style')
      mediaQueryStyleNode.setAttribute('type', 'text/css')
      document.head.appendChild(mediaQueryStyleNode)
    }

    if (mediaQueryStyleNode.sheet) {
      ;(mediaQueryStyleNode.sheet as CSSStyleSheet).insertRule(`@media ${query} {.fx-query-test{ }}`, 0)
      mediaQueriesForWebkitCompatibility.add(query)
    }
  } catch (err) {
    Logger.error(err)
  }
}

/** No-op matchMedia replacement for non-browser platforms. */
function noopMatchMedia(query: string): MediaQueryList {
  return {
    matches: query === 'all' || query === '',
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  } as unknown as MediaQueryList
}

/**  matchMedia is bound to the window scope intentionally as it is an illegal invocation to call it from a different scope. */
const _matchMedia = isBrowser && window.matchMedia ? window.matchMedia.bind(window) : noopMatchMedia

/**
 * A utility for calling matchMedia queries.
 *
 * Evaluates the given media query and returns the native MediaQueryList from which results
 * can be retrieved.
 * Confirms the layout engine will trigger for the selector query provided and returns the
 * MediaQueryList for the query provided.
 */
export const matchMedia = (query: string): MediaQueryList => {
  if (isWebKit) {
    createEmptyStyleRule(query)
  }
  return _matchMedia(query)
}
