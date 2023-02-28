<template>
  <IxSpace>
    <IxButton @click="openModal1">Open modal</IxButton>
    <IxButton @click="openModal2">Open modal</IxButton>
    <IxButton mode="primary" @click="visible = !visible">Change visible</IxButton>
  </IxSpace>
  <IxModal v-model:visible="visible" type="confirm" title="Customize footer via slot">
    <template #footer="{ cancel, ok }">
      <IxButton @click="cancel">My Cancel</IxButton>
      <IxButton mode="primary" @click="ok">My Ok</IxButton>
    </template>
    <p>Some contents...</p>
  </IxModal>
</template>

<script setup lang="ts">
import { h, reactive, ref } from 'vue'

import { ModalButtonProps, useModal } from '@idux/components/modal'

const { confirm } = useModal()

const cancelText = 'No'
const cancelButton = { mode: 'dashed' } as const
const okText = 'Yes'
const okButton = { mode: 'dashed', danger: true } as const

const openModal1 = () => {
  confirm({
    title: 'Customize footer via props',
    content: h('p', 'Some contents...'),
    cancelText,
    cancelButton,
    okText,
    okButton,
  })
}

const openModal2 = () => {
  const asyncButton: ModalButtonProps = reactive({
    text: 'My Ok',
    loading: false,
    mode: 'primary',
    onClick: () => {
      asyncButton.loading = true
      setTimeout(() => {
        asyncButton.loading = false
        modalRef.ok()
      }, 1000)
    },
  })
  const modalRef = confirm({
    title: 'Customize footer via footer',
    content: h('p', 'Some contents...'),
    footer: [
      {
        text: 'My Cancel',
        onClick: () => modalRef.cancel(),
      },
      asyncButton,
    ],
  })
}

const visible = ref(false)
</script>
