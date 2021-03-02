<template>
  <ix-affix :offset="numberOffset" @change="onChange">
    <ix-button @click="numberOffset += 20">Number Offset</ix-button>
  </ix-affix>
  <br />
  <ix-affix :offset="objectOffset">
    <ix-button>Object Offset</ix-button>
  </ix-affix>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const numberOffset = ref(0)
    const onChange = isAffix => {
      console.log(`Basic Offset status change : ${isAffix}`)
    }

    const objectOffset = ref({ top: 100, left: 100 })

    return { numberOffset, onChange, objectOffset }
  },
})
</script>
