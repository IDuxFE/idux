<template>
  <IxSpace>
    <IxButton mode="primary" @click="openModal">Open modal</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { useModal } from '@idux/components/modal'

const { confirm } = useModal()
const openModal = () => {
  const modalRef = confirm({
    title: 'Init title',
    content: h('p', 'This modal dialog will close after 3 seconds'),
    footer: [
      {
        text: 'Update',
        mode: 'primary',
        onClick: () => modalRef.update({ title: 'Updated title' }),
      },
    ],
  })

  setTimeout(() => modalRef.close(), 3000)
}
</script>
