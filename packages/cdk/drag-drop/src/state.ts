/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDBackendType, DnDEventType, DnDPosition, LockAxisType } from './types'

import { getMouseEvent } from '@idux/cdk/utils'

export class DnDState {
  private sourceEl?: HTMLElement
  private boundaryEl?: HTMLElement
  private lockX = false
  private lockY = false

  private prevPos: DnDPosition = { x: 0, y: 0 }
  private startTransform: DnDPosition = { x: 0, y: 0 }
  public activeTransform: DnDPosition = { x: 0, y: 0 }

  public isNative = false
  public dragging = false
  public canDrop = false
  private hasBundary = false

  constructor(backend: DnDBackendType = 'native', oldTransform?: DnDPosition) {
    this.isNative = backend === 'native'
    if (oldTransform) {
      this.activeTransform = oldTransform
    }
  }

  public start(evt: DnDEventType): void {
    const event = getMouseEvent(evt)
    if (!event) {
      return
    }

    this.prevPos = {
      x: event.pageX || event.clientX,
      y: event.pageY || event.clientY,
    }
    this.startTransform = this.activeTransform
    this.dragging = true
  }

  public updatePosition(evt: DnDEventType): void {
    if (this.isNative && !this.canDrop) {
      // restore original position when dragging to restricted area
      this.activeTransform = this.startTransform
      return
    }

    const event = getMouseEvent(evt)
    if (!event) {
      return
    }

    const cursorPos = {
      x: event.pageX || event.clientX,
      y: event.pageY || event.clientY,
    }
    const position = {
      x: cursorPos.x - this.prevPos.x,
      y: cursorPos.y - this.prevPos.y,
    }

    this.prevPos = {
      x: cursorPos.x,
      y: cursorPos.y,
    }

    this.activeTransform = {
      x: this.activeTransform.x + (!this.lockY ? position.x : 0),
      y: this.activeTransform.y + (!this.lockX ? position.y : 0),
    }

    if (this.hasBundary) {
      this.limitToBoundary()
    }
  }

  public enableXYBoundary(sourceEl: HTMLElement, boundaryEl: HTMLElement, lockAxis?: LockAxisType): void {
    if (!boundaryEl) {
      this.hasBundary = false
      return
    }
    this.hasBundary = true
    this.sourceEl = sourceEl
    if (lockAxis) {
      this.lockX = lockAxis === 'x'
      this.lockY = lockAxis === 'y'
    }
    this.boundaryEl = boundaryEl
  }

  private limitToBoundary(): void {
    let { x, y } = this.activeTransform

    const elementRect = this.sourceEl!.getBoundingClientRect()
    const boundaryRect = this.boundaryEl!.getBoundingClientRect()

    if (
      (boundaryRect.width === 0 && boundaryRect.height === 0) ||
      (elementRect.width === 0 && elementRect.height === 0)
    ) {
      return
    }

    const leftOverflow = boundaryRect.left - elementRect.left
    const rightOverflow = elementRect.right - boundaryRect.right
    const topOverflow = boundaryRect.top - elementRect.top
    const bottomOverflow = elementRect.bottom - boundaryRect.bottom

    // If the element has become wider than the boundary
    if (boundaryRect.width > elementRect.width) {
      if (leftOverflow > 0) {
        x += leftOverflow
      }

      if (rightOverflow > 0) {
        x -= rightOverflow
      }
    } else {
      x = 0
    }

    // If the element has become taller than the boundary
    if (boundaryRect.height > elementRect.height) {
      if (topOverflow > 0) {
        y += topOverflow
      }

      if (bottomOverflow > 0) {
        y -= bottomOverflow
      }
    } else {
      y = 0
    }

    this.activeTransform = {
      x,
      y,
    }
  }
  public end(): void {
    this.dragging = false
    this.canDrop = false
  }

  public reset(): void {
    this.activeTransform = { x: 0, y: 0 }
    this.end()
  }
}
