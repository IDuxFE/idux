<template>
  <div class="resizable-container">
    <CdkResizable
      class="resizable-box"
      free
      :handlers="[]"
      :maxWidth="600"
      :maxHeight="200"
      :minWidth="120"
      :minHeight="40"
    >
      CdkResizable!
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
</template>

<style scoped lang="less">
.resizable-container {
  display: block;
  height: 200px;
}

.resizable-box {
  width: 300px;
  height: 100px;
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
</style>
