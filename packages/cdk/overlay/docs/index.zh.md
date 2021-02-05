---
category: cdk
type:
title: Overlay
subtitle: 浮层
cover:
---

参考自 [element-plus](https://github.com/element-plus/element-plus/tree/dev/packages/popper/src/use-popper)

- 创建定位浮层：`useOverlay`

## 何时使用

- `useOverlay`：创建定位浮层

## API

### `useOverlay`

> 创建一个浮层实例

```typescript
import type { Options, Placement } from '@popperjs/core'
import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue'

type OverlayScrollStrategy = 'close' | 'reposition'
type OverlayTrigger = 'click' | 'hover' | 'focus'
type RefElement = Nullable<HTMLElement>
type VueElement = Nullable<ComponentPublicInstance | HTMLElement>

declare function useOverlay(options: OverlayOptions): OverlayInstance

interface OverlayTriggerEvents {
  onClick?: (event: Event) => void
  onMouseEnter?: (event: Event) => void
  onMouseLeave?: (event: Event) => void
  onFocus?: (event: Event) => void
  onBlur?: (event: Event) => void
}

interface OverlayPopperEvents {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

interface OverlayOptions {
  /* The class name of the overlay container. */
  className?: string
  /**
   * Control the visibility of the overlay
   */
  visible?: boolean
  /* Scroll strategy for overlay */
  scrollStrategy?: OverlayScrollStrategy
  /* Disable the overlay */
  disable?: boolean
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
   * Send false if you don't need it.
   */
  hideDelay: number | false
  /**
   * The delay of showing overlay.
   * Send false if you don't need it.
   */
  showDelay: number | false
}

interface OverlayInstance {
  /**
   * Initialize the overlay.
   * The life cycle of the overlay will enter mounted.
   */
  initialize: () => void
  /**
   * Show the overlay.
   * The style of the overlay container will be set to block.
   */
  show: () => void
  /**
   * Hide the overlay.
   * The style of the overlay container will be set to none.
   */
  hide: () => void
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
  overlayId: string
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
   * Update overlay.
   * If the overlay has not been initialized, the overlay will be initialized first, otherwise the overlay will be update directly.
   * @param options
   */
  update: (options: Partial<OverlayOptions>) => void
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
  triggerRef: Ref<VueElement>
  /**
   * Manually bind to the event on the trigger.
   */
  triggerEvents: OverlayTriggerEvents
  /**
   * Manually bind to events on the overlay.
   */
  overlayEvents: OverlayPopperEvents
}
```
