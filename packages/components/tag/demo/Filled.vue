<template>
  <div class="tag-filled-demo__wrapper">
    <p>
      <IxTag color="#6f7785">标签</IxTag>
      <IxTag color="#bec3cc">标签</IxTag>
      <IxTag color="#12a679">标签</IxTag>
      <IxTag color="#1c6eff">标签</IxTag>
      <IxTag color="#fa721b">标签</IxTag>
      <IxTag color="#cf171d">标签</IxTag>
    </p>
    <p>
      <IxTag class="filled-tag default" shape="round">离线</IxTag>
      <IxTag class="filled-tag offline" shape="round">安全</IxTag>
      <IxTag class="filled-tag healthy" shape="round">信息</IxTag>
      <IxTag class="filled-tag info" shape="round">低危</IxTag>
      <IxTag class="filled-tag warning" shape="round">中低危</IxTag>
      <IxTag class="filled-tag alert" shape="round">中危</IxTag>
      <IxTag class="filled-tag risk" shape="round">高危</IxTag>
      <IxTag class="filled-tag fatal" shape="round">严重</IxTag>
    </p>
  </div>
</template>
<style lang="less">
.tag-filled-demo__wrapper {
  .filled-tag {
    color: #fff;
    border-color: transparent;
    &.default {
      background: #6f7785;
    }
    &.offline {
      background: #bec3cc;
    }
    &.healthy {
      background: #12a679;
    }
    &.info {
      background: #1c6eff;
    }
    &.warning {
      background: #fdaa1d;
    }
    &.alert {
      background: #fa721b;
    }
    &.risk {
      background: #cf171d;
    }
    &.fatal {
      background: #82010e;
    }
  }
}
</style>
