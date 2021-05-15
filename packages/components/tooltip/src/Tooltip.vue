<template>
  <ix-overlay
    v-model:visible="visibility"
    clsPrefix="ix-tooltip"
    allow-enter
    v-bind="config"
    scroll-strategy="none"
    :offset="offset"
  >
    <template #trigger>
      <slot />
    </template>
    <template #overlay>
      <slot name="title">{{ title }}</slot>
    </template>
  </ix-overlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxOverlay } from '@idux/components/overlay'

import { tooltipPropsDef } from './types'
import { useConfig, useOffset, useVisibility } from './utils'

export default defineComponent({
  name: 'IxTooltip',
  components: { IxOverlay },
  props: tooltipPropsDef,
  emits: ['update:visible'],
  setup() {
    const config = useConfig()
    const visibility = useVisibility()
    const offset = useOffset(config)

    return { visibility, config, offset }
  },
})
</script>
