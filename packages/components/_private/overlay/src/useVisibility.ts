import { ref, watch, WritableComputedRef } from 'vue'

import { computed } from 'vue'
import { callEmit } from '@idux/cdk/utils'

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
