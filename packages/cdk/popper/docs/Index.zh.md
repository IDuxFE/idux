---
category: cdk
type: 
title: Popper
subtitle: 浮层
order: 0
---

- 创建定位浮层：`usePopper`

## 何时使用

- `usePopper`：创建定位浮层

## API

### `usePopper`

```typescript
import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue'

export type PopperScrollStrategy = 'close' | 'reposition' | 'none'
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
  onMouseenter(): void
  onMouseleave(): void
}

export interface PopperOptions {
  /**
   * Control the visibility of the popper
   */
  visible?: boolean
  /* Scroll strategy for popper */
  scrollStrategy?: PopperScrollStrategy
  /* Disable the popper */
  disabled?: boolean
  /* Alignment of popper */
  placement?: PopperPlacement
  /* Trigger method. */
  trigger?: PopperTrigger
  /* Whether to allow the mouse to enter the popper. */
  allowEnter?: boolean
  /* Whether auto adjust when space is not enough. */
  autoAdjust?: boolean
  /**
   * Popper offset.
   * [Horizontal axis offset, vertical axis offset]
   */
  offset?: [number, number]
  /**
   * The delay of hiding popper.
   * Send 0 if you don't need it.
   */
  hideDelay?: number
  /**
   * The delay of showing popper.
   * Send 0 if you don't need it.
   */
  showDelay?: number
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
  show(showDelay?: number): void
  /**
   * Hide the popper.
   * The style of the popper container will be set to none.
   */
  hide(hideDelay?: number): void
  /**
   * Update popper.
   * If the popper has not been initialized, the popper will be initialized first, otherwise the popper will be update directly.
   * To avoid performance issues, the update function does not update the view directly.
   * If you want to update the view immediately, you can force the update by calling the function returned by the update function.
   */
  update(options?: Partial<PopperOptions>): () => void
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
  triggerRef: Ref<TE | null>
  /**
   * Manually bind to the event on the trigger.
   */
  triggerEvents: ComputedRef<PopperTriggerEvents>
  /**
   * The truth DOM node of the popper.
   * The caller needs to bind the variable to the view.
   */
  popperRef: Ref<PE | null>
  /**
   * Manually bind to events on the popper.   */
  popperEvents: ComputedRef<PopperEvents>
}

```
