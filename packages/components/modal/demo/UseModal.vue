<template>
  <ix-space>
    <ix-button @click="onOpen">Open</ix-button>
    <ix-button @click="onConfirm">Confirm</ix-button>
    <ix-button @click="onInfo">Info</ix-button>
    <ix-button @click="onSuccess">Success</ix-button>
    <ix-button @click="onWarning">Warning</ix-button>
    <ix-button @click="onError">Error</ix-button>
  </ix-space>
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
