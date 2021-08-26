<template>
  <IxSpace>
    <IxButton @click="visible = !visible">Change visible</IxButton>
    <IxButton mode="primary" @click="openModal">Open modal</IxButton>
  </IxSpace>
  <IxModal v-model:visible="visible" title="This is title" type="confirm" @ok="onOk">
    <p>Some contents...</p>
  </IxModal>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import { useModal } from '@idux/components/modal'

export default defineComponent({
  setup() {
    const visible = ref(false)
    const onOk = () =>
      new Promise(resolve => {
        const isClose = Math.random() > 0.5
        setTimeout(() => resolve(isClose), 1000)
      })

    const { confirm } = useModal()
    const content = h('p', 'Some contents...')

    const openModal = () => confirm({ title: 'This is title', content, onOk })

    return { visible, onOk, openModal }
  },
})
</script>
