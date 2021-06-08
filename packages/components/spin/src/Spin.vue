<template>
  <div class="ix-spin">
    <div v-if="spinning" class="ix-spin-spinner" :class="spinnerClassName">
      <ix-icon :name="icon$$" class="ix-spin-spinner-icon" rotate></ix-icon>
      <div v-if="tip$$" class="ix-spin-spinner-tip">
        {{ tip$$ }}
      </div>
    </div>
    <div v-if="hasDefaultSlot" class="ix-spin-container" :class="containerClassName">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { spinProps } from './types'

export default defineComponent({
  name: 'IxSpin',
  components: { IxIcon },
  props: spinProps,
  setup(props, { slots }) {
    const spinConfig = useGlobalConfig('spin')

    const icon$$ = computed(() => props.icon ?? spinConfig.icon)
    const tip$$ = computed(() => props.tip ?? spinConfig.tip)

    const hasDefaultSlot = computed(() => hasSlot(slots))

    const spinnerClassName = computed(() => {
      const size = props.size ?? spinConfig.size
      const tipAlign = props.tipAlign ?? spinConfig.tipAlign
      return [`ix-spin-spinner-tip-${tipAlign}`, size !== 'medium' ? `ix-spin-spinner-${size}` : '']
    })

    const containerClassName = computed(() => [hasDefaultSlot.value && props.spinning && 'ix-spin-container-blur'])

    return {
      tip$$,
      icon$$,
      spinnerClassName,
      containerClassName,
      hasDefaultSlot,
    }
  },
})
</script>
