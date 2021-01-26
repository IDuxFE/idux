<template>
  <ix-button @click="onCopy">Copy</ix-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClipboard } from '@idux/cdk/clipboard'

export default defineComponent({
  setup() {
    const { copy } = useClipboard()
    const onCopy = () => {
      copy('Copy Text').then(success => {
        console.log('onCopy', success)
      })
    }
    return { onCopy }
  },
})
</script>
