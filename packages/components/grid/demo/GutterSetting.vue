<template>
  <div class="grey">
    <div>
      <p>横向(输入数字):</p>
      <ix-input v-model:value="gutter" placeholder="横向(输入数字)" />
      <p>纵向(输入数字):</p>
      <ix-input v-model:value="vgutter" placeholder="纵向(输入数字)" />
      <ix-row :gutter="[+gutter, +vgutter]">
        <ix-col v-for="item in colCounts[colCountKey]" :key="item.toString()" :span="24 / colCounts[colCountKey]">
          <div class="block">Col</div>
        </ix-col>
      </ix-row>
      <ix-row :gutter="[+gutter, +vgutter]">
        <ix-col v-for="item in colCounts[colCountKey]" :key="item.toString()" :span="24 / colCounts[colCountKey]">
          <div class="block">Col</div>
        </ix-col>
      </ix-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const colCounts: Record<string, number> = {}
    ;[2, 3, 4, 6, 8, 12].forEach((value, i) => {
      colCounts[i] = value
    })

    return {
      colCountKey: 2,
      colCounts,
      gutter: '0',
      vgutter: '0',
    }
  },
})
</script>
<style lang="less" scoped>
@import './common/index.less';
</style>
