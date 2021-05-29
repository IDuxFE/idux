<template>
  <ix-divider position="left" dashed>Align top</ix-divider>
  <ix-row justify="center" align="top">
    <ix-col :span="4">
      <div class="height-80">col-4</div>
    </ix-col>
    <ix-col :span="4">
      <div class="height-40">col-4</div>
    </ix-col>
    <ix-col :span="4">
      <div class="height-100">col-4</div>
    </ix-col>
    <ix-col :span="4">
      <div class="height-60">col-4</div>
    </ix-col>
  </ix-row>

  <ix-divider position="left" dashed>Align middle</ix-divider>
  <ix-row justify="space-around" align="middle">
    <ix-col :span="4">
      <div class="height-80">col-4</div>
    </ix-col>
    <ix-col :span="4">
      <div class="height-40">col-4</div>
    </ix-col>
    <ix-col :span="4">
      <div class="height-100">col-4</div>
    </ix-col>
    <ix-col :span="4">
      <div class="height-60">col-4</div>
    </ix-col>
  </ix-row>

  <ix-divider position="left" dashed>Align bottom</ix-divider>
  <ix-row justify="space-between" align="bottom">
    <ix-col :span="4">
      <div class="height-80">col-4</div>
    </ix-col>
    <ix-col :span="4">
      <div class="height-40">col-4</div>
    </ix-col>
    <ix-col :span="4">
      <div class="height-100">col-4</div>
    </ix-col>
    <ix-col :span="4">
      <div class="height-60">col-4</div>
    </ix-col>
  </ix-row>
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
