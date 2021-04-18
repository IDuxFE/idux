<template>
  <ix-collapse v-model:active="active" accordion @change="onChange">
    <ix-collapse-panel name="1" title="Francis Bacon's saying">
      <p>Some books should be tasted, some devoured, but only a few should be chewed and digested thoroughly.</p>
    </ix-collapse-panel>
    <ix-collapse-panel name="2" title="Francis Bacon's saying">
      <p>
        If a man will begin with certainties, he shall end in doubts; but if he will be content to begin with doubts, he
        shall end in certainties.
      </p>
    </ix-collapse-panel>
    <ix-collapse-panel name="3" title="Francis Bacon's saying">
      <p>A wise man will make more opportunities than he finds.</p>
    </ix-collapse-panel>
  </ix-collapse>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref('2')
    const onChange = v => {
      console.log(v)
    }
    return {
      active,
      onChange,
    }
  },
})
</script>
