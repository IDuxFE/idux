<template>
  <IxSpace>
    <IxButton mode="primary" @click="openModal">Open modal</IxButton>
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

import { useModal } from '@idux/components/modal'

export default defineComponent({
  setup() {
    const { destroyAll, confirm } = useModal()

    const okButton = { mode: 'primary', danger: true, onClick: () => destroyAll() } as const

    const openModal = () => confirm({ title: 'Destroy all modal ?', content: h('p', 'Some contents...'), okButton })

    return { openModal }
  },
})
</script>
