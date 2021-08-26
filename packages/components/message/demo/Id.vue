<template>
  <IxSpace>
    <IxButton @click="open">Click count</IxButton>
    <IxButton @click="customizeOpen">Customized count</IxButton>
    <IxButton @click="destroyAll">Destroy all message</IxButton>
    <IxButton @click="destroyCustomized">Destroy customized count message</IxButton>
  </IxSpace>
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
