<template>
  <IxSpace>
    <IxButton @click="onOpen">Open</IxButton>
    <IxButton @click="onConfirm">Confirm</IxButton>
    <IxButton @click="onInfo">Info</IxButton>
    <IxButton @click="onSuccess">Success</IxButton>
    <IxButton @click="onWarning">Warning</IxButton>
    <IxButton @click="onError">Error</IxButton>
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useModal } from '@idux/components/modal'

export default defineComponent({
  setup() {
    const { open, confirm, info, success, warning, error } = useModal()

    const onOpen = () => open({ header: 'Default', content: 'Some contents..' })
    const onConfirm = () => confirm({ title: 'Confirm', content: 'Some contents..' })
    const onInfo = () => info({ title: 'Info', content: 'Some contents..' })
    const onSuccess = () => success({ title: 'Success', content: 'Some contents..' })
    const onWarning = () => warning({ title: 'Warning', content: 'Some contents..' })
    const onError = () => error({ title: 'Error', content: 'Some contents..' })

    return { onOpen, onConfirm, onInfo, onSuccess, onWarning, onError }
  },
})
</script>
