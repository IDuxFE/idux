<template>
  <IxDivider labelPlacement="start" dashed>Align start</IxDivider>
  <IxRow justify="space-between" align="start">
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

  <IxDivider labelPlacement="start" dashed>Align center</IxDivider>
  <IxRow justify="space-between" align="center">
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

  <IxDivider labelPlacement="start" dashed>Align end</IxDivider>
  <IxRow justify="space-between" align="end">
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
