/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComponentPublicInstance, watch } from 'vue'

import { type MaybeElementRef, type MaybeRef, convertElement } from './convert'
import { off, on } from './dom'
import { tryOnScopeDispose } from './tryOnScopeDispose'

export type EventListenerTarget = MaybeRef<HTMLElement | Document | Window | ComponentPublicInstance | null | undefined>

export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: EventListenerTarget,
  type: K | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: ((this: HTMLElement, ev: HTMLElementEventMap[K]) => any) | undefined,
  options?: boolean | AddEventListenerOptions,
): () => void
export function useEventListener(
  target: EventListenerTarget,
  type: string | undefined,
  listener: EventListenerOrEventListenerObject | undefined,
  options?: boolean | AddEventListenerOptions,
): () => void
export function useEventListener(
  target: EventListenerTarget,
  type: string | undefined,
  listener: EventListenerOrEventListenerObject | undefined,
  options?: boolean | AddEventListenerOptions,
): () => void {
  const stopWatch = watch(
    () => convertElement(target as unknown as MaybeElementRef),
    (currElement, prevElement) => {
      off(prevElement, type, listener, options)
      on(currElement, type, listener, options)
    },
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    off(convertElement(target as unknown as MaybeElementRef), type, listener, options)
    stopWatch()
  }

  tryOnScopeDispose(stop)

  return stop
}
