<template>
  <ix-space>
    <ix-button @click="visible = !visible">Change visible</ix-button>
    <ix-button mode="primary" @click="openModal">Open modal</ix-button>
  </ix-space>
  <ix-modal v-model:visible="visible" type="confirm" title="Customize footer via slot">
    <template #footer="{ cancel, ok }">
      <ix-button @click="cancel">My Cancel</ix-button>
      <ix-button mode="primary" @click="ok">My Ok</ix-button>
    </template>
    <p>Some contents...</p>
  </ix-modal>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import { useModal } from '@idux/components/modal'

export default defineComponent({
  setup() {
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

    return { visible, openModal }
  },
})
</script>
