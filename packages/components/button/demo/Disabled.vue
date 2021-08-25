<template>
  <IxButton mode="primary" disabled>Primary</IxButton>
  <IxButton disabled>Default</IxButton>
  <IxButton mode="dashed" disabled>Dashed</IxButton>
  <IxButton mode="text" disabled>Text</IxButton>
  <IxButton mode="link" disabled href="https://github.com/IDuxFE/idux" target="_blank">Link</IxButton>
  <br />
  <IxButton :disabled="disabled">Disabled: {{ disabled }}</IxButton>
  <IxButton @click="changeDisabled">Change Disabled</IxButton>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const disabled = ref(false)
    const changeDisabled = () => {
      disabled.value = !disabled.value
    }
    return { disabled, changeDisabled }
  },
})
</script>
