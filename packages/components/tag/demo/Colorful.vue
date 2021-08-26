<template>
  <div>
    <p>Presets:</p>
    <IxTag color="red"> red </IxTag>
    <IxTag color="orange"> orange </IxTag>
    <IxTag color="gold"> gold </IxTag>
    <IxTag color="yellow"> yellow </IxTag>
    <IxTag color="canary"> canary </IxTag>
    <IxTag color="prasinous"> prasinous </IxTag>
    <IxTag color="verdant"> verdant </IxTag>
    <IxTag color="green"> green </IxTag>
    <IxTag color="cyan"> cyan </IxTag>
    <IxTag color="sky"> sky </IxTag>
    <IxTag color="blue"> blue </IxTag>
    <IxTag color="admiral"> admiral </IxTag>
    <IxTag color="purple"> purple </IxTag>
    <IxTag color="magenta"> magenta </IxTag>
  </div>
  <div>
    <p>Custom:</p>
    <IxTag color="#2db7f5"> #2db7f5 </IxTag>
    <IxTag color="#87d068"> #87d068 </IxTag>
    <IxTag color="#f50"> #f50 </IxTag>
    <IxTag color="#108ee9"> #108ee9 </IxTag>
    <IxTag color="#abcfcf"> #abcfcf </IxTag>
  </div>

  <div>
    <p>StatusColorTypes:</p>
    <IxTag color="success"> success </IxTag>
    <IxTag color="pending"> pending </IxTag>
    <IxTag color="error"> error </IxTag>
    <IxTag color="warning"> warning </IxTag>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const hide = ref(true)
    const onClose = () => {
      console.log('close-success')
      hide.value = !hide.value
    }
    const checked = ref(false)
    const onChangeChecked = () => {
      console.log('close-success')
      checked.value = !checked.value
    }
    return { hide, onClose, checked, onChangeChecked }
  },
})
</script>
