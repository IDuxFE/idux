/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComponentPublicInstance, onScopeDispose, watch } from 'vue'

import { MaybeElementRef, MaybeRef, convertElement } from './convert'
import { off, on } from './dom'

export type EventListenerTarget = MaybeRef<HTMLElement | Document | Window | ComponentPublicInstance | null | undefined>

export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: EventListenerTarget,
  type: K | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: ((this: HTMLElement, ev: HTMLElementEventMap[K]) => any) | undefined,
  options?: boolean | AddEventListenerOptions,
): { stop: () => void }
export function useEventListener(
  target: EventListenerTarget,
  type: string | undefined,
  listener: EventListenerOrEventListenerObject | undefined,
  options?: boolean | AddEventListenerOptions,
): { stop: () => void }
export function useEventListener(
  target: EventListenerTarget,
  type: string | undefined,
  listener: EventListenerOrEventListenerObject | undefined,
  options?: boolean | AddEventListenerOptions,
): { stop: () => void } {
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

  onScopeDispose(stop)

  return { stop }
}
