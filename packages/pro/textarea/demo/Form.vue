<template>
  <IxForm :control="formGroup" :labelCol="4" :controlCol="8">
    <IxFormItem label="Rule Name" required>
      <IxInput control="ruleName" placeholder="Please input rule name"></IxInput>
    </IxFormItem>
    <IxFormItem label="IP List" labelTooltip="Please input IP, IP Range or IP with Prefix, one at each row">
      <IxProTextarea control="IP" :errors="errors" :placeholder="ipInputPlaceHolder"></IxProTextarea>
    </IxFormItem>
  </IxForm>
</template>

<script setup lang="ts">
import type { TextareaError } from '@idux/pro/textarea'

import { ref } from 'vue'

import { ValidateErrors, Validators, useFormGroup } from '@idux/cdk/forms'

const ipInputPlaceHolder = [
  'Please input IP, IP Range or IP with Prefix, one at each row',
  'Examples:',
  'IP: 192.168.1.1',
  'IP Range: 192.168.1.1-192.168.1.10',
  'IP With Prefix: 192.168.1.10/24',
].join('\n')

const ipRegexStr = '(\\b25[0-5]|\\b2[0-4][0-9]|\\b[01]?[0-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}'
const ipRegex = new RegExp(`^${ipRegexStr}$`)
const prefixedIpRegex = new RegExp(`^${ipRegexStr}/([1-2][0-9]|3[0-2]|[1-9])$`)
const ipRangeRegex = new RegExp(`^${ipRegexStr}-${ipRegexStr}$`)

const validateIP = (line: string) => [ipRegex, prefixedIpRegex, ipRangeRegex].some(regex => regex.test(line.trim()))
const getIpValidationResults = (value: string | undefined) => {
  const lines = value?.split('\n')

  return lines
    ?.map((line, index) => line.trim() && !validateIP(line.trim()) && { index, message: 'IP Input is invalid' })
    .filter(Boolean) as TextareaError[]
}

const errors = ref<TextareaError[]>()

const { required } = Validators
const IPValidator = (value: string): ValidateErrors | undefined => {
  if (!value) {
    errors.value = []
    return
  }

  const result = getIpValidationResults(value)
  errors.value = result

  const errorIndexList = result?.map(error => error.index + 1)
  /* eslint-disable indent */
  return errorIndexList && errorIndexList.length > 0
    ? {
        IP: { message: `IP input at line ${errorIndexList.join(', ')} is incorrect` },
      }
    : undefined
  /* eslint-enable indent */
}

const formGroup = useFormGroup({
  ruleName: ['', [required]],
  IP: ['', [IPValidator]],
})
</script>
