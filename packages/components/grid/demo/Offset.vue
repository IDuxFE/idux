<template>
  <div class="grey">
    <div>
      <ix-row>
        <ix-col :span="8"> <div class="block">col-8</div> </ix-col>
        <ix-col :span="8" :offset="8"> <div class="block">col-8 col-offset=8</div> </ix-col>
      </ix-row>
      <ix-row>
        <ix-col :span="6" :offset="6"> <div class="block">col-6 col-offset-6</div> </ix-col>
        <ix-col :span="6" :offset="6"> <div class="block">col-6 col-offset-6</div> </ix-col>
      </ix-row>
      <ix-row>
        <ix-col :span="12" :offset="6"> <div class="block">col-12 col-offset-6</div> </ix-col>
      </ix-row>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './common/index.less';
</style>
