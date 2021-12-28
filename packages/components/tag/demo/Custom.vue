<template>
  <div class="tag-custom-demo__wrapper">
    <IxTag>普通</IxTag>
    <IxTag class="custom-tag offline">标签</IxTag>
    <IxTag class="custom-tag healthy">标签</IxTag>
    <IxTag class="custom-tag info">标签</IxTag>
    <IxTag class="custom-tag warning">标签</IxTag>
    <IxTag class="custom-tag risk">标签</IxTag>
    <IxTag class="custom-tag fatal">标签</IxTag>
  </div>
</template>
<style lang="less">
.tag-custom-demo__wrapper {
  .custom-tag {
    color: #fff;
    border-color: transparent;
    &.offline {
      background: #f5f6f7;
      color: #a1a7b3;
    }
    &.healthy {
      background: #e7f6f1;
      color: #12a679;
    }
    &.info {
      background: #e8f0ff;
      color: #1c6eff;
    }
    &.warning {
      background: #fff4ec;
      color: #fa721b;
    }
    &.risk {
      background: #fae7e8;
      color: #cf171d;
    }
    &.fatal {
      background: #f2e5e6;
      color: #82010e;
    }
  }
}
</style>
