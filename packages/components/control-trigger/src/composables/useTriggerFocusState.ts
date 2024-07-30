/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ɵTriggerInstance } from '@idux/components/_private/trigger'

import { type ComputedRef, type Ref, nextTick, watch } from 'vue'

import { useEventListener, useState } from '@idux/cdk/utils'

export interface TriggerFocusStateContext {
  handleTriggerFocus: (evt: FocusEvent) => void
  resetTriggerFocus: () => void
}

export function useTriggerFocusState(
  triggerRef: Ref<ɵTriggerInstance | undefined>,
  triggerFocused: ComputedRef<boolean>,
): TriggerFocusStateContext {
  const [focusTarget, setFocusTarget] = useState<HTMLElement | null>(null)
  const [selectionStart, setSelectionStart] = useState<number | null>(null)

  const updateSelectionStart = () => {
    const element = focusTarget.value as HTMLInputElement

    setTimeout(() => {
      if (element.selectionDirection === 'backward') {
        setSelectionStart(element.selectionStart)
      } else {
        setSelectionStart(element.selectionEnd)
      }
    })
  }

  let stops: ((() => void) | undefined)[] | undefined
  const destroyListeners = () => stops?.forEach(stop => stop?.())

  watch(focusTarget, (target, oldTarget) => {
    if (target === oldTarget) {
      return
    }

    if (!(target instanceof HTMLInputElement)) {
      setSelectionStart(null)
      destroyListeners()
      return
    }

    updateSelectionStart()

    if (stops?.length) {
      return
    }

    stops = [
      useEventListener(focusTarget, 'select', updateSelectionStart),
      useEventListener(focusTarget, 'input', updateSelectionStart),
      useEventListener(focusTarget, 'mousedown', updateSelectionStart),
      useEventListener(focusTarget, 'keydown', updateSelectionStart),
    ]
  })

  const handleTriggerFocus = (evt: FocusEvent) => {
    nextTick(() => {
      if (triggerFocused.value && evt.target instanceof HTMLElement) {
        setFocusTarget(evt.target)
      }
    })
  }

  const resetTriggerFocus = () => {
    const target = focusTarget.value

    if (!target) {
      triggerRef.value?.focus()
      return
    }

    target.focus()

    if (target instanceof HTMLInputElement) {
      target.setSelectionRange(selectionStart.value, selectionStart.value)
    }
  }

  return {
    handleTriggerFocus,
    resetTriggerFocus,
  }
}
