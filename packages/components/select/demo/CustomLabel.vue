<template>
  <ix-select v-model:value="singleValue" :options="options" multiple :multipleLimit="5" :maxLabelCount="3">
    <template #customLabel="{ option }"><ix-icon :name="option.value" />{{ option.label }}</template>
    <template #customMaxLabel="{ option }">and {{ option.value.length }} more selected</template>
  </ix-select>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const singleValue = ref('github')

    const options = [
      { label: 'Github', value: 'github' },
      { label: 'Gitlab', value: 'gitlab' },
      { label: 'Chrome', value: 'chrome' },
      { label: 'Edeg', value: 'edeg' },
      { label: 'IE', value: 'ie' },
      { label: 'Android', value: 'android' },
      { label: 'Apple', value: 'apple' },
      { label: 'Windows', value: 'windows' },
    ]

    return { singleValue, options }
  },
})
</script>
