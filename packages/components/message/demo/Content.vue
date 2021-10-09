<template>
  <IxButton @click="open">Customized content</IxButton>
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
