<template>
  <ix-space>
    <ix-button @click="visible = !visible">Change visible</ix-button>
    <ix-button mode="primary" @click="openModal">Open modal</ix-button>
  </ix-space>
  <ix-modal
    v-model:visible="visible"
    type="confirm"
    title="Are you sure ?"
    :cancelText="cancelText"
    :cancelButton="cancelButton"
    :okText="okText"
    :okButton="okButton"
  >
    <p>Some contents...</p>
  </ix-modal>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import { useModal } from '@idux/components/modal'

export default defineComponent({
  setup() {
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

    return { visible, cancelText, cancelButton, okText, okButton, openModal }
  },
})
</script>
