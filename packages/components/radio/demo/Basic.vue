<template>
  <ix-radio v-model:checked="radio" :name="name" value="a" @change="onChange">a</ix-radio>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const radio = ref(false)
    const onChange = value => {
      console.log(value)
    }
    const name = ref('name')

    return {
      radio,
      onChange,
      name,
    }
  },
})
</script>
