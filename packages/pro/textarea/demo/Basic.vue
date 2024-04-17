<template>
  <div>
    <IxSpace vertical>
      <IxProTextarea
        v-model:value="value"
        :rows="3"
        :disabled="disabled"
        :onChange="onChange"
        placeholder="Basic usage"
      ></IxProTextarea>
      <IxSwitch v-model:checked="disabled">disabled</IxSwitch>
    </IxSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const disabled = ref(false)
const onChange = (value: string, oldValue: string) => {
  console.log(value, oldValue)
}
</script>

<style scoped lang="less">
.ix-pro-textarea {
  width: 480px;
}
</style>
