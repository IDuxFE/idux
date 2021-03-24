<template>
  <ix-button v-click-outside="one">one</ix-button>
  <ix-button v-click-outside="two">two</ix-button>
  <ix-button v-click-outside="three">three</ix-button>
  <ix-button v-click-outside="four">four</ix-button>
</template>

<style scoped>
.ix-button {
  margin-right: 4px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { clickOutside } from '@idux/cdk/click-outside'
import { MessageService } from '@idux/components'

export default defineComponent({
  directives: { clickOutside },
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
