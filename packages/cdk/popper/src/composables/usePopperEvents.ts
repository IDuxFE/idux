/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperEvents, PopperOptions } from '../types'

import { type ComputedRef, computed } from 'vue'

import { NoopObject } from '@idux/cdk/utils'

export function usePopperEvents(
  baseOptions: Required<PopperOptions>,
  eventOptions: { show(): void; hide(): void },
): ComputedRef<PopperEvents> {
  const { show, hide } = eventOptions

  const onMouseenter = () => show()
  const onMouseleave = () => hide()

  const eventsMap = {
    click: NoopObject,
    focus: NoopObject,
    hover: { onMouseenter, onMouseleave },
    contextmenu: NoopObject,
    manual: NoopObject,
  }

  return computed(() => (baseOptions.allowEnter ? eventsMap[baseOptions.trigger] : NoopObject))
}
