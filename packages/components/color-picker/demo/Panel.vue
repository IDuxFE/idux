<template>
  <div>
    <IxSpace vertical>
      <IxPopconfirm :icon="''" :onOk="handlePopcomfirmConfirm" :onUpddate:visible="handlePopconfirmVisibleChange">
        <IxColorPickerTrigger :value="popconfirmValue" showText />
        <template #content>
          <IxColorPickerPanel v-model:value="popconfirmTempValue" :presets="presets" paddingless />
        </template>
      </IxPopconfirm>
      <IxColorPickerTrigger :value="modalValue" showText @click="handleModalTriggerClick" />
    </IxSpace>
    <IxModal
      v-model:visible="modalVisible"
      :width="730"
      :onOk="handleModalConfirm"
      :onUpdate:visible="handleModalVisibleChange"
    >
      <IxColorPickerPanel v-model:value="modalTempValue" :presets="presets" paddingless>
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
      </IxColorPickerPanel>
    </IxModal>
  </div>
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

const modalVisible = ref(false)

const popconfirmValue = ref(themeTokens.value.colorPrimary)
const modalValue = ref(themeTokens.value.colorPrimary)

const popconfirmTempValue = ref(themeTokens.value.colorPrimary)
const modalTempValue = ref(themeTokens.value.colorPrimary)

const handleModalTriggerClick = () => {
  modalVisible.value = true
}
const handlePopcomfirmConfirm = () => {
  console.log('onOk', popconfirmTempValue.value)
  popconfirmValue.value = popconfirmTempValue.value
}
const handleModalConfirm = () => {
  modalValue.value = modalTempValue.value
}
const handlePopconfirmVisibleChange = (visible: boolean) => {
  if (!visible) {
    popconfirmTempValue.value = popconfirmValue.value
  }
}
const handleModalVisibleChange = (visible: boolean) => {
  if (!visible) {
    modalTempValue.value = modalValue.value
  }
}
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
    flex: 342;
  }
  &__right {
    flex: 300;
    display: flex;
    flex-direction: column;
    gap: var(--ix-margin-size-sm);
  }
}
</style>
