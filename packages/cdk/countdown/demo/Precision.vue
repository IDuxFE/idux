<template>
  <IxSpace vertical :size="20">
    {{ hours }} : {{ minutes }} : {{ seconds }} {{ milliseconds ? ': ' + milliseconds : '' }}
    <IxSwitch v-model:checked="active"></IxSwitch>
    <IxSelect v-model:value="precision" :dataSource="dataSource" style="width: 120px"></IxSelect>
    <IxButton @click="reset">复原</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { type Precision, useCountdown } from '@idux/cdk/countdown'

const precision = ref<Precision>(0)

const { hours, minutes, seconds, active, milliseconds, reset } = useCountdown(360000, {
  precision,
})

const dataSource = [
  { key: 0, label: '不显示毫秒位' },
  { key: 1, label: '显示一位毫秒位' },
  { key: 2, label: '显示两位毫秒位' },
  { key: 3, label: '显示三位毫秒位' },
]
</script>
