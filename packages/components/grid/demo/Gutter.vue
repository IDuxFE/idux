<template>
  <ix-divider position="left" dashed>Horizontal</ix-divider>
  <ix-row class="gutter-row" :gutter="16">
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
  </ix-row>

  <ix-divider position="left" dashed>Responsive</ix-divider>
  <ix-row class="gutter-row" :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
  </ix-row>

  <ix-divider position="left" dashed>Vertical</ix-divider>
  <ix-row class="gutter-row" :gutter="[8, 16]">
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
    <ix-col :span="6"><div class="inner-box">col-6</div></ix-col>
  </ix-row>
</template>

<style lang="less" scoped>
.inner-box {
  background: @primary;
  color: @white;
  text-align: center;
  padding: @spacing-sm;
}
</style>
