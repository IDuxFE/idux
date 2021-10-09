<template>
  <IxSpace direction="vertical" :size="20">
    <IxSwitch v-model:checked="checked1" :loading="loading"></IxSwitch>
    <IxSwitch v-model:checked="checked2" :loading="loading"></IxSwitch>
  </IxSpace>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked1 = ref(true)
    const checked2 = ref(false)
    const loading = ref(true)

    return {
      checked1,
      checked2,
      loading,
    }
  },
})
</script>
