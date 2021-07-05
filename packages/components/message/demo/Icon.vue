<template>
  <ix-space>
    <ix-button @click="open">Customized icon name</ix-button>
    <ix-button @click="openVNode">Customized icon VNode</ix-button>
  </ix-space>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { useMessage } from '@idux/components/message'
import { IxIcon } from '@idux/components/icon'

export default defineComponent({
  setup() {
    const { info } = useMessage()
    const open = () => info('This is a star message', { icon: 'star' })

    const iconVNode = h(IxIcon, { name: 'star', style: { color: 'red' } })
    const openVNode = () => info('This is a star message', { icon: iconVNode })

    return { open, openVNode }
  },
})
</script>
