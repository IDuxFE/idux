<template>
  <IxSpace>
    <IxButton @click="start()">开始</IxButton>
    <IxButton @click="finish">结束</IxButton>
    <IxButton @click="error">错误</IxButton>
    <IxButton @click="autoExit">开始有遮罩，4s后自动结束</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { useLoadingBar } from '@idux/components/loading-bar'
const { start, finish, error } = useLoadingBar()
function autoExit() {
  start({ mask: true })
  setTimeout(() => finish(), 4000)
}
</script>
