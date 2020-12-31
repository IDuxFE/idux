<template>
  <ix-radio-group v-model:value="radio" :disabled="disabled" @change="onChange">
    <ix-radio value="a">A</ix-radio>
    <ix-radio value="b">B</ix-radio>
    <ix-radio value="c">C</ix-radio>
    <ix-radio value="d">D</ix-radio>
  </ix-radio-group>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const radio = ref('a')
    const disabled = ref(false)
    const onChange = value => {
      console.log(value)
    }
    return {
      radio,
      disabled,
      onChange,
    }
  },
})
</script>
