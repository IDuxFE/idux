<template>
  <teleport :disabled="disabled" :to="to">
    <slot />
  </teleport>
</template>

<script lang="ts">
import type { ComputedRef } from 'vue'
import type { PortalProps } from './types'

import { computed, defineComponent } from 'vue'
import { PropTypes } from '@idux/cdk/utils'

import { useContainer } from './useContainer'

export default defineComponent({
  name: 'IxPortal',
  props: {
    disabled: PropTypes.bool,
    target: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(HTMLElement)]).isRequired,
  },
  setup(props: PortalProps) {
    const to = useTarget(props)

    return { to }
  },
})

function useTarget(props: PortalProps): ComputedRef<HTMLElement> {
  return computed(() => useContainer(props.target))
}
</script>
