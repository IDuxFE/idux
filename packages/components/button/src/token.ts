/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ButtonGroupProps } from './types'

import { InjectionKey } from 'vue'

export const buttonToken: InjectionKey<ButtonGroupProps> = Symbol('button')
