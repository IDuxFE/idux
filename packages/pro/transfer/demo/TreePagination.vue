<template>
  <IxProTransfer
    v-model:value="targetKeys"
    type="tree"
    pagination
    :data-source="dataSource"
    :scroll="{ height: 300, fullHeight: true }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Data {
  key: string
  disabled: boolean
  label: string
  children?: Data[]
}

const targetKeys = ref<string[]>(['1-2', '1-2-1', '1-2-2'])

const dataSource: Data[] = Array.from(new Array(50)).map((_, idx) => ({
  key: `${idx}`,
  disabled: false,
  label: `Selection-${idx}`,
  children: [
    {
      key: `${idx}-1`,
      disabled: false,
      label: `Selection-${idx}-1`,
    },
    {
      key: `${idx}-2`,
      disabled: false,
      label: `Selection-${idx}-2`,
      children: [
        {
          key: `${idx}-2-1`,
          disabled: false,
          label: `Selection-${idx}-2-1`,
        },
        {
          key: `${idx}-2-2`,
          disabled: true,
          label: `Selection-${idx}-2-2`,
        },
      ],
    },
    {
      key: `${idx}-3`,
      disabled: false,
      label: `Selection-${idx}-3`,
    },
  ],
}))
</script>
