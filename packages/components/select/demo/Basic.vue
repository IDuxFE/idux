<template>
  <ix-row :gutter="8">
    <ix-col :span="6">
      <ix-select v-model:value="singleValue" placeholder="choose Tom or Jerry">
        <ix-option label="Tom" value="tom" />
        <ix-option label="Jerry" value="jerry" />
        <ix-option label="Speike" value="speike" disabled />
      </ix-select>
    </ix-col>
    <ix-col :span="6">
      <ix-select v-model:value="singleValue" disabled>
        <ix-option label="Tom" value="tom" />
        <ix-option label="Jerry" value="jerry" />
        <ix-option label="Speike" value="speike" disabled />
      </ix-select>
    </ix-col>
    <ix-col :span="6">
      <ix-select v-model:value="singleValue" clearable>
        <ix-option label="Tom" value="tom" />
        <ix-option label="Jerry" value="jerry" />
        <ix-option label="Speike" value="speike" disabled />
      </ix-select>
    </ix-col>
    <ix-col :span="6">
      <ix-select v-model:value="singleValue" searchable>
        <ix-option label="Tom" value="tom" />
        <ix-option label="Jerry" value="jerry" />
        <ix-option label="Speike" value="speike" disabled />
      </ix-select>
    </ix-col>
    <ix-col :span="8">
      <ix-select v-model:value="multipleValue" multiple disabled placeholder="Choose">
        <ix-option
          v-for="option in multipleOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
          :disabled="option.disabled"
        />
      </ix-select>
    </ix-col>
    <ix-col :span="8">
      <ix-select v-model:value="multipleValue" :options="multipleOptions" multiple clearable> </ix-select>
    </ix-col>
    <ix-col :span="8">
      <ix-select
        v-model:value="multipleValue"
        :options="multipleOptions"
        multiple
        :multipleLimit="5"
        :maxLabelCount="3"
      >
      </ix-select>
    </ix-col>
  </ix-row>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SelectOption } from '../src/types'

export default defineComponent({
  setup() {
    const singleValue = ref('tom')
    const multipleValue = ref([0])

    const multipleOptions = ref<SelectOption[]>([])
    for (let index = 0; index < 20; index++) {
      const prefix = index > 9 ? 'B' : 'A'
      multipleOptions.value.push({ label: prefix + index, value: index, disabled: index % 3 === 0 })
    }

    return { singleValue, multipleValue, multipleOptions }
  },
})
</script>
