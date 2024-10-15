<template>
  <IxSpace>
    <IxSpace vertical>
      <IxColorPicker v-model:value="value" size="sm" :onChange="onChange" />
      <IxColorPicker v-model:value="value" size="md" :onChange="onChange" />
      <IxColorPicker v-model:value="value" size="lg" :onChange="onChange" />
    </IxSpace>
    <IxSpace vertical>
      <IxColorPicker v-model:value="value" size="sm" showText :onChange="onChange" />
      <IxColorPicker v-model:value="value" size="md" showText :onChange="onChange" />
      <IxColorPicker v-model:value="value" size="lg" showText :onChange="onChange" />
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useThemeToken } from '@idux/components/theme'

const { themeTokens } = useThemeToken()

const value = ref(themeTokens.value.colorPrimary)

const onChange = console.log
</script>
