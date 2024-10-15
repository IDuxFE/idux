<template>
  <IxSpace vertical>
    <IxColorPicker v-model:value="value" disabled :onChange="onChange" />
    <IxColorPicker v-model:value="value" disabled showText :onChange="onChange" />
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useThemeToken } from '@idux/components/theme'

const { themeTokens } = useThemeToken()

const value = ref(themeTokens.value.colorPrimary)

const onChange = console.log
</script>
