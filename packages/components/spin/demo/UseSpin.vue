<template>
  <IxSpace vertical :size="20">
    <div class="card">
      <div class="content">content</div>
    </div>
    <IxSpace>
      <IxButton @click="openSpin">Open</IxButton>
      <IxButton @click="upldateSpin">Update</IxButton>
      <IxButton @click="destroySpin">Destroy</IxButton>
      <IxButton @click="fullScreenSpin">fullScreen</IxButton>
      <IxButton @click="destroyAllSpin">DestroyAll</IxButton>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { type SpinRef, useSpin } from '@idux/components/spin'

const { open, destroy, destroyAll } = useSpin()

let spinRef: SpinRef
const openSpin = () => {
  spinRef = open({
    tip: '等待',
    target: '.card',
  })
}

const upldateSpin = () => {
  spinRef?.update({
    tip: '更新',
  })
}

const destroySpin = () => {
  spinRef?.destroy()
}

const fullScreenSpin = () => {
  open({
    tip: '2S后关闭',
  })

  setTimeout(() => {
    destroy()
  }, 2000)
}

const destroyAllSpin = () => {
  destroyAll()
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
