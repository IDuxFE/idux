<template>
  <IxTag> Tag</IxTag>
  <IxTag icon="alipay">tag has icon</IxTag>
  <IxTag icon="bug" shape="round"> tag with round</IxTag>
  <IxTag v-if="hide" closable :onClose="onClose"> tag with closable</IxTag>
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
      console.log('change-success')
      checked.value = !checked.value
    }
    return { hide, onClose, checked, onChangeChecked }
  },
})
</script>
