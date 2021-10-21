<template>
  <IxRadioGroup v-model:value="value" @Change="onChang">
    <IxRadio value="a">A</IxRadio>
    <IxRadio value="b">B</IxRadio>
    <IxRadio value="c">C</IxRadio>
    <IxRadio value="d">D</IxRadio>
  </IxRadioGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('a')
const onChang = console.log
</script>
