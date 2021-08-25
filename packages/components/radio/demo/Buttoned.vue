<template>
  <IxRadioGroup v-model:value="value" buttoned>
    <IxRadio value="a">Beijing</IxRadio>
    <IxRadio value="b">Shanghai</IxRadio>
    <IxRadio value="c">Guangzhou</IxRadio>
    <IxRadio value="d">Shenzhen</IxRadio>
  </IxRadioGroup>
  <br /><br />
  <IxRadioGroup v-model:value="value" buttoned mode="primary">
    <IxRadio value="a">Beijing</IxRadio>
    <IxRadio value="b">Shanghai</IxRadio>
    <IxRadio value="c">Guangzhou</IxRadio>
    <IxRadio value="d">Shenzhen</IxRadio>
  </IxRadioGroup>
  <br /><br />
  <IxRadioGroup v-model:value="value" buttoned disabled>
    <IxRadio value="a">Beijing</IxRadio>
    <IxRadio value="b">Shanghai</IxRadio>
    <IxRadio value="c">Guangzhou</IxRadio>
    <IxRadio value="d">Shenzhen</IxRadio>
  </IxRadioGroup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('a')

    return { value }
  },
})
</script>
