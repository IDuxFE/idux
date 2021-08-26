<template>
  <IxTag> Tag </IxTag>
  <IxTag icon="alipay">tag has icon</IxTag>
  <IxTag icon="bug" isRound> isRound </IxTag>
  <IxTag closable @close="onClose"> tag close </IxTag>

  <!--  <IxTag v-show="hide" icon="alipay" closable @close="onClose">测试</IxTag>-->
  <!--  <IxTag v-show="hide" color="red" icon="alipay" closable @close="onClose">测试</IxTag>-->
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
