<template>
  <IxDivider position="left" dashed>Align top</IxDivider>
  <IxRow justify="center" align="top">
    <IxCol :span="4">
      <div class="height-80">col-4</div>
    </IxCol>
    <IxCol :span="4">
      <div class="height-40">col-4</div>
    </IxCol>
    <IxCol :span="4">
      <div class="height-100">col-4</div>
    </IxCol>
    <IxCol :span="4">
      <div class="height-60">col-4</div>
    </IxCol>
  </IxRow>

  <IxDivider position="left" dashed>Align middle</IxDivider>
  <IxRow justify="space-around" align="middle">
    <IxCol :span="4">
      <div class="height-80">col-4</div>
    </IxCol>
    <IxCol :span="4">
      <div class="height-40">col-4</div>
    </IxCol>
    <IxCol :span="4">
      <div class="height-100">col-4</div>
    </IxCol>
    <IxCol :span="4">
      <div class="height-60">col-4</div>
    </IxCol>
  </IxRow>

  <IxDivider position="left" dashed>Align bottom</IxDivider>
  <IxRow justify="space-between" align="bottom">
    <IxCol :span="4">
      <div class="height-80">col-4</div>
    </IxCol>
    <IxCol :span="4">
      <div class="height-40">col-4</div>
    </IxCol>
    <IxCol :span="4">
      <div class="height-100">col-4</div>
    </IxCol>
    <IxCol :span="4">
      <div class="height-60">col-4</div>
    </IxCol>
  </IxRow>
</template>

<style lang="less" scoped>
@list: 40, 60, 80, 100;
each(@list, {
  .height-@{value} {
    height: (@value * 1px);
    line-height: (@value * 1px);
  }
});
</style>
