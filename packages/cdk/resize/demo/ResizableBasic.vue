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

:deep(.cdk-resizable) {
  &-handler {
    position: absolute;
    user-select: none;
    z-index: 9;

    &-top {
      width: 100%;
      height: 10px;
      top: -5px;
      left: 0;
    }

    &-bottom {
      width: 100%;
      height: 10px;
      bottom: -5px;
      left: 0;
    }

    &-start {
      width: 10px;
      height: 100%;
      top: 0;
      left: -5px;
    }

    &-end {
      width: 10px;
      height: 100%;
      top: 0;
      right: -5px;
    }

    &-topStart {
      width: 20px;
      height: 20px;
      top: -5px;
      left: -5px;
      z-index: 10;
    }

    &-topEnd {
      width: 20px;
      height: 20px;
      top: -5px;
      right: -5px;
      z-index: 10;
    }

    &-bottomStart {
      width: 20px;
      height: 20px;
      bottom: -5px;
      left: -5px;
      z-index: 10;
    }

    &-bottomEnd {
      width: 20px;
      height: 20px;
      right: -5px;
      bottom: -5px;
      z-index: 10;
    }
  }

  &:not(&-resizing) &-handler {
    &-top,
    &-bottom {
      cursor: ns-resize;
    }
    &-start,
    &-end {
      cursor: ew-resize;
    }
    &-topStart,
    &-bottomEnd {
      cursor: nwse-resize;
    }
    &-topEnd,
    &-bottomStart {
      cursor: nesw-resize;
    }
  }

  &-disabled &-handler {
    pointer-events: none;
  }
}
</style>
