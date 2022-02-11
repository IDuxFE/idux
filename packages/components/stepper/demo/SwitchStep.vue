<template>
  <IxStepper :activeKey="active">
    <IxStepperItem v-for="(item, index) in steps" :key="index + 1" :title="item.title"> </IxStepperItem>
  </IxStepper>

  <div class="steps-content">{{ activeContent }}</div>

  <IxSpace>
    <IxButton v-if="active === steps.length" mode="primary" @click="done"> Done </IxButton>
    <IxButton v-if="active < steps.length" mode="primary" @click="next"> Next </IxButton>
    <IxButton v-if="active > 1" @click="pre"> Previous </IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const steps = [
  { title: 'First', content: 'First-content' },
  { title: 'Second', content: 'Second-content' },
  { title: 'Last', content: 'Last-content' },
]

const active = ref(1)
const activeContent = computed(() => steps[active.value - 1].content)

const pre = () => {
  active.value -= 1
}
const next = () => {
  active.value += 1
}
const done = () => {
  console.log('done')
}
</script>

<style scoped lang="less">
.steps-content {
  margin: 8px 0;
  padding-top: 40px;
  min-height: 100px;
  border-radius: 4px;
  border: 1px dashed #e9e9e9;
  background-color: #fafafa;
  text-align: center;
}
</style>
