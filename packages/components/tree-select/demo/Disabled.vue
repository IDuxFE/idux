<template>
  <IxSpace vertical>
    <IxCheckbox v-model:checked="disabled" label="disabled" />
    <IxTreeSelect v-model:value="value" placeholder="多选" multiple :dataSource="treeData" :disabled="disabled" />
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = [
  {
    label: 'Node 0',
    key: '0',
    children: [
      {
        label: 'Node 0-0',
        key: '0-0',
        children: [
          {
            label: 'Node 0-0-0',
            key: '0-0-0',
          },
          {
            label: 'Node 0-0-1',
            key: '0-0-1',
          },
        ],
      },
      {
        label: 'Node 0-1',
        key: '0-1',
        children: [
          { label: 'Node 0-1-0', key: '0-1-0' },
          { label: 'Node 0-1-1', key: '0-1-1' },
        ],
      },
    ],
  },
]

const value = ref(['0-0'])
const disabled = ref(true)
</script>
<style lang="less" scoped>
.ix-space {
  width: 100%;
}
</style>
