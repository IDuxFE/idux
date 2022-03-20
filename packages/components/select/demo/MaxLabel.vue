<template>
  <div class="max-label-count-demo">
    <p>maxLabel="responsive"</p>
    <IxSelect
      v-model:value="value"
      :dataSource="dataSource"
      multiple
      maxLabel="responsive"
      allowInput
      @change="onChange"
    ></IxSelect>
    <br />
    <br />
    <p>不设置maxLabel</p>
    <IxSelect v-model:value="value" :dataSource="dataSource" multiple></IxSelect>
    <br />
    <br />
    <p>maxLabel="3"</p>
    <IxSelect v-model:value="value" :dataSource="dataSource" multiple :maxLabel="3"></IxSelect>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = []

for (let index = 0; index < 20; index++) {
  const prefix = index > 9 ? 'Responsive long label B' : 'Responsive long label A'
  dataSource.push({ key: index, label: prefix + index, value: index, disabled: index % 5 === 0 })
}

const value = ref([0, 1, 2, 3, 4])

const onChange = (value: number[], oldValue: number[]) => {
  console.log('selected change: ', value, oldValue)
}
</script>

<style lang="less">
.max-label-count-demo {
  .ix-select {
    width: 100%;
  }
}
</style>
