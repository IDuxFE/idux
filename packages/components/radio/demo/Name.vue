<template>
  <ix-radio-group v-model:value="value" :options="options" name="city"></ix-radio-group>
  <br /><br />
  <ix-radio-group v-model:value="value2" :options="options" name="city" buttoned></ix-radio-group>
  <br /><br />
  <ix-radio-group v-model:value="value3" :options="options" name="city" buttoned mode="primary"></ix-radio-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RadioOptions } from '@idux/components/radio'

export default defineComponent({
  setup() {
    const value = ref('a')
    const value2 = ref('a')
    const value3 = ref('a')

    const options: RadioOptions[] = [
      { label: 'Beijing', value: 'a' },
      { label: 'Shanghai', value: 'b' },
      { label: 'Guangzhou', value: 'c' },
      { label: 'Shenzhen', value: 'd' },
    ]

    return { value, value2, value3, options }
  },
})
</script>
