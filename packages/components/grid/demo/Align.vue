<template>
  <div class="grey">
    <p>Align Top</p>
    <ix-row justify="center" align="top">
      <ix-col :span="4">
        <div class="block height-100">col-4</div>
      </ix-col>
      <ix-col :span="4">
        <div class="block height-50">col-4</div>
      </ix-col>
      <ix-col :span="4">
        <div class="block height-120">col-4</div>
      </ix-col>
      <ix-col :span="4">
        <div class="block height-80">col-4</div>
      </ix-col>
    </ix-row>

    <p>Align Center</p>
    <ix-row justify="space-around" align="middle">
      <ix-col :span="4">
        <div class="block height-100">col-4</div>
      </ix-col>
      <ix-col :span="4">
        <div class="block height-50">col-4</div>
      </ix-col>
      <ix-col :span="4">
        <div class="block height-120">col-4</div>
      </ix-col>
      <ix-col :span="4">
        <div class="block height-80">col-4</div>
      </ix-col>
    </ix-row>

    <p>Align Bottom</p>
    <ix-row justify="space-between" align="bottom">
      <ix-col :span="4">
        <div class="block height-100">col-4</div>
      </ix-col>
      <ix-col :span="4">
        <div class="block height-50">col-4</div>
      </ix-col>
      <ix-col :span="4">
        <div class="block height-120">col-4</div>
      </ix-col>
      <ix-col :span="4">
        <div class="block height-80">col-4</div>
      </ix-col>
    </ix-row>
  </div>
</template>

<style lang="less" scoped>
@import './common/index.less';
</style>
