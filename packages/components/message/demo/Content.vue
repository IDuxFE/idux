<template>
  <IxButton @click="open">Customized content</IxButton>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { useMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const message = useMessage()

    const content = () => h('span', {}, [h('span', {}, 'This is a VNode content '), h(IxIcon, { name: 'star' })])

    const open = () => message.info(content)

    return { open }
  },
})
</script>
