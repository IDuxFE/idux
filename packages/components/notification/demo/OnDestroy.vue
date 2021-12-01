<template>
  <IxButton @click="open">Open notification</IxButton>
</template>

<script setup lang="ts">
import { useNotification } from '@idux/components/notification'

const { info, success } = useNotification()
const onDestroy = () =>
  success({
    title: 'destroy',
    content: 'Notification destroyed',
  })
const open = () =>
  info({
    title: 'open',
    content: 'Notification opened',
    onDestroy,
  })
</script>
