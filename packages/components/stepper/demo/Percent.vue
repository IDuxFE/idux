<template>
  <IxStepper :activeKey="2" :percent="percent">
    <IxStepperItem title="Finished" description="This is a description."></IxStepperItem>
    <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
    <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
  </IxStepper>

  <IxSpace style="margin-top: 8px">
    <IxButton v-if="percent === 100" mode="primary" @click="done"> Done </IxButton>
    <IxButton v-if="percent < 100" mode="primary" @click="add"> Add </IxButton>
    <IxButton v-if="percent > 0" @click="less"> Less </IxButton>
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const percent = ref(0)

    const add = () => {
      if (percent.value === 100) {
        return
      }
      percent.value += 20
    }

    const less = () => {
      if (percent.value === 0) {
        return
      }
      percent.value -= 20
    }

    const done = () => {
      console.log('done')
    }

    return { percent, add, less, done }
  },
})
</script>
