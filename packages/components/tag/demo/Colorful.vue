<template>
  <div>
    <p>Presets:</p>
    <ix-tag color="red"> red </ix-tag>
    <ix-tag color="orange"> orange </ix-tag>
    <ix-tag color="gold"> gold </ix-tag>
    <ix-tag color="yellow"> yellow </ix-tag>
    <ix-tag color="canary"> canary </ix-tag>
    <ix-tag color="prasinous"> prasinous </ix-tag>
    <ix-tag color="verdant"> verdant </ix-tag>
    <ix-tag color="green"> green </ix-tag>
    <ix-tag color="cyan"> cyan </ix-tag>
    <ix-tag color="sky"> sky </ix-tag>
    <ix-tag color="blue"> blue </ix-tag>
    <ix-tag color="admiral"> admiral </ix-tag>
    <ix-tag color="purple"> purple </ix-tag>
    <ix-tag color="magenta"> magenta </ix-tag>
  </div>
  <div>
    <p>Custom:</p>
    <ix-tag color="#2db7f5"> #2db7f5 </ix-tag>
    <ix-tag color="#87d068"> #87d068 </ix-tag>
    <ix-tag color="#f50"> #f50 </ix-tag>
    <ix-tag color="#108ee9"> #108ee9 </ix-tag>
    <ix-tag color="#abcfcf"> #abcfcf </ix-tag>
  </div>

  <div>
    <p>StatusColorTypes:</p>
    <ix-tag color="success"> success </ix-tag>
    <ix-tag color="pending"> pending </ix-tag>
    <ix-tag color="error"> error </ix-tag>
    <ix-tag color="warning"> warning </ix-tag>
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
