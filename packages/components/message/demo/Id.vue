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
    let messageKey: string
    const open = () => {
      const content = `click count: ${count++}`
      if (!messageKey) {
        const instance = info(content)
        messageKey = instance.key
      } else {
        info(content, { key: messageKey })
      }
    }

    let countCustomized = 0
    const customizedKey = 'ix-message-key-only'
    const customizeOpen = () => {
      info(`click count: ${countCustomized++}`, { key: customizedKey })
    }
    const destroyCustomized = () => destroy(customizedKey)

    return { open, customizeOpen, destroyAll, destroyCustomized }
  },
})
</script>
