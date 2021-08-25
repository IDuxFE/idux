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

    return { openModal }
  },
})
</script>
