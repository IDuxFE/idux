/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { InjectionKey } from 'vue'

export interface DropdownContext {
  setVisibility: (visible: boolean) => void
}

export const dropdownToken: InjectionKey<DropdownContext> = Symbol('dropdownToken')
