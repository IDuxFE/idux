<template>
  <ix-radio-group v-model:value="value" @Change="onChang">
    <ix-radio value="a">A</ix-radio>
    <ix-radio value="b">B</ix-radio>
    <ix-radio value="c">C</ix-radio>
    <ix-radio value="d">D</ix-radio>
  </ix-radio-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('a')
    const onChang = console.log

    return { value, onChang }
  },
})
</script>
