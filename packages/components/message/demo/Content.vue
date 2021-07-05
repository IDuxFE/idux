<template>
  <ix-button @click="open">Customized content</ix-button>
  <ix-message visible>this is message</ix-message>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { useMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const message = useMessage()

    const content = h('ul', {}, [
      h('li', {}, 'This is a VNode content data'),
      h('li', {}, 'This is a VNode content data'),
    ])

    const open = () => message.info(content)

    return { open }
  },
})
</script>
