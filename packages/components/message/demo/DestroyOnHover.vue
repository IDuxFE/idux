<template>
  <ix-space>
    <ix-button @click="open">Don't destroy on hover</ix-button>
    <ix-button @click="open2">Destroy on hover</ix-button>
  </ix-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const { info } = useMessage()
    const open = () => info("Don't destroy on hover")
    const open2 = () => info('Destroy on hover', { destroyOnHover: true })

    return { open, open2 }
  },
})
</script>
