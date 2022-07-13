/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { RadioGroupProps } from './types'
import type { FormAccessor } from '@idux/cdk/forms'
import type { InjectionKey } from 'vue'

export interface RadioGroupContext {
  props: RadioGroupProps
  accessor: FormAccessor
}

export const radioGroupToken: InjectionKey<RadioGroupContext> = Symbol('radioGroupToken')
