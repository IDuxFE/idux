import type { Ref, WritableComputedRef } from 'vue'

import { computed, ref, watch } from 'vue'
import { callEmit } from '@idux/cdk/utils'

export function useMergedProp<T, K extends keyof T>(props: T, key: K): WritableComputedRef<T[K]> {
  const tempProp = ref(props[key]) as Ref<T[K]>
  watch(
    () => props[key],
    value => (tempProp.value = value),
  )

  return computed({
    get() {
      return tempProp.value
    },
    set(value) {
      if (value !== tempProp.value) {
        tempProp.value = value
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callEmit((props as any)[`onUpdate:${key}`], value)
      }
    },
  })
}
