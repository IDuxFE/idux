<template>
  <IxProTextarea
    v-model:value="value"
    :errors="errors"
    :onChange="onChange"
    :onBlur="onBlur"
    placeholder="Error Message"
  ></IxProTextarea>
</template>

<script setup lang="ts">
import type { TextareaError } from '@idux/pro/textarea'

import { ref } from 'vue'

const ipRegex = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
const validateIP = (line: string) => ipRegex.test(line)
const getIpValidationResults = (value: string | undefined) => {
  const lines = value?.split('\n')

  return lines
    ?.map((line, index) => !validateIP(line.trim()) && { index, message: 'IP Input is invalid' })
    .filter(Boolean) as TextareaError[]
}

const value = ref(['127.0.0.1', '168.0.0.1', '100.10', '255.255.255.255', '999.999.1.1'].join('\n'))
const errors = ref<TextareaError[]>(getIpValidationResults(value.value))
const onChange = (value: string | undefined, oldValue: string | undefined) => {
  if (value?.split('\n').length !== oldValue?.split('\n').length) {
    errors.value = getIpValidationResults(oldValue)
  }
}
const onBlur = () => {
  errors.value = getIpValidationResults(value.value)
}
</script>
<style scoped lang="less">
.ix-pro-textarea {
  width: 480px;
  height: 210px;
}
</style>
