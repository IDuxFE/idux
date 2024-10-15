<template>
  <IxSpace vertical>
    <IxSpace vertical>
      <IxColorPicker v-model:value="value" v-model:format="format" :onChange="onChange" />
      <IxColorPicker v-model:value="value" v-model:format="format" showText :onChange="onChange" />
    </IxSpace>
    <IxSpace align="center">
      <span>format: </span>
      <IxRadioGroup v-model:value="format" :dataSource="formatDataSource" />
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ColorFormat } from '@idux/components/color-picker'
import { RadioData } from '@idux/components/radio'

const formatDataSource: RadioData[] = [
  {
    key: 'hex',
    label: 'hex',
  },
  {
    key: 'hsb',
    label: 'hsb',
  },
  {
    key: 'rgb',
    label: 'rgb',
  },
]

const value = ref()
const format = ref<ColorFormat>('hex')

const onChange = console.log
</script>
