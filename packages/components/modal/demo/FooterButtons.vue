<template>
  <IxSpace>
    <IxButton @click="visible = !visible">Change visible</IxButton>
    <IxButton mode="primary" @click="openModal">Open modal</IxButton>
  </IxSpace>
  <IxModal
    v-model:visible="visible"
    type="confirm"
    title="Are you sure ?"
    :cancelText="cancelText"
    :cancelButton="cancelButton"
    :okText="okText"
    :okButton="okButton"
  >
    <p>Some contents...</p>
  </IxModal>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

import { useModal } from '@idux/components/modal'

const visible = ref(false)

const cancelText = 'No'
const cancelButton = { mode: 'dashed' } as const
const okText = 'Yes'
const okButton = { mode: 'dashed', danger: true } as const

const { confirm } = useModal()
const openModal = () => {
  confirm({
    title: 'Are you sure ?',
    content: h('p', 'Some contents...'),
    cancelText,
    cancelButton,
    okText,
    okButton,
  })
}
</script>
