<template>
  <ix-statistic title="Active Users" value="321321" />
  <ix-statistic title="Account Balance (CNY)" :precision="2" :value="112893" />
  <ix-statistic title="Account Balance (CNY)" :precision="2" :value="112893.116" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {}
  },
})
</script>
<style lang="less" scoped></style>
