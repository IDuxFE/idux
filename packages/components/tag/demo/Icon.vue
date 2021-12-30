<template>
  <div class="tag-icon-demo__wrapper">
    <IxTag class="icon-tag offline" icon="heat">标签</IxTag>
    <IxTag class="icon-tag healthy" icon="heat">标签</IxTag>
    <IxTag class="icon-tag info" icon="heat">标签</IxTag>
    <IxTag class="icon-tag warning" icon="heat">标签</IxTag>
    <IxTag class="icon-tag risk" icon="heat">标签</IxTag>
    <IxTag class="icon-tag fatal">
      <span>标签</span>
      <template #icon>
        <IxIcon name="heat"></IxIcon>
      </template>
    </IxTag>
  </div>
</template>
<style lang="less">
.tag-icon-demo__wrapper {
  .icon-tag {
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
