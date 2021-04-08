<template>
  <ix-button v-click-outside="one">one</ix-button>
  <ix-button v-click-outside="two">two</ix-button>
  <ix-button v-click-outside="three">three</ix-button>
  <ix-button v-click-outside="four">four</ix-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const one = () => IxMessage.info('one')
    const two = () => IxMessage.info('two')
    const three = () => IxMessage.info('three')
    const four = () => IxMessage.info('four')
    return { one, two, three, four }
  },
})
</script>

<style scoped>
.ix-button {
  margin-right: 4px;
}
</style>
