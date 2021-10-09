<template>
  <IxSpace>
    <IxButton @click="open">Customized icon name</IxButton>
    <IxButton @click="openVNode">Customized icon VNode</IxButton>
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { useMessage } from '@idux/components/message'

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
