<template>
  <ix-button @click="open">Click count</ix-button>
  <ix-button @click="customizeOpen">Customized count</ix-button>
  <br />
  <ix-button @click="removeAll">Destroy all message</ix-button>
  <ix-button @click="removeCustomized">Destroy customized count message</ix-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    let count = 0
    let messageId: string
    const open = () => {
      const content = `click count: ${count++}`
      if (!messageId) {
        const instance = IxMessage.info(content)
        messageId = instance.id
      } else {
        IxMessage.info(content, { id: messageId })
      }
    }

    let countCustomized = 0
    const customizedId = 'ix-message-key-only'
    const customizeOpen = () => {
      IxMessage.info(`click count: ${countCustomized++}`, { id: customizedId })
    }

    const removeAll = () => IxMessage.destroy()
    const removeCustomized = () => IxMessage.destroy(customizedId)

    return { open, customizeOpen, removeAll, removeCustomized }
  },
})
</script>

<style lang="less" scoped>
.ix-button {
  margin: 0 8px 8px 0;
}
</style>
