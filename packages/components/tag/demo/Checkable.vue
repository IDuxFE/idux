<template>
  <div>
    <IxTag color="red" icon="alipay" closable checkable :checked="checked" :onClose="onClose" @click="onChangeChecked"
      >测试可选</IxTag
    >
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
      console.log('change-success')
      checked.value = !checked.value
    }
    return { hide, onClose, checked, onChangeChecked }
  },
})
</script>
