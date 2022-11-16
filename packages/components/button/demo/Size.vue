<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="size" :dataSource="sizeData" />
    <IxSpace align="center">
      <IxButton mode="primary" :size="size">Primary</IxButton>
      <IxButton :size="size">Default</IxButton>
      <IxButton mode="dashed" :size="size">Dashed</IxButton>
      <IxButton mode="text" :size="size">Text</IxButton>
      <IxButton mode="link" :size="size" href="https://github.com/IDuxFE/idux" target="_blank">Link</IxButton>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ButtonSize } from '@idux/components/button'

const sizeData = [
  { key: 'xs', label: 'Extra Small' },
  { key: 'sm', label: 'Small' },
  { key: 'md', label: 'Medium' },
  { key: 'lg', label: 'Large' },
  { key: 'xl', label: 'Extra Large' },
]

const size = ref<ButtonSize>('md')
</script>
