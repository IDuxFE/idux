<template>
  <IxSpace>
    <IxButton @click="open">Duration 10s</IxButton>
    <IxButton @click="open2">Duration 0</IxButton>
    <IxButton @click="manuallyDestroy">Manually destroy</IxButton>
  </IxSpace>
</template>

<script lang="ts" setup>
import { NotificationRef, useNotification } from '@idux/components/notification'

const { info } = useNotification()
const open = () =>
  info({
    title: 'duration',
    content: 'The notification will disappear in 10 seconds',
    duration: 10000,
  })

let instance: NotificationRef | null = null
const open2 = () => {
  instance = info({
    title: 'duration',
    content: `The notification will not be destroyed automatically`,
    duration: 0,
  })
}

const manuallyDestroy = () => instance?.destroy()
</script>
