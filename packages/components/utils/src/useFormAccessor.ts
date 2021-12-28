/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ValueAccessor } from '@idux/cdk/forms'

import { useValueAccessor, useValueControl } from '@idux/cdk/forms'
import { useFormItemRegister } from '@idux/components/form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormAccessor<T = any>(valueKey?: string): ValueAccessor<T> {
  const control = useValueControl()
  const accessor = useValueAccessor({ control, valueKey })

  useFormItemRegister(control)

  return accessor
}
