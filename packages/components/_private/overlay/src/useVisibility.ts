/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { WritableComputedRef, computed, ref, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'

/**
 * @deprecated Please use `useMergedProp` instead
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useVisibility(props: Record<any, any>, key = 'visible'): WritableComputedRef<boolean> {
  const visible = ref<boolean>(props[key])
  watch(
    () => props[key],
    value => (visible.value = value),
  )

  return computed({
    get() {
      return visible.value
    },
    set(value) {
      visible.value = value
      callEmit(props[`onUpdate:${key}`], value)
    },
  })
}
