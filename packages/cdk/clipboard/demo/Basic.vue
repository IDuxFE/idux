<template>
  <IxSpace>
    <IxInput v-model:value="text" style="width: 200px"></IxInput>
    <IxButton @click="onCopy">Copy</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useClipboard } from '@idux/cdk/clipboard'

const text = ref('')

const { copy } = useClipboard()
const onCopy = () => {
  copy(text.value).then(success => {
    console.log('onCopy', success)
  })
}
</script>
