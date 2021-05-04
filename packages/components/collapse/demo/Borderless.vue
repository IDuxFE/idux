<template>
  <ix-collapse v-model:active="active" borderless>
    <ix-collapse-panel name="1" title="Francis Bacon's saying">
      Some books should be tasted, some devoured, but only a few should be chewed and digested thoroughly.
    </ix-collapse-panel>
    <ix-collapse-panel name="2" title="Francis Bacon's saying">
      If a man will begin with certainties, he shall end in doubts; but if he will be content to begin with doubts, he
      shall end in certainties.
    </ix-collapse-panel>
    <ix-collapse-panel name="3" title="Francis Bacon's saying">
      A wise man will make more opportunities than he finds.
    </ix-collapse-panel>
  </ix-collapse>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref([])
    return {
      active,
    }
  },
})
</script>
<style lang="less" scoped></style>
