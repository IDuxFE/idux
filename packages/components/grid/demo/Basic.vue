<template>
  <div class="grey">
    <div>
      <ix-row>
        <ix-col :span="12"> <div class="block">col-12</div> </ix-col>
        <ix-col :span="12"> <div class="block">col-12</div> </ix-col>
      </ix-row>
      <ix-row>
        <ix-col :span="8"> <div class="block">col-8</div> </ix-col>
        <ix-col :span="8"> <div class="block">col-8</div> </ix-col>
        <ix-col :span="8"> <div class="block">col-8</div> </ix-col>
      </ix-row>
      <ix-row>
        <ix-col :span="6"> <div class="block">col-6</div> </ix-col>
        <ix-col :span="6"> <div class="block">col-6</div> </ix-col>
        <ix-col :span="6"> <div class="block">col-6</div> </ix-col>
        <ix-col :span="6"> <div class="block">col-6</div> </ix-col>
      </ix-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
  data() {},
})
</script>
<style lang="less" scoped>
@import './common/index.less';
</style>
