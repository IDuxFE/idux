<template>
  <div style="width: 400px">
    <IxRadioGroup v-model:value="checked" :dataSource="dataSource">
      <template #fieldset="{ value }">
        <IxFormItem v-if="value === 'beijing' || value === 'shanghai'">
          <IxInput control="username" :placeholder="'hello: ' + value" prefix="user"></IxInput>
        </IxFormItem>
        <IxFormItem v-if="value === 'guangzhou' || value === 'shenzhen'">
          <IxInput
            control="password"
            :placeholder="'wahaha: ' + value"
            prefix="lock"
            suffix="eye-invisible"
            type="password"
          >
          </IxInput>
        </IxFormItem>
      </template>
    </IxRadioGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { RadioData } from '@idux/components/radio'

const checked = ref('beijing')

const dataSource: RadioData[] = [
  { key: 'beijing', label: 'Beijing' },
  { key: 'shanghai', label: 'Shanghai' },
  { key: 'guangzhou', label: 'Guangzhou' },
  { key: 'shenzhen', label: 'Shenzhen' },
]
</script>
