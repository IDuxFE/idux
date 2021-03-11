<template>
  <ix-button @click="showInfo">handle close callback</ix-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { MessageService } from '@idux/components/message'

export default defineComponent({
  setup() {
    const showInfo = () => {
      MessageService.info({
        content: 'This is a message for handle close',
        onClose() {
          MessageService.success('info close')
        },
      })
    }
    return {
      showInfo,
    }
  },
})
</script>
<style lang="less">
.ix-icon {
  width: 16px;
}
</style>
