<template>
  <div class="grey">
    <div>
      <ix-row>
        <ix-col :span="18" :push="6"> <div class="block">col-18 col-push-6</div> </ix-col>
        <ix-col :span="6" :pull="18"> <div class="block">col-6 col-pull-18</div> </ix-col>
      </ix-row>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './common/index.less';
</style>
