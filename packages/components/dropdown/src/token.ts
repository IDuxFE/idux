/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type InjectionKey, type Ref } from 'vue'

export interface DropdownContext {
  hideOnClick: Ref<boolean>
  setVisibility: (visible: boolean) => void
}

export const dropdownToken: InjectionKey<DropdownContext> = Symbol('dropdownToken')
