/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Modifier, PositioningStrategy, State } from '@popperjs/core'
import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue'

export type PopperPositioningStrategy = PositioningStrategy
export type PopperTrigger = 'click' | 'hover' | 'focus' | 'contextmenu' | 'manual'
export type PopperElement = ComponentPublicInstance | HTMLElement
export type PopperPlacement =
  | 'topStart'
  | 'top'
  | 'topEnd'
  | 'rightStart'
  | 'right'
  | 'rightEnd'
  | 'bottomStart'
  | 'bottom'
  | 'bottomEnd'
  | 'leftStart'
  | 'left'
  | 'leftEnd'

export interface PopperTriggerEvents {
  onClick?(event: Event): void
  onMouseenter?(event: Event): void
  onMouseleave?(event: Event): void
  onFocus?(event: Event): void
  onBlur?(event: Event): void
  onContextmenu?(event: Event): void
}

export interface PopperEvents {
  onMouseenter?(event: Event): void
  onMouseleave?(event: Event): void
}

export interface PopperOptions {
  /**
   * Whether to allow the mouse to enter the popper
   * * default is `true`
   */
  allowEnter?: boolean
  /**
   * Whether auto adjust when space is not enough
   * * default is `true`
   */
  autoAdjust?: boolean
  /**
   * Delay in ms once a trigger event is fired before a tippy shows or hides
   *
   * @example
   * * 0: disable delay, it is default value
   * * 100: show and hide delay are 100ms
   * * [100, 200]: show delay is 100ms, hide delay is 200ms
   * * [100, null]: show delay is 100ms, hide delay is the default
   */
  delay?: number | [number | null, number | null]
  /**
   * Disable the popper
   * * default is `false`
   */
  disabled?: boolean
  /**
   * Popper offset.
   * * [Horizontal axis offset, vertical axis offset]
   * * default is `[0, 0]`
   */
  offset?: [number, number]
  /**
   * Alignment of popper
   * * default is `top`
   */
  placement?: PopperPlacement
  /**
   * Trigger method
   * * default is `hover`
   */
  trigger?: PopperTrigger
  /**
   * Control the visibility of the popper
   * * default is `false`
   */
  visible?: boolean

  strategy?: PopperPositioningStrategy
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modifiers?: Array<Partial<Modifier<unknown, any>>>
  onFirstUpdate?: (state: Partial<State>) => void
}

export interface PopperInstance<TE extends PopperElement = PopperElement, PE extends PopperElement = PopperElement> {
  /**
   * Initialize the popper.
   * The life cycle of the popper will enter mounted.
   */
  initialize(): void
  /**
   * Show the popper.
   * The style of the popper container will be set to block.
   */
  show(delay?: number): void
  /**
   * Hide the popper.
   * The style of the popper container will be set to none.
   */
  hide(delay?: number): void
  /**
   * Update popper.
   */
  update(options: Partial<PopperOptions>): void
  /**
   * Force update popper
   */
  forceUpdate(): void
  /**
   * Destroy the popper.
   * The life cycle of the popper will enter beforeDestroy.
   * To show the popper again, please recreate.
   */
  destroy(): void
  /**
   * The display status of the current popper.
   * Control by visible and disable.
   */
  visibility: ComputedRef<boolean>
  /**
   * The current true position of the popper.
   */
  placement: ComputedRef<PopperPlacement>
  /**
   * The truth DOM node of the trigger.
   * The caller needs to bind the variable to the view.
   */
  triggerRef: Ref<TE | undefined>
  /**
   * Manually bind to the event on the trigger.
   */
  triggerEvents: ComputedRef<PopperTriggerEvents>
  /**
   * The truth DOM node of the popper.
   * The caller needs to bind the variable to the view.
   */
  popperRef: Ref<PE | undefined>
  /**
   * Manually bind to events on the popper.
   */
  popperEvents: ComputedRef<PopperEvents>
  /**
   * The truth DOM node of the arrow.
   * The caller needs to bind the variable to the view.
   */
  arrowRef: Ref<HTMLElement | undefined>
}
