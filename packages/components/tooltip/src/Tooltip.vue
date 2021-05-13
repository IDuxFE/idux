<template>
  <ix-overlay v-model:visible="visibility" clsPrefix="ix-tooltip" allow-enter v-bind="config" scroll-strategy="close">
    <template #trigger>
      <slot />
    </template>
    <template #overlay>
      <slot name="title">{{ title }}</slot>
    </template>
  </ix-overlay>
</template>

<script lang="ts">
import type { SetupContext } from 'vue'
import type { TooltipConfig } from '@idux/components/config'
import type { TooltipProps } from './types'

import { computed, defineComponent } from 'vue'
import { IxOverlay } from '@idux/components/overlay'
import { useGlobalConfig } from '@idux/components/config'

import { tooltipPropsDef } from './types'

export default defineComponent({
  name: 'IxTooltip',
  components: { IxOverlay },
  props: tooltipPropsDef,
  emits: ['update:visible'],
  setup(props: TooltipProps, { emit }: SetupContext) {
    const config = computed<TooltipConfig>(() => {
      const config = useGlobalConfig('tooltip')
      return {
        placement: props.placement ?? config.placement,
        trigger: props.trigger ?? config.trigger,
        showDelay: props.showDelay ?? config.showDelay,
        hideDelay: props.hideDelay ?? config.hideDelay,
        destroyOnHide: props.destroyOnHide ?? config.destroyOnHide,
        autoAdjust: props.autoAdjust ?? config.autoAdjust,
      }
    })
    const visibility = computed({
      get() {
        return props.visible!
      },
      set(visible: boolean) {
        emit('update:visible', visible)
      },
    })

    return { visibility, config }
  },
})
</script>
