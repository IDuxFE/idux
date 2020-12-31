<template>
  <ix-radio-group v-model:value="radio" :disabled="disabled" @change="onChange">
    <ix-radio-button value="a">A</ix-radio-button>
    <ix-radio-button value="b">B</ix-radio-button>
    <ix-radio-button value="c">C</ix-radio-button>
    <ix-radio-button value="d">D</ix-radio-button>
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
