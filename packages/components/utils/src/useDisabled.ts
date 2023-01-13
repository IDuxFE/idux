/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ComputedRef, computed } from 'vue'

export type GetDisabledFn = (data: { disabled?: boolean }) => boolean

export function useGetDisabled(props: {
  disableData: ((data: { disabled?: boolean }) => boolean) | undefined
}): ComputedRef<GetDisabledFn> {
  return computed(() => {
    const { disableData } = props
    return (data: { disabled?: boolean }) => {
      return data.disabled || (disableData ? disableData(data) : false)
    }
  })
}
