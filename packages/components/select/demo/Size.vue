<template>
  <ix-row :gutter="8">
    <ix-col :span="12">
      <ix-select v-model:value="singleValue" :options="options" size="large"> </ix-select>
    </ix-col>
    <ix-col :span="12">
      <ix-select v-model:value="multipleValue" :options="options" multiple size="large"> </ix-select>
    </ix-col>
    <ix-col :span="12">
      <ix-select v-model:value="singleValue" :options="options"> </ix-select>
    </ix-col>
    <ix-col :span="12">
      <ix-select v-model:value="multipleValue" :options="options" multiple> </ix-select>
    </ix-col>
    <ix-col :span="12">
      <ix-select v-model:value="singleValue" :options="options" size="small"> </ix-select>
    </ix-col>
    <ix-col :span="12">
      <ix-select v-model:value="multipleValue" :options="options" multiple size="small"> </ix-select>
    </ix-col>
  </ix-row>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const singleValue = ref('tom')
    const multipleValue = ref(['tom'])

    const options = [
      { label: 'Tom', value: 'tom' },
      { label: 'Jerry', value: 'jerry' },
      { label: 'Speike', value: 'speike', disabled: true },
    ]

    return { singleValue, multipleValue, options }
  },
})
</script>
