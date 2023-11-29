<template>
  <div style="width: 100%">
    <IxThemeProvider :presetTheme="presetTheme" :tokens="{ global: { colorPrimary: colorPrimary } }">
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
    <IxSwitch v-model:checked="switchChecked" style="margin-top: 8px">切换主题</IxSwitch>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import { type PresetTheme, getBaseColors } from '@idux/components/theme'

const switchChecked = ref(false)

const baseColors = getBaseColors()
const presetTheme = computed<PresetTheme>(() => (switchChecked.value ? 'dark' : 'default'))
const colorPrimary = computed(() => (presetTheme.value === 'default' ? baseColors.bud : baseColors.purple))
</script>
