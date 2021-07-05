<template>
  <ix-space>
    <ix-button @click="visible = !visible">Change visible</ix-button>
    <ix-button mode="primary" @click="openModal">Open modal</ix-button>
  </ix-space>
  <ix-modal v-model:visible="visible" type="confirm" :footer="null" title="This is title">
    <MyComponent></MyComponent>
  </ix-modal>
</template>

<script lang="ts">
import { defineComponent, h, inject, ref } from 'vue'
import { IxButton } from '@idux/components/button'
import { modalToken, useModal } from '@idux/components/modal'

const MyComponent = {
  props: {},
  setup() {
    const { props, cancel, ok } = inject(modalToken)!

    const content = h('p', { style: { marginBottom: '16px' } }, { default: () => `modal title is: ${props.title}` })

    const cancelButton = h(IxButton, { onClick: cancel, style: { marginRight: '16px' } }, `Cancel`)
    const okButton = h(IxButton, { onClick: ok, mode: 'primary' }, `Ok`)
    const footer = h('div', { style: { textAlign: 'right' } }, [cancelButton, okButton])

    return () => h('div', [content, footer])
  },
}

export default defineComponent({
  components: { MyComponent },
  setup() {
    const visible = ref(false)

    const { confirm } = useModal()

    const openModal = () => confirm({ title: 'This is title', footer: null, content: h(MyComponent) })

    return { visible, openModal }
  },
})
</script>
