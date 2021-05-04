<template>
  <ix-tag> Tag </ix-tag>
  <ix-tag icon="alipay">tag has icon</ix-tag>
  <ix-tag icon="bug" isRound> isRound </ix-tag>
  <ix-tag closable @close="onClose"> tag close </ix-tag>

  <!--  <ix-tag v-show="hide" icon="alipay" closable @close="onClose">测试</ix-tag>-->
  <!--  <ix-tag v-show="hide" color="red" icon="alipay" closable @close="onClose">测试</ix-tag>-->
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
