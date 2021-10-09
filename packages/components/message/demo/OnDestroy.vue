<template>
  <IxButton @click="open">Open message</IxButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const { info, success } = useMessage()
    const onDestroy = () => success('Message destroyed')
    const open = () => info('Message opened', { onDestroy })
    return { open }
  },
})
</script>
