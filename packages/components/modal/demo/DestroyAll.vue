<template>
  <IxSpace>
    <IxButton mode="primary" @click="openModal">Open modal</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { useModal } from '@idux/components/modal'

const { destroyAll, confirm } = useModal()

const okButton = { mode: 'primary', danger: true, onClick: () => destroyAll() } as const

const openModal = () => confirm({ title: 'Destroy all modal ?', content: h('p', 'Some contents...'), okButton })
</script>
