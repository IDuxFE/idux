<template>
  <IxStepper :active="active">
    <IxStepperItem v-for="(item, index) in steps" :key="index" :title="item.title"> </IxStepperItem>
  </IxStepper>

  <div class="steps-content">{{ activeContent }}</div>

  <IxSpace>
    <IxButton v-show="active > 0" @click="pre"> Previous </IxButton>
    <IxButton v-show="active < steps.length - 1" @click="next"> Next </IxButton>
    <IxButton v-show="active === steps.length - 1" mode="primary" @click="done"> Done </IxButton>
  </IxSpace>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const steps = [
      {
        title: 'First',
        content: 'First-content',
      },
      {
        title: 'Second',
        content: 'Second-content',
      },
      {
        title: 'Last',
        content: 'Last-content',
      },
    ]

    const active = ref(0)

    const activeContent = computed(() => steps[active.value].content)

    const pre = () => {
      active.value -= 1
    }

    const next = () => {
      active.value += 1
    }

    const done = () => {
      console.log('done')
    }

    return { steps, active, activeContent, pre, next, done }
  },
})
</script>

<style lang="less" scoped>
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
