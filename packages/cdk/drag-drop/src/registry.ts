/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDElement, DnDElementType, DnDEvent, DnDEventName } from './types'

import { MaybeElementRef, convertElement } from '@idux/cdk/utils'

type DnDEventsMap = { [key in DnDEventName]: DnDEvent }

type InnerRegistry = {
  checkConnect: (target: DnDElement, source: DnDElement) => boolean
  sources: Set<DnDElement>
  targets: Set<DnDElement>
  off: (el: DnDElement, type: DnDElementType) => void
  exec: (el: MaybeElementRef, type: DnDElementType, eventName: DnDEventName, callback: Parameters<DnDEvent>) => void
  connect: (target: DnDElement, source: DnDElement) => void
  on: (el: DnDElement, type: DnDElementType, eventName?: DnDEventName, handler?: DnDEvent) => void
}

export function DnDRegistry(): InnerRegistry {
  // 是否内存损耗过大，考虑使用唯一标识符来代替？
  const dndElMap = new Map<DnDElement, DnDEventsMap>()
  const connector = new Map<DnDElement, Set<DnDElement>>()
  const sources = new Set<DnDElement>()
  const targets = new Set<DnDElement>()

  /**
   * on a element handler to registry
   *
   * @param el
   * @param type
   * @param eventName
   * @param handler
   */
  const on = (el: DnDElement, type: DnDElementType, eventName?: DnDEventName, handler?: DnDEvent): void => {
    if (!sources.has(el) || !targets.has(el)) {
      switch (type) {
        case 'source':
          sources.add(el)
          break
        case 'target':
          targets.add(el)
      }

      if (!dndElMap.has(el)) {
        dndElMap.set(el, {} as DnDEventsMap)
      }
      if (eventName && handler) {
        dndElMap.get(el)![eventName] = handler
      }
    }
  }

  /**
   * unregister a element from the registry
   *
   * @param el
   * @param type
   */
  const off = (el: DnDElement, type: DnDElementType): void => {
    if (sources.has(el) || targets.has(el)) {
      switch (type) {
        case 'source':
          sources.delete(el)
          break
        case 'target':
          targets.delete(el)
      }
      dndElMap.delete(el)
      connector.delete(el)
      // connect 残留
    }
  }
  /**
   * batch exec related event handlers
   *
   * @example
   *  useEventListener(window, 'drag', (evt: DragEvent) => {
   *     exec('source', 'drag', [evt])
   *   })
   * @param el trigger
   * @param type source or target
   * @param eventName drag, dragstart, dragend, dragenter, dragover, dragleave, drop
   * @param callback event listener callback
   *
   * @returns void
   */
  const exec = (
    el: MaybeElementRef,
    type: DnDElementType,
    eventName: DnDEventName,
    callback: Parameters<DnDEvent>,
  ): void => {
    const elRef = convertElement(el)!
    switch (type) {
      case 'target':
        for (const source of connector.get(elRef)!) {
          if (source === callback[0].target) {
            dndElMap.get(source)![eventName]?.(...callback)
            return
          }
        }
        break
      case 'source':
        dndElMap.get(elRef)![eventName]?.(...callback)
        break
    }
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

  return {
    on,
    off,
    exec,
    connect,
    checkConnect,
    sources,
    targets,
  }
}
