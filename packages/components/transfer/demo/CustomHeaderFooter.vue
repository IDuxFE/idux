<template>
  <IxTransfer v-model:value="targetKeys" :data-source="dataSource" :disabled="disabled" show-list-footer>
    <template #headerLabel>
      <span> Custom header </span>
    </template>
    <template #headerSuffix>
      <IxIcon name="plus" :onClick="handleSuffixClick" />
    </template>
    <template #footer> Custom footer </template>
  </IxTransfer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Data {
  key: number
  value: number
  label: string
}

const targetKeys = ref<number[]>(Array.from(new Array(10)).map((_, idx) => idx))

const dataSource: Data[] = Array.from(new Array(20)).map((_, idx) => ({
  key: idx,
  value: idx,
  label: 'Option' + idx,
  disabled: [1, 6, 12, 16].includes(idx),
}))

const disabled = ref(false)

const handleSuffixClick = (evt: Event) => {
  console.log(evt)
}
</script>
