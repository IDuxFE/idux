<template>
  <div>
    <p>Presets:</p>
    <IxTag color="red"> red </IxTag>
    <IxTag color="orange"> orange </IxTag>
    <IxTag color="brown"> brown </IxTag>
    <IxTag color="yellow"> yellow </IxTag>
    <IxTag color="canary"> canary </IxTag>
    <IxTag color="bud"> bud </IxTag>
    <IxTag color="green"> green </IxTag>
    <IxTag color="turquoise"> turquoise </IxTag>
    <IxTag color="cyan"> cyan </IxTag>
    <IxTag color="glacier"> glacier </IxTag>
    <IxTag color="blue"> blue </IxTag>
    <IxTag color="indigo"> indigo </IxTag>
    <IxTag color="purple"> purple </IxTag>
    <IxTag color="magenta"> magenta </IxTag>
  </div>
  <div>
    <p>StatusColorTypes:</p>
    <IxTag color="success"> success </IxTag>
    <IxTag color="pending"> pending </IxTag>
    <IxTag color="error"> error </IxTag>
    <IxTag color="warning"> warning </IxTag>
  </div>
  <div>
    <p>Custom:</p>
    <IxTag color="#2db7f5"> #2db7f5 </IxTag>
    <IxTag color="#87d068"> #87d068 </IxTag>
    <IxTag color="#f50"> #f50 </IxTag>
    <IxTag color="#108ee9"> #108ee9 </IxTag>
    <IxTag color="#abcfcf"> #abcfcf </IxTag>
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
