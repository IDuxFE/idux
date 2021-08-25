<template>
  <IxRadioGroup v-model:value="value" :options="options" buttoned size="small"></IxRadioGroup>
  <br /><br />
  <IxRadioGroup v-model:value="value" :options="options" buttoned></IxRadioGroup>
  <br /><br />
  <IxRadioGroup v-model:value="value" :options="options" buttoned size="large">></IxRadioGroup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RadioOptions } from '@idux/components/radio'

export default defineComponent({
  setup() {
    const value = ref('a')

    const options: RadioOptions[] = [
      { label: 'Beijing', value: 'a' },
      { label: 'Shanghai', value: 'b' },
      { label: 'Guangzhou', value: 'c' },
      { label: 'Shenzhen', value: 'd' },
    ]

    return { value, options }
  },
})
</script>
