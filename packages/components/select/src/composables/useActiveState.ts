/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SelectProps } from '../types'

import { type ComputedRef, watchEffect } from 'vue'

import { useState } from '@idux/cdk/utils'

export interface ActiveStateContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeValue: ComputedRef<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setActiveValue: (value: any) => void
}

export function useActiveState(props: SelectProps, inputValue: ComputedRef<string>): ActiveStateContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeValue, setActiveValue] = useState<any>(undefined)

  watchEffect(() => {
    if (!props.allowInput || !inputValue.value) {
      return
    }

    setActiveValue(inputValue.value)
  })

  return {
    activeValue,
    setActiveValue,
  }
}
