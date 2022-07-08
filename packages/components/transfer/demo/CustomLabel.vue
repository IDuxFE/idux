<template>
  <IxTransfer v-model:value="selectedKeys" :data-source="dataSource" :disabled="disabled">
    <template #label="{ item }">
      <span style="display: flex; align-items: center">
        <span style="margin-right: 8px">{{ item.label }}</span>
        <IxIcon name="desktop" />
      </span>
    </template>
  </IxTransfer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Data {
  key: number
  value: number
  label: string
}

const selectedKeys = ref<number[]>(Array.from(new Array(10)).map((_, idx) => idx))

const dataSource: Data[] = Array.from(new Array(20)).map((_, idx) => ({
  key: idx,
  value: idx,
  label: 'Option' + idx,
  disabled: [1, 6, 12, 16].includes(idx),
}))

const disabled = ref(false)
</script>
