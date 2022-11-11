<template>
  <IxSpace vertical :size="20">
    <div class="resizable-container">
      <CdkResizable
        class="resizable-box"
        free
        :handlers="[]"
        :maxWidth="800"
        :maxHeight="400"
        :minWidth="120"
        :minHeight="140"
      >
        <div class="card">
          <div class="content">Resizable!</div>
        </div>
        <CdkResizableHandle placement="end">
          <div class="handle-end">
            <IxIcon class="handle-end-icon" name="holder" />
          </div>
        </CdkResizableHandle>
        <CdkResizableHandle placement="bottomEnd">
          <IxIcon class="handle-bottom-end-icon" name="caret-up-filled" :rotate="135" />
        </CdkResizableHandle>
      </CdkResizable>
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
.resizable-container {
  display: block;
  height: 300px;
}

.resizable-box {
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
  border: 1px solid #ddd;
}

.handle-end {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &-icon {
    background: #fff;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
  }
}

.handle-bottom-end-icon {
  position: absolute;
  top: 0;
  left: 0;
}

.card {
  text-align: center;
  background-color: #aea;
  width: 90%;
  height: 100%;
  overflow: auto;

  .content {
    width: 260px;
    height: 260px;
  }
}
</style>
