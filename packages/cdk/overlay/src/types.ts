import type { Options, Placement } from '@popperjs/core'
import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue'

export type OverlayScrollStrategy = 'close' | 'reposition'
export type OverlayTrigger = 'click' | 'hover' | 'focus'
export type RefElement = Nullable<HTMLElement>
export type TriggerElement = Nullable<ComponentPublicInstance | HTMLElement>

export interface OverlayTriggerEvents {
  onClick?: (event: Event) => void
  onMouseenter?: (event: Event) => void
  onMouseleave?: (event: Event) => void
  onFocus?: (event: Event) => void
  onBlur?: (event: Event) => void
}

export interface OverlayPopperEvents {
  onMouseenter: () => void
  onMouseleave: () => void
  onClick: (event: MouseEvent) => void
}

export interface OverlayOptions {
  /**
   * Control the visibility of the overlay
   */
  visible?: boolean
  /* Scroll strategy for overlay */
  scrollStrategy: OverlayScrollStrategy
  /* Disable the overlay */
  disabled?: boolean
  /**
   * The distance between the arrow and the starting point at both ends.
   *Acting when the overlay uses border-radius.
   */
  arrowOffset?: number
  /* Whether to show arrow. */
  showArrow?: boolean
  /* Alignment of floating layer. */
  placement: Placement
  /**
   * The options of popper.
   * Used when ConnectOverlayOptions cannot meet the demand.
   * Priority is higher than ConnectOverlayOptions.
   */
  popperOptions?: Partial<Options>
  /* Trigger method. */
  trigger: OverlayTrigger
  /* Whether to allow the mouse to enter the overlay. */
  allowEnter?: boolean
  /**
   * Overlay offset.
   * [Horizontal axis offset, vertical axis offset]
   */
  offset: [number, number]
  /**
   * The delay of hiding overlay.
   * Send 0 if you don't need it.
   */
  hideDelay: number
  /**
   * The delay of showing overlay.
   * Send 0 if you don't need it.
   */
  showDelay: number
}

export interface OverlayInstance {
  /**
   * Initialize the overlay.
   * The life cycle of the overlay will enter mounted.
   */
  initialize: () => void
  /**
   * Show the overlay.
   * The style of the overlay container will be set to block.
   */
  show: (immediate?: boolean) => void
  /**
   * Hide the overlay.
   * The style of the overlay container will be set to none.
   */
  hide: (immediate?: boolean) => void
  /**
   * Update overlay.
   * If the overlay has not been initialized, the overlay will be initialized first, otherwise the overlay will be update directly.
   * @param options
   */
  update: (options: Partial<OverlayOptions>) => void
  /**
   * Destroy the overlay.
   * The life cycle of the overlay will enter beforeDestroy.
   * To show the overlay again, please recreate.
   */
  destroy: () => void
  /**
   * TODO
   * The unique id of the overlay.
   * Provide subsequent components with markings for the specified overlay treatment.
   */
  id: string
  /**
   * The display status of the current overlay.
   * Control by visible and disable.
   */
  visibility: ComputedRef<boolean>
  /**
   * The truth DOM node of the overlay.
   * The caller needs to bind the variable to the view.
   */
  overlayRef: Ref<RefElement>
  /**
   * The truth DOM node of the arrow.
   * If showArrow is false, we won't return arrowRef.
   * The caller needs to bind the variable to the view.
   */
  arrowRef?: Ref<RefElement>
  /**
   * The truth DOM node of the trigger.
   * The caller needs to bind the variable to the view.
   */
  triggerRef: Ref<TriggerElement>
  /**
   * Manually bind to the event on the trigger.
   */
  triggerEvents: ComputedRef<OverlayTriggerEvents>
  /**
   * Manually bind to events on the overlay.
   */
  overlayEvents: OverlayPopperEvents
}
