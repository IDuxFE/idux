<template>
  <IxSpace vertical>
    <IxTransfer v-model:value="targetKeys" :data-source="dataSource" :disabled="disabled" />
    <IxSpace align="center">
      <label>disabled: </label>
      <IxSwitch v-model:checked="disabled" />
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Data {
  key: number
  value: number
  label: string
}

const targetKeys = ref<number[]>([])

const dataSource: Data[] = Array.from(new Array(20)).map((_, idx) => ({
  key: idx,
  value: idx,
  label: 'Option' + idx,
  disabled: [1, 6].includes(idx),
}))

const disabled = ref(false)
</script>
