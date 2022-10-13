/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDElement, DnDEvent, DnDEventName } from './types'

import { DnDState } from './state'

type DnDStateMap = { [key in DnDEventName]: DnDEvent[] } & { state: DnDState }

type InnerRegistry = {
  on: (el: DnDElement, eventName?: DnDEventName, handler?: DnDEvent, state?: DnDState) => void
  off: (el: DnDElement) => void
  has: (el: DnDElement) => boolean
  exec: (el: DnDElement, eventName: DnDEventName, callback: Parameters<DnDEvent>) => void
  state: (el: DnDElement) => DnDState | undefined
  connect: (target: DnDElement, source: DnDElement) => void
  checkConnect: (target: DnDElement, source: DnDElement) => boolean
}

export const DnDRegistry = (): InnerRegistry => {
  const dndElMap = new Map<DnDElement, DnDStateMap>()
  const connector = new Map<DnDElement, Set<DnDElement>>()

  /**
   * on a element handler to registry
   *
   * @param el
   * @param eventName
   * @param handler
   * @param state
   */
  const on = (el: DnDElement, eventName?: DnDEventName, handler?: DnDEvent, state?: DnDState): void => {
    if (!dndElMap.has(el)) {
      const dndMap = {} as DnDStateMap
      dndMap.state = state ?? new DnDState()

      dndElMap.set(el, dndMap)
    }

    if (eventName && handler) {
      const dndEventsMap = dndElMap.get(el)!
      if (state) {
        dndEventsMap.state = state
      }
      let handlers = dndEventsMap[eventName]
      if (!handlers) {
        handlers = []
        dndEventsMap[eventName] = handlers
      }
      handlers.push(handler)
    }
  }

  /**
   * unregister a element from the registry
   *
   * @param el
   */
  const off = (el: DnDElement): void => {
    dndElMap.delete(el)
    connector.forEach(set => set.delete(el))
    connector.delete(el)
  }

  /**
   * batch exec related event handlers
   *
   * @example
   *  useEventListener(window, 'drag', (evt: DragEvent) => {
   *     exec('source', 'drag', [evt])
   *   })
   * @param el trigger
   * @param eventName drag, dragstart, dragend, dragenter, dragover, dragleave, drop
   * @param callback event listener callback
   *
   * @returns void
   */
  const exec = (el: DnDElement, eventName: DnDEventName, callback: Parameters<DnDEvent>): void => {
    dndElMap.get(el)?.[eventName]?.forEach(fun => fun(...callback))
  }

  const connect = (target: DnDElement, source: DnDElement): void => {
    if (!connector.has(target)) {
      connector.set(target, new Set())
    }
    connector.get(target)!.add(source)
  }

  const checkConnect = (target: DnDElement, source: DnDElement): boolean => {
    return connector.has(target) && connector.get(target)!.has(source)
  }

  const has = (el: DnDElement): boolean => {
    return dndElMap.has(el)
  }
  /**
   * on->state
   *
   * @param el
   */
  const state = (el: DnDElement): DnDState | undefined => {
    return dndElMap.get(el)?.state
  }

  return {
    on,
    off,
    has,
    exec,
    state,
    connect,
    checkConnect,
  }
}
