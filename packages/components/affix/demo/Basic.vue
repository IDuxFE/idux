<template>
  <IxAffix :offset="numberOffset" @Change="onChange">
    <IxButton @click="numberOffset += 20">Number Offset</IxButton>
  </IxAffix>
  <br />
  <IxAffix :offset="objectOffset">
    <IxButton>Object Offset</IxButton>
  </IxAffix>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const numberOffset = ref(0)
    const onChange = (isAffix: boolean) => {
      console.log(`Basic Offset status change : ${isAffix}`)
    }

    const objectOffset = ref({ top: 100, left: 100 })

    return { numberOffset, onChange, objectOffset }
  },
})
</script>
