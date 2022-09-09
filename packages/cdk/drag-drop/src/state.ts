/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDBackendType, DnDEventType, DnDPosition } from './types'

export class DnDState {
  prevPos: DnDPosition = { x: 0, y: 0 }
  startTransform: DnDPosition = { x: 0, y: 0 }
  activeTransform: DnDPosition = { x: 0, y: 0 }

  isNative = false
  dragging = false
  canDrop = false

  constructor(backend: DnDBackendType = 'native', oldTransform?: DnDPosition) {
    this.isNative = backend === 'native'
    if (oldTransform) {
      this.activeTransform = oldTransform
    }
  }

  start(evt: DnDEventType): void {
    const event = this.wrapperEvent(evt)

    this.prevPos = {
      x: event.pageX || event.clientX,
      y: event.pageY || event.clientY,
    }
    this.startTransform = this.activeTransform
    this.dragging = true
  }

  updatePosition(evt: DnDEventType): void {
    if (this.isNative && !this.canDrop) {
      // restore original position when dragging to restricted area
      this.activeTransform = this.startTransform
      return
    }

    const event = this.wrapperEvent(evt)
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
      x: this.activeTransform.x + position.x,
      y: this.activeTransform.y + position.y,
    }
  }

  end(): void {
    this.dragging = false
    this.canDrop = false
  }

  reset(): void {
    this.activeTransform = { x: 0, y: 0 }
    this.end()
  }

  wrapperEvent(evt: DnDEventType): MouseEvent | Touch {
    return 'touches' in evt ? evt.touches[0] : evt
  }
}
