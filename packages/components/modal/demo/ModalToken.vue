<template>
  <IxSpace>
    <IxButton @click="visible = !visible">Change visible</IxButton>
    <IxButton mode="primary" @click="openModal">Open modal</IxButton>
  </IxSpace>
  <IxModal v-model:visible="visible" type="confirm" :footer="null" title="This is title">
    <MyComponent></MyComponent>
  </IxModal>
</template>

<script lang="ts">
import { defineComponent, h, inject, ref } from 'vue'

import { IxButton } from '@idux/components/button'
import { MODAL_TOKEN, useModal } from '@idux/components/modal'

const MyComponent = {
  setup() {
    const { cancel, ok } = inject(MODAL_TOKEN)!

    const content = h('p', { style: { marginBottom: '16px' } }, { default: () => `Some contents...` })

    const cancelButton = h(IxButton, { onClick: cancel, style: { marginRight: '16px' } }, `Cancel`)
    const okButton = h(IxButton, { onClick: ok, mode: 'primary' }, `Ok`)
    const footer = h('div', { style: { textAlign: 'right' } }, [cancelButton, okButton])

    return () => h('div', [content, footer])
  },
}

export default defineComponent({
  components: { MyComponent },
})
</script>

<script setup lang="ts">
const visible = ref(false)

const { confirm } = useModal()

const openModal = () => confirm({ title: 'This is title', footer: null, content: h(MyComponent) })
</script>
