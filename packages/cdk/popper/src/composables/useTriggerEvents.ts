/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperTriggerEvents, ResolvedPopperOptions } from '../types'

import { type ComputedRef, computed } from 'vue'

export function useTriggerEvents(
  baseOptions: ComputedRef<ResolvedPopperOptions>,
  eventOptions: { visibility: ComputedRef<boolean>; show(): void; hide(): void },
): ComputedRef<PopperTriggerEvents> {
  const { visibility, show, hide } = eventOptions

  const onMouseenter = () => show()
  const onMouseleave = () => hide()
  const onFocus = () => show()
  const onBlur = () => hide()

  const onClick = () => {
    const { trigger } = baseOptions.value
    if (trigger === 'click') {
      visibility.value ? hide() : show()
    } else if (trigger === 'contextmenu') {
      visibility.value && hide()
    }
  }

  const onContextmenu = (evt: Event) => {
    evt.preventDefault()
    show()
  }

  const eventsMap = {
    hover: { onMouseenter, onMouseleave },
    focus: { onFocus, onBlur },
    click: { onClick },
    contextmenu: { onClick, onContextmenu },
    manual: {},
  }

  return computed(() => eventsMap[baseOptions.value.trigger])
}
