<template>
  <IxCheckboxGroup v-model:value="value" @Change="onChang">
    <IxCheckbox value="a">A</IxCheckbox>
    <IxCheckbox value="b">B</IxCheckbox>
    <IxCheckbox value="c">C</IxCheckbox>
    <IxCheckbox value="d">D</IxCheckbox>
  </IxCheckboxGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['a'])
const onChang = console.log
</script>
