<template>
  <IxSelect v-model:value="singleValue" :options="options" labelKey="text" valueKey="key"> </IxSelect>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const singleValue = ref('tom')

    const options = [
      { text: 'Tom', key: 'tom' },
      { text: 'Jerry', key: 'jerry' },
      { text: 'Speike', key: 'speike', disabled: true },
    ]

    return { singleValue, options }
  },
})
</script>
