<template>
  <ix-space>
    <ix-button @click="visible = !visible">Change visible</ix-button>
    <ix-button mode="primary" @click="openModal">Open modal</ix-button>
  </ix-space>
  <ix-modal v-model:visible="visible" header="This is title" :style="{ top: '200px' }" :width="400">
    <p>Some contents...</p>
  </ix-modal>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import { useModal } from '@idux/components/modal'

export default defineComponent({
  setup() {
    const visible = ref(false)

    const { open } = useModal()
    const openModal = () => {
      open({
        header: 'This is title',
        content: h('p', 'Some contents...'),
        centered: true,
        width: 400,
      })
    }

    return { visible, openModal }
  },
})
</script>
