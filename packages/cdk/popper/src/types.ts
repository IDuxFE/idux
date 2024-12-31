/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Middleware, Strategy } from '@floating-ui/dom'
import type { MaybeRef } from '@idux/cdk/utils'
import type { ComponentPublicInstance, ComputedRef, Ref, UnwrapRef } from 'vue'

export type PopperStrategy = Strategy
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
  allowEnter?: MaybeRef<boolean | undefined>
  /**
   * Whether auto adjust when space is not enough
   * * default is `true`
   */
  autoAdjust?: MaybeRef<boolean | undefined>
  /**
   * Delay in ms once a trigger event is fired before a tippy shows or hides
   *
   * @example
   * * 0: disable delay, it is default value
   * * 100: show and hide delay are 100ms
   * * [100, 200]: show delay is 100ms, hide delay is 200ms
   * * [100, null]: show delay is 100ms, hide delay is the default
   */
  delay?: MaybeRef<number | [number | null, number | null] | undefined>
  /**
   * Disable the popper
   * * default is `false`
   */
  disabled?: MaybeRef<boolean | undefined>
  /**
   * Popper offset.
   * * [Horizontal axis offset, vertical axis offset]
   * * default is `[0, 0]`
   */
  offset?: MaybeRef<[number, number] | undefined>
  /**
   * Alignment of popper
   * * default is `top`
   */
  placement?: MaybeRef<PopperPlacement | undefined>
  /**
   * Trigger method
   * * default is `hover`
   */
  trigger?: MaybeRef<PopperTrigger | undefined>
  /**
   * Control the visibility of the popper
   * * default is `false`
   */
  visible?: MaybeRef<boolean | undefined>

  strategy?: MaybeRef<PopperStrategy | undefined>
  middlewares?: MaybeRef<Array<Middleware> | undefined>

  /**
   * visible change event callback
   */
  onVisibleChange?: (visible: boolean) => void
}

export type ResolvedPopperOptions = Required<UnwrapRef<Omit<PopperOptions, 'onVisibleChange' | 'visible'>>> &
  UnwrapRef<Pick<PopperOptions, 'visible'>> &
  Pick<PopperOptions, 'onVisibleChange'>

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
  update(options?: Partial<PopperOptions>): void
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
