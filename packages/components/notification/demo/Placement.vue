<template>
  <IxSpace>
    <IxButton @click="openOnTopStart">topStart</IxButton>
    <IxButton @click="openOnTopEnd">topEnd</IxButton>
    <IxButton @click="openOnBottomStart">bottomStart</IxButton>
    <IxButton @click="openOnBottomEnd">bottomEnd</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { useNotification } from '@idux/components/notification'

const { info } = useNotification()

const openOnTopStart = () =>
  info({
    title: 'placement',
    content: 'topStart',
    placement: 'topStart',
  })
const openOnTopEnd = () =>
  info({
    title: 'placement',
    content: 'topEnd',
    placement: 'topEnd',
  })
const openOnBottomStart = () =>
  info({
    title: 'placement',
    content: 'bottomStart',
    placement: 'bottomStart',
  })
const openOnBottomEnd = () =>
  info({
    title: 'placement',
    content: 'bottomEnd',
    placement: 'bottomEnd',
  })
</script>
