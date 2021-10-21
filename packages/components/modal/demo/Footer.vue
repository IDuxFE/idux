<template>
  <IxSpace>
    <IxButton @click="visible = !visible">Change visible</IxButton>
    <IxButton mode="primary" @click="openModal">Open modal</IxButton>
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
import { h, ref } from 'vue'

import { useModal } from '@idux/components/modal'

const visible = ref(false)

const { confirm } = useModal()
const openModal = () => {
  const modalRef = confirm({
    title: 'Customize footer via options',
    content: h('p', 'Some contents...'),
    footer: [
      {
        text: 'My Cancel',
        onClick: () => modalRef.cancel(),
      },
      {
        text: 'My Ok',
        mode: 'primary',
        onClick: () => modalRef.ok(),
      },
    ],
  })
}
</script>
