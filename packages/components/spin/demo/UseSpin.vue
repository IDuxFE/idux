<template>
  <IxSpace vertical :size="20">
    <div style="width: 350px" class="card">
      <div class="content">content</div>
    </div>
    <IxSpace>
      <IxButton @click="openSpin">Open</IxButton>
      <IxButton @click="closeSpin">Close</IxButton>
      <IxButton @click="fullScreenSpin">fullScreen</IxButton>
      <IxButton @click="closeAllSpin">CloseAll</IxButton>
      <IxButton @click="upldateSpin">Update</IxButton>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { useSpin } from '@idux/components/spin'

const { open, close, closeAll, update } = useSpin()

const openSpin = () => {
  open('等待', {
    target: '.card',
  })
}

const fullScreenSpin = () => {
  open('2s 后关闭')

  setTimeout(() => {
    close()
  }, 2000)
}

const closeSpin = () => {
  close('.card')
}

const closeAllSpin = () => {
  closeAll()
}

const upldateSpin = () => {
  update('更新', {
    target: '.card',
  })
}
</script>
<style lang="less" scoped>
.card {
  text-align: center;
  padding: 50px;
  background-color: #eee;
  height: 300px;
  overflow: auto;
  .content {
    height: 500px;
  }
}
</style>
