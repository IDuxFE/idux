<template>
  <IxButton mode="primary" @click="showModal">Open Modal with async logic</IxButton>
  <IxModal v-model:visible="visible" title="This is title" type="confirm" @ok="onOk">
    <p>Some contents...</p>
  </IxModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const onOk = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })

const showModal = () => {
  visible.value = true
}
</script>
