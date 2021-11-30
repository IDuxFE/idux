<template>
  <IxSpace>
    <IxButton @click="openNotification">open</IxButton>
    <IxButton @click="openInfoNotification">info</IxButton>
    <IxButton @click="openSuccessNotification">success</IxButton>
    <IxButton @click="openWarningNotification">warning</IxButton>
    <IxButton @click="openErrorNotification">error</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { useNotification } from '@idux/components/notification'

const { open, success, error, warning, info } = useNotification()

const openNotification = () =>
  open({
    title: 'open',
    content: `show by useNotification open`,
  })

const openSuccessNotification = () =>
  success({
    title: 'success',
    content: 'show by useNotification success',
  })

const openErrorNotification = () =>
  error({
    title: 'error',
    content: 'show by useNotification error',
  })

const openWarningNotification = () =>
  warning({
    title: 'warning',
    content: 'show by useNotification warning',
  })
//
const openInfoNotification = () =>
  info({
    title: 'info',
    content: 'show by useNotification info',
  })
</script>

<style scoped lang="less"></style>
