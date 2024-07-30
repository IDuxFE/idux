<template>
  <IxSpace vertical>
    <IxButton mode="primary" @click="showModal">Open Modal with async logic</IxButton>
    <IxSpace>
      <span>spinWithFullModal: </span>
      <IxSwitch v-model:checked="spinWithFullModal"></IxSwitch>
    </IxSpace>
  </IxSpace>

  <IxModal
    v-model:visible="visible"
    :spin="spin"
    :spinWithFullModal="spinWithFullModal"
    header="Loading status"
    :closable="!spin"
    :mask-closable="!spin"
    title="This is title"
    type="confirm"
    @ok="onOk"
  >
    <p>Some contents...</p>
  </IxModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const spin = ref(false)
const spinWithFullModal = ref(false)
const onOk = () =>
  new Promise(resolve => {
    spin.value = true
    setTimeout(() => {
      resolve(true)
      spin.value = false
    }, 3000)
  })

const showModal = () => {
  visible.value = true
}
</script>
