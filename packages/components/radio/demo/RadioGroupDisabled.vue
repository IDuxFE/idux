<template>
  <ix-radio-group v-model:value="radio" :disabled="disabled" @change="onChange">
    <ix-radio value="a">A</ix-radio>
    <ix-radio value="b">B</ix-radio>
    <ix-radio value="c">C</ix-radio>
    <ix-radio value="d">D</ix-radio>
  </ix-radio-group>
  <div style="height: 20px"></div>
  <ix-button @click="toggle">Toggle disabled</ix-button>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const radio = ref('a')
    const disabled = ref(true)
    const onChange = value => {
      console.log(value)
    }
    const toggle = () => {
      disabled.value = !disabled.value
    }
    return {
      radio,
      disabled,
      onChange,
      toggle,
    }
  },
})
</script>
