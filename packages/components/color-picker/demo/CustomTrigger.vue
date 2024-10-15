<template>
  <IxColorPicker v-model:value="colorValue" :onChange="onChange">
    <template #trigger="{ value, text }">
      <div>
        <IxButton :style="{ backgroundColor: value }"> open </IxButton>
        <div>{{ text }}</div>
      </div>
    </template>
  </IxColorPicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useThemeToken } from '@idux/components/theme'

const { themeTokens } = useThemeToken()

const colorValue = ref(themeTokens.value.colorPrimary)

const onChange = console.log
</script>
