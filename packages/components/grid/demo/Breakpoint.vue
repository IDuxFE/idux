<template>
  <div class="grey">
    <ix-row>
      <ix-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"> <div class="block">Col</div> </ix-col>
      <ix-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }"><div class="block">Col</div> </ix-col>
      <ix-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"><div class="block">Col</div> </ix-col>
    </ix-row>
    <ix-row>
      <ix-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10"> <div class="block">Col</div> </ix-col>
      <ix-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4"> <div class="block">Col</div> </ix-col>
      <ix-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10"> <div class="block">Col</div> </ix-col>
    </ix-row>
  </div>
</template>

<style lang="less" scoped>
@import './common/index.less';
</style>
