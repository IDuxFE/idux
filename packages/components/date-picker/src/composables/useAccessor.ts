/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FormAccessor } from '@idux/cdk/forms'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { useValueAccessor } from '@idux/cdk/forms'
import { useFormItemRegister } from '@idux/components/form'

export interface AccessorContext {
  accessor: FormAccessor
  isDisabled: ComputedRef<boolean>
}

export function useAccessor(): AccessorContext {
  const { accessor, control } = useValueAccessor()
  useFormItemRegister(control)
  const isDisabled = computed(() => accessor.disabled.value)

  return { accessor, isDisabled }
}
