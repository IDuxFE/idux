<template>
  <IxSpace direction="vertical" :size="20">
    <IxSwitch :disabled="disabled"></IxSwitch>
    <IxButton @click="changeDisabled">Change Disabled</IxButton>
  </IxSpace>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const disabled = ref(true)
    const changeDisabled = () => {
      disabled.value = !disabled.value
    }

    return {
      disabled,
      changeDisabled,
    }
  },
})
</script>
