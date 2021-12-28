<template>
  <div class="tag-outlined-demo__wrapper">
    <p>
      <IxTag class="outlined-tag default">标签</IxTag>
      <IxTag class="outlined-tag offline">标签</IxTag>
      <IxTag class="outlined-tag healthy">标签</IxTag>
      <IxTag class="outlined-tag info">标签</IxTag>
      <IxTag class="outlined-tag warning">标签</IxTag>
      <IxTag class="outlined-tag risk">标签</IxTag>
      <IxTag class="outlined-tag fatal">标签</IxTag>
    </p>
  </div>
</template>
<style lang="less">
.tag-outlined-demo__wrapper {
  .outlined-tag {
    background: transparent;
    &.default {
      color: #6f7785;
      border-color: #6f7785;
    }
    &.offline {
      color: #a1a7b3;
      border-color: #a1a7b3;
    }
    &.healthy {
      color: #12a679;
      border-color: #12a679;
    }
    &.info {
      color: #1c6eff;
      border-color: #1c6eff;
    }
    &.warning {
      color: #fdaa1d;
      border-color: #fdaa1d;
    }
    &.risk {
      color: #cf171d;
      border-color: #cf171d;
    }
    &.fatal {
      color: #82010e;
      border-color: #82010e;
    }
  }
}
</style>
