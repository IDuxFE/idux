<template>
  <div>
    <ix-button @click="showInfo">create a message</ix-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MessageService } from '@idux/components/message'

export default defineComponent({
  setup() {
    const number = ref<number>(0)

    const showInfo = () => {
      const key = 'ix-message-key-only'
      MessageService.info({
        content: `This is a message for handle key option not change, ${number.value}, key: ${key}`,
        messageId: key,
      })
      number.value++
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
