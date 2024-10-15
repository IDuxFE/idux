<template>
  <IxColorPicker v-model:value="value" :presets="presets">
    <template #panel>
      <div class="demo-color-picker-custom-panel__panel">
        <div class="demo-color-picker-custom-panel__left">
          <IxColorPickerPresets />
        </div>
        <div class="demo-color-picker-custom-panel__separator"></div>
        <div class="demo-color-picker-custom-panel__right">
          <IxColorPickerPalette />
          <IxColorPickerEditor />
        </div>
      </div>
    </template>
  </IxColorPicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ColorPreset } from '@idux/components/color-picker'
import { useThemeToken } from '@idux/components/theme'

const { themeTokens } = useThemeToken()

const presets: ColorPreset[] = [
  {
    key: 'recommended',
    label: '推荐颜色',
    colors: [
      '#1C6EFF',
      '#F52727',
      '#8DD118',
      '#20CC94',
      '#0BA7B5',
      '#FDAA1D',
      '#7824FF',
      '#19D2DB',
      '#1BA0F2',
      '#7583FF',
      '#FFC2EF',
      '#2F3540',
      '#454C59',
      '#5E6573',
      '#6F7785',
      '#A1A7B3',
      '#BEC3CC',
      '#D3D7DE',
      '#E1E5EB',
      '#E8F4FF',
      '#EDF1F7',
      '#F7F9FC',
    ],
    defaultOpen: true,
  },
  {
    key: 'recent',
    label: '最近使用',
    colors: [
      '#1C6EFF',
      '#45D9A3',
      '#FF5752',
      '#FA721B',
      '#7824FF',
      '#19D2DB',
      '#45BEFF',
      '#6EADFF',
      '#2F3540',
      '#6F7785',
      '#E1E5EB',
    ],
    defaultOpen: false,
  },
]

const value = ref(themeTokens.value.colorPrimary)
</script>

<style lang="less">
.demo-color-picker-custom-panel {
  &__panel {
    display: flex;
  }

  &__separator {
    height: 100%;
    width: 1px;
    margin: 0 var(--ix-margin-size-lg);
    border-right: var(--ix-line-width) var(--ix-line-type) var(--ix-color-separator);
  }

  &__left {
    width: 342px;
  }
  &__right {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: var(--ix-margin-size-sm);
  }
}
</style>
