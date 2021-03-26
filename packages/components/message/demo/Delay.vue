<template>
  <ix-button @click="showDelayInfo">Customized display duration</ix-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { MessageService } from '@idux/components/message'

export default defineComponent({
  setup() {
    const showDelayInfo = () => {
      MessageService.success({
        content: 'This is a prompt message for success, and it will disappear in 10 seconds',
        duration: 10000,
      })
    }
    return {
      showDelayInfo,
    }
  },
})
</script>
<style lang="less" scoped></style>
