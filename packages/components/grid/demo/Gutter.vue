<template>
  <IxDivider labelPlacement="start" dashed>Horizontal</IxDivider>
  <IxRow class="gutter-row" :gutter="16">
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
  </IxRow>

  <IxDivider labelPlacement="start" dashed>Responsive</IxDivider>
  <IxRow class="gutter-row" :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
  </IxRow>

  <IxDivider labelPlacement="start" dashed>Vertical</IxDivider>
  <IxRow class="gutter-row" :gutter="[8, 16]">
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
  </IxRow>
</template>

<style lang="less" scoped>
.inner-box {
  background: var(--ix-color-primary);
  color: #fff;
  text-align: center;
  padding: var(--ix-padding-size-sm);
}
</style>
