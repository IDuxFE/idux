/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ref } from 'vue'

import {
  type MaybeElementRef,
  NoopFunction,
  convertElement,
  tryOnScopeDispose,
  useEventListener,
} from '@idux/cdk/utils'

import { type ClickOutsideHandler, type ClickOutsideOptions } from './types'

/**
 * Listen for clicks outside of an element.
 *
 * @param target
 * @param handler
 * @param options
 * @returns
 */
export function useClickOutside(
  target: MaybeElementRef,
  handler: ClickOutsideHandler,
  options?: ClickOutsideOptions,
): () => void {
  const { container = window, exclude = [] } = options || {}

  if (!container) {
    return NoopFunction
  }

  const shouldListen = ref(true)

  let fallback: number

  const listener = (evt: MouseEvent) => {
    clearTimeout(fallback)

    const targetElement = convertElement(target)
    if (!targetElement || !shouldListen.value) {
      return
    }

    const eventTarget = evt.target
    const composedPath = evt.composedPath()
    if (
      targetElement === eventTarget ||
      composedPath.includes(targetElement) ||
      exclude.some(item => {
        const element = convertElement(item)
        return element && (element === eventTarget || composedPath.includes(element))
      })
    ) {
      return
    }

    handler(evt)
  }

  const listenerStops = [
    useEventListener(container, 'click', listener, { passive: true, capture: true }),
    useEventListener(
      container,
      'pointerdown',
      evt => {
        const targetElement = convertElement(target)
        shouldListen.value = !!targetElement && !evt.composedPath().includes(targetElement)
      },
      { passive: true },
    ),
    useEventListener(
      container,
      'pointerup',
      evt => {
        if (evt.button === 0) {
          const path = evt.composedPath()
          evt.composedPath = () => path
          fallback = setTimeout(() => listener(evt), 50)
        }
      },
      { passive: true },
    ),
  ]

  const stop = () => {
    listenerStops.forEach(listenerStop => listenerStop())
  }

  tryOnScopeDispose(stop)

  return stop
}
