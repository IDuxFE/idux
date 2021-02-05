<template>
  <ix-portal target="ix-container" :disabled="disabled">
    <div>Portal</div>
  </ix-portal>
  <ix-button @click="handleDisable">Disabled</ix-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IxPortal } from '@idux/cdk/portal'
import { IxButton } from '@idux/components'

export default defineComponent({
  name: 'Disabled',
  components: { IxPortal, IxButton },
  setup() {
    const disabled = ref(false)

    const handleDisable = () => {
      disabled.value = !disabled.value
    }

    return { disabled, handleDisable }
  },
})
</script>
