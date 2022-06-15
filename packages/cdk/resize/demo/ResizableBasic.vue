<template>
  <div class="resizable-container">
    <CdkResizable class="resizable-box" :maxWidth="600" :maxHeight="200" :minWidth="120" :minHeight="40">
      CdkResizable!
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
</style>
