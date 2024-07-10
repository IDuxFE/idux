/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InjectionKey } from 'vue'

interface DndMovableCompContext {
  setDragHandle: (dragHandle: HTMLElement | undefined) => void
}

export const dndMovableToken: InjectionKey<DndMovableCompContext> = Symbol('dndMovableToken')
