import type { Options, Placement } from '@popperjs/core'
import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue'

export type OverlayScrollStrategy = 'close' | 'reposition'
export type OverlayTrigger = 'click' | 'hover' | 'focus' | 'contextmenu' | 'manual'
export type OverlayElement = ComponentPublicInstance | HTMLElement
export type OverlayPlacement = Placement

import { PropTypes } from '@idux/cdk/utils'

export const OverlayTriggerPropDef = PropTypes.oneOf(['click', 'hover', 'focus', 'contextmenu', 'manual'] as const)
export const OverlayPlacementPropDef = PropTypes.oneOf([
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'left',
  'bottom',
  'right',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'right-start',
  'right-end',
  'left-start',
  'left-end',
] as const)

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
  placement: OverlayPlacement
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

export interface OverlayInstance<
  TE extends OverlayElement = OverlayElement,
  OE extends OverlayElement = OverlayElement,
  AE extends OverlayElement = OverlayElement,
> {
  /**
   * Initialize the overlay.
   * The life cycle of the overlay will enter mounted.
   */
  initialize: () => void
  /**
   * Show the overlay.
   * The style of the overlay container will be set to block.
   */
  show: (showDelay?: number) => void
  /**
   * Hide the overlay.
   * The style of the overlay container will be set to none.
   */
  hide: (hideDelay?: number) => void
  /**
   * Update overlay.
   * If the overlay has not been initialized, the overlay will be initialized first, otherwise the overlay will be update directly.
   * @param options
   */
  update: (options?: Partial<OverlayOptions>) => void
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
   * The truth DOM node of the trigger.
   * The caller needs to bind the variable to the view.
   */
  triggerRef: Ref<TE | null>
  /**
   * Manually bind to the evt on the trigger.
   */
  triggerEventHandler: (evt: Event) => void
  /**
   * The truth DOM node of the overlay.
   * The caller needs to bind the variable to the view.
   */
  overlayRef: Ref<OE | null>
  /**
   * Manually bind to events on the overlay.
   */
  overlayEventHandler: (evt: Event) => void
  /**
   * The truth DOM node of the arrow.
   * If showArrow is false, we won't return arrowRef.
   * The caller needs to bind the variable to the view.
   */
  arrowRef?: Ref<AE | null>
}
