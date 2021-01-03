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
import type { SpinProps } from './types'

import { computed, defineComponent } from 'vue'
import { hasSlot, PropTypes } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/core/config'
import { IxIcon } from '@idux/components/icon'

export default defineComponent({
  name: 'IxSpin',
  components: { IxIcon },
  props: {
    spinning: PropTypes.bool.def(true),
    icon: PropTypes.string,
    tip: PropTypes.string,
    tipAlign: PropTypes.oneOf(['horizontal', 'vertical'] as const),
    size: PropTypes.oneOf(['large', 'medium', 'small'] as const),
  },

  setup(props: SpinProps, { slots }) {
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
