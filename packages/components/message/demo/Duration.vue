<template>
  <IxSpace>
    <IxButton @click="open">Duration 10s</IxButton>
    <IxButton @click="open2">Duration 0</IxButton>
    <IxButton @click="manuallyDestroy">Manually destroy</IxButton>
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { MessageRef, useMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const message = useMessage()
    const open = () => message.info('The message will disappear in 10 seconds', { duration: 10000 })

    let instance: MessageRef | null = null
    const open2 = () => {
      instance = message.info(`The message will not be destroyed automatically`, { duration: 0 })
    }

    const manuallyDestroy = () => instance?.destroy()

    return { open, open2, manuallyDestroy }
  },
})
</script>
