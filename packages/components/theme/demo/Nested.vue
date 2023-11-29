<template>
  <IxThemeProvider :tokens="{ global: { colorPrimary: colorPrimary } }">
    <IxCard>
      <IxSpace vertical>
        <IxSpace>
          <IxButton mode="primary">按钮</IxButton>
          <IxButton>按钮</IxButton>
        </IxSpace>
        <IxSlider></IxSlider>
      </IxSpace>
      <IxThemeProvider :tokens="{ global: { colorContainerBg: nestedBgColor } }">
        <IxCard>
          <IxSpace vertical>
            <IxSpace>
              <IxButton mode="primary">按钮</IxButton>
              <IxButton>按钮</IxButton>
            </IxSpace>
            <IxSlider></IxSlider>
          </IxSpace>
        </IxCard>
      </IxThemeProvider>
    </IxCard>
  </IxThemeProvider>
</template>

<script lang="ts" setup>
import { getBaseColors, getColorPalette } from '@idux/components/theme'

const colorPrimary = getBaseColors().purple
const nestedBgColor = getColorPalette(colorPrimary).l50
</script>
