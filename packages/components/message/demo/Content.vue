<template>
  <ix-button @click="open">Customized content</ix-button>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { IxMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const content = h('ul', {}, [
      h('li', {}, 'This is a VNode content data'),
      h('li', {}, 'This is a VNode content data'),
    ])
    const open = () => IxMessage.info(content)

    return { open }
  },
})
</script>
