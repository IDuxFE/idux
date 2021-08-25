<template>
  <IxRadioGroup v-model:value="value" @Change="onChang">
    <IxRadio value="a">A</IxRadio>
    <IxRadio value="b">B</IxRadio>
    <IxRadio value="c">C</IxRadio>
    <IxRadio value="d">D</IxRadio>
  </IxRadioGroup>
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
