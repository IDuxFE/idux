<template>
  <ix-collapse v-model:active="active">
    <ix-collapse-panel name="1" title="Francis Bacon's saying">
      <ix-collapse v-model:active="active">
        <ix-collapse-panel name="4" title="Francis Bacon's saying">
          <p>A wise man will make more opportunities than he finds.</p>
        </ix-collapse-panel>
      </ix-collapse>
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
    const active = ref('1')
    return {
      active,
    }
  },
})
</script>
