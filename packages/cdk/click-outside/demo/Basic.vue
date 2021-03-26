<template>
  <ix-button v-click-outside="one">one</ix-button>
  <ix-button v-click-outside="two">two</ix-button>
  <ix-button v-click-outside="three">three</ix-button>
  <ix-button v-click-outside="four">four</ix-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MessageService } from '@idux/components/message'

export default defineComponent({
  setup() {
    const one = () => {
      MessageService.info('one')
    }
    const two = () => {
      MessageService.info('two')
    }
    const three = () => {
      MessageService.info('three')
    }
    const four = () => {
      MessageService.info('four')
    }
    return { one, two, three, four }
  },
})
</script>

<style scoped>
.ix-button {
  margin-right: 4px;
}
</style>
