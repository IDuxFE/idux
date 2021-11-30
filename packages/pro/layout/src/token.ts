/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LayoutProCtrlType } from './types'
import type { InjectionKey } from 'vue'

export const LayoutProToken: InjectionKey<LayoutProCtrlType> = Symbol('layoutProCtrl')
