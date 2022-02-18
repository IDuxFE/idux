<template>
  <IxStepper v-model:activeKey="activeKey" clickable>
    <IxStepperItem title="Finished" description="This is a description."></IxStepperItem>
    <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
    <IxStepperItem :disabled="true" title="Waiting" description="This is a description."></IxStepperItem>
  </IxStepper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeKey = ref(1)
</script>
