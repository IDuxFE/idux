<template>
  <ix-select v-model:value="singleValue" :compareWith="compareFn">
    <ix-option v-for="option in options" :key="option.value" :label="option.label" :value="option" />
  </ix-select>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { SelectOption } from '../src/types'

export default defineComponent({
  setup() {
    const singleValue = ref({ value: 'tom' })

    watch(singleValue, value => console.log(value))

    const options: SelectOption[] = [
      { label: 'Tom', value: 'tom' },
      { label: 'Jerry', value: 'jerry' },
      { label: 'Speike', value: 'speike' },
    ]

    const compareFn = (o1: SelectOption, o2: SelectOption) => (o1 && o2 ? o1.value === o2.value : o1 === o2)

    return { singleValue, options, compareFn }
  },
})
</script>
