<template>
  <ix-space>
    <ix-button @click="open">Click count</ix-button>
    <ix-button @click="customizeOpen">Customized count</ix-button>
    <ix-button @click="destroyAll">Destroy all message</ix-button>
    <ix-button @click="destroyCustomized">Destroy customized count message</ix-button>
  </ix-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const { info, destroyAll, destroy } = useMessage()
    let count = 0
    let messageId: string
    const open = () => {
      const content = `click count: ${count++}`
      if (!messageId) {
        const instance = info(content)
        messageId = instance.id
      } else {
        info(content, { id: messageId })
      }
    }

    let countCustomized = 0
    const customizedId = 'ix-message-key-only'
    const customizeOpen = () => {
      info(`click count: ${countCustomized++}`, { id: customizedId })
    }
    const destroyCustomized = () => destroy(customizedId)

    return { open, customizeOpen, destroyAll, destroyCustomized }
  },
})
</script>
