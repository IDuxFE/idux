<template>
  <ix-button @click="open">Open message</ix-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const onDestroy = () => IxMessage.success('Message destroyed')
    const open = () => IxMessage.info('Message opened', { onDestroy })

    return { open }
  },
})
</script>
