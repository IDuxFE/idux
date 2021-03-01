<template>
  <div>
    <ix-tooltip v-model:visible="visible" title="prompt text" trigger="click">
      <span>Tooltip will show when it's click.</span>
    </ix-tooltip>
    <ix-button @click.stop="toggle">toggle</ix-button>
  </div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, ref } from 'vue'
import { IxTooltip, IxButton } from '@idux/components'

export default defineComponent({
  name: 'VModel',
  components: { IxButton, IxTooltip },
  setup() {
    const visible = ref(true)

    const toggle = () => {
      visible.value = !visible.value
    }

    const change = (e: ComputedRef<boolean>) => {
      visible.value = e.value
    }

    return { visible, toggle, change }
  },
})
</script>
