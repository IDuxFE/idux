<template>
  <IxSwitch :disabled="disabled"></IxSwitch>
  <div class="mt-5">disabled: {{ disabled }}</div>
  <IxButton class="mt-5" @click="changeDisabled">change disabled</IxButton>
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
<style lang="less" scoped>
.mt-5 {
  margin-top: 5px;
}
</style>
