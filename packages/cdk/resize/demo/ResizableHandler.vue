<template>
  <div class="resizable-container">
    <CdkResizable class="resizable-box" :handlers="[]" :maxWidth="600" :maxHeight="200" :minWidth="120" :minHeight="40">
      CdkResizable!
      <CdkResizableHandler placement="end">
        <div class="handler-end">
          <IxIcon class="handler-end-icon" name="holder" />
        </div>
      </CdkResizableHandler>
      <CdkResizableHandler placement="bottomEnd">
        <IxIcon class="handler-bottom-end-icon" name="caret-up-filled" :rotate="135" />
      </CdkResizableHandler>
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

.handler-end {
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

.handler-bottom-end-icon {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
