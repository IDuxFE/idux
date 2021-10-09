<template>
  <IxButton v-click-outside="one">one</IxButton>
  <IxButton v-click-outside="two">two</IxButton>
  <IxButton v-click-outside="three">three</IxButton>
  <IxButton v-click-outside="four">four</IxButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const { info } = useMessage()
    const one = () => info('one')
    const two = () => info('two')
    const three = () => info('three')
    const four = () => info('four')
    return { one, two, three, four }
  },
})
</script>

<style scoped>
.IxButton {
  margin-right: 4px;
}
</style>
