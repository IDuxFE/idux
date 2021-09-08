<template>
  <IxDivider position="left" dashed>Horizontal</IxDivider>
  <IxRow class="gutter-row" :gutter="16">
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
  </IxRow>

  <IxDivider position="left" dashed>Responsive</IxDivider>
  <IxRow class="gutter-row" :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
    <IxCol :span="6"><div class="inner-box">col-6</div></IxCol>
  </IxRow>

  <IxDivider position="left" dashed>Vertical</IxDivider>
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
  background: @color-primary;
  color: @color-white;
  text-align: center;
  padding: @spacing-sm;
}
</style>
