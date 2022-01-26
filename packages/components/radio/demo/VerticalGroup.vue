<template>
  <IxRadioGroup v-model:value="value">
    <IxSpace vertical>
      <IxRadio value="a">A</IxRadio>
      <IxRadio value="b">B</IxRadio>
      <IxRadio value="c">C</IxRadio>
      <IxRadio value="d">
        More...
        <IxInput v-if="value === 'd'" v-model:value="moreValue" style="width: 100px; margin-left: 16px"></IxInput>
      </IxRadio>
    </IxSpace>
  </IxRadioGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('a')
const moreValue = ref('')
</script>
