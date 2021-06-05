<template>
  <ix-collapse v-model:active="active">
    <ix-collapse-panel title="Francis Bacon's saying" name="1">
      <p>Some books should be tasted, some devoured, but only a few should be chewed and digested thoroughly.</p>
    </ix-collapse-panel>
    <ix-collapse-panel title="Francis Bacon's saying" name="2">
      <p>
        If a man will begin with certainties, he shall end in doubts; but if he will be content to begin with doubts, he
        shall end in certainties.
      </p>
    </ix-collapse-panel>
    <ix-collapse-panel title="Francis Bacon's saying" name="3" disabled>
      <p>A wise man will make more opportunities than he finds.</p>
    </ix-collapse-panel>
  </ix-collapse>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref(['1'])

    return {
      active,
    }
  },
})
</script>
