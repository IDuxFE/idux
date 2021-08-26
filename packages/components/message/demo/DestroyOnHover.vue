<template>
  <IxSpace>
    <IxButton @click="open">Don't destroy on hover</IxButton>
    <IxButton @click="open2">Destroy on hover</IxButton>
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const { info } = useMessage()
    const open = () => info("Don't destroy on hover")
    const open2 = () => info('Destroy on hover', { destroyOnHover: true })

    return { open, open2 }
  },
})
</script>
