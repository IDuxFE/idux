/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ComputedRef, InjectionKey } from 'vue'

export interface CardContext {
  hoverable: ComputedRef<boolean>
}

export const cardToken: InjectionKey<CardContext> = Symbol('cardToken')
