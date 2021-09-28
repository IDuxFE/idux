<template>
  <IxSpace direction="vertical">
    <IxCheckboxGroup v-model:value="value" :options="options" :gap="40" />
    <IxCheckboxGroup v-model:value="value" :options="options" :gap="40" buttoned />
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref(['option2', 'option3'])
    const checked = ref(true)
    const options = [
      { label: '选项一', value: 'option1' },
      { label: '选项二', value: 'option2' },
      { label: '选项三', value: 'option3' },
    ]
    return {
      checked,
      value,
      options,
    }
  },
})
</script>
