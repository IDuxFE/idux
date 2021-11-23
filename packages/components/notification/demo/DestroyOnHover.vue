<template>
  <IxSpace>
    <IxButton @click="open">Don't destroy on hover</IxButton>
    <IxButton @click="open2">Destroy on hover</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { useNotification } from '@idux/components/notification'

const { info } = useNotification()
const open = () =>
  info({
    title: 'destroy',
    content: "Don't destroy on hover",
  })
const open2 = () =>
  info({
    title: 'destroy',
    content: 'Destroy on hover',
    destroyOnHover: true,
  })
</script>
