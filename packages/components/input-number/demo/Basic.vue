<template>
  <IxSpace vertical>
    <IxInputNumber
      v-model:value="value"
      :max="10"
      :min="1"
      @change="handleChange"
      @blur="onBlur"
      @focus="onFocus"
    ></IxInputNumber>

    <IxInputNumber
      v-model:value="value"
      style="width: 200px"
      :max="10"
      :min="1"
      @change="handleChange"
      @blur="onBlur"
      @focus="onFocus"
    >
      <template v-if="value <= 1" #addonBefore>倒计时</template>
      <template #addonAfter>天</template>
    </IxInputNumber>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)

function handleChange(value: number | null, oldValue: number | null | undefined) {
  console.log('changed', value, oldValue)
}

const onBlur = console.log
const onFocus = console.log
</script>
