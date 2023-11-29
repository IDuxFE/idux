<template>
  <IxThemeProvider :tokens="tokens">
    <IxSpace vertical>
      <IxSpace>
        <IxButton mode="primary">按钮</IxButton>
        <IxButton>按钮</IxButton>
      </IxSpace>
      <IxSlider></IxSlider>
    </IxSpace>
  </IxThemeProvider>
</template>

<script lang="ts" setup>
import { type DeepPartialThemeTokens, getBaseColors } from '@idux/components/theme'

const baseColors = getBaseColors()
const colorPrimary = baseColors.purple

const tokens: DeepPartialThemeTokens = {
  global: {
    colorPrimary,
  },
  components: {
    slider: {
      trackBgColor: baseColors.bud,
    },
  },
}
</script>
