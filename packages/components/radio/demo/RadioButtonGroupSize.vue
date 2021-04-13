<template>
  <ix-radio-group v-model:value="radio" :size="size" :disabled="disabled" @change="onChange">
    <ix-radio-button value="a">A</ix-radio-button>
    <ix-radio-button value="b">B</ix-radio-button>
    <ix-radio-button value="c">C</ix-radio-button>
    <ix-radio-button value="d">D</ix-radio-button>
  </ix-radio-group>
  <div style="height: 20px"></div>
  <ix-button v-for="button in buttons" :key="button" @click="toggle(button)">{{ button }}</ix-button>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const radio = ref('a')
    const disabled = ref(false)
    const buttons = ref(['large', 'medium', 'small'])
    const size = ref('medium')
    const onChange = value => {
      console.log(value)
    }
    const toggle = value => {
      size.value = value
    }
    return {
      radio,
      disabled,
      onChange,
      buttons,
      toggle,
      size,
    }
  },
})
</script>
