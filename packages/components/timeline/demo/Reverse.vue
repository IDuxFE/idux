<template>
  <IxSpace vertical block>
    <IxTimeline :pending="true" :reverse="reverse">
      <IxTimelineItem key="0">New issue in 2021-02-08</IxTimelineItem>
      <IxTimelineItem key="1">Create IxTimeline in 2021-02-10</IxTimelineItem>
      <IxTimelineItem key="2">Update component documentation in 2021-02-12</IxTimelineItem>
      <IxTimelineItem key="3">Write test cases in 2021-02-14</IxTimelineItem>
    </IxTimeline>

    <IxButton mode="primary" @click="changeReverse">Toggle reverse</IxButton>
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const reverse = ref(false)
    const changeReverse = () => {
      reverse.value = !reverse.value
    }
    return { reverse, changeReverse }
  },
})
</script>
