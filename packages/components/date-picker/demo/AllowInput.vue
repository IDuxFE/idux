<template>
  <IxSpace vertical>
    <IxSpace>
      <span>allowInput: </span>
      <IxRadioGroup v-model:value="allowInput">
        <IxRadio :value="true">true</IxRadio>
        <IxRadio value="overlay">overlay</IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <IxSpace vertical>
      <IxDatePicker
        v-model:value="dateValue"
        :allow-input="allowInput"
        clearable
        @focus="onFocus"
        @blur="onBlur"
      ></IxDatePicker>
      <IxDatePicker v-model:value="weekValue" :allow-input="allowInput" type="week" clearable></IxDatePicker>
      <IxDatePicker v-model:value="monthValue" :allow-input="allowInput" type="month" clearable></IxDatePicker>
      <IxDatePicker v-model:value="quarterValue" :allow-input="allowInput" type="quarter" clearable></IxDatePicker>
      <IxDatePicker v-model:value="yearValue" :allow-input="allowInput" type="year" clearable></IxDatePicker>
      <IxDatePicker v-model:value="dateValue" :allow-input="allowInput" type="datetime" clearable></IxDatePicker>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const dateValue = ref(new Date())
const weekValue = ref(Date.now())
const monthValue = ref('2022-01')
const quarterValue = ref('2022-Q1')
const yearValue = ref('2022')

const allowInput = ref(true)

const onFocus = (evt: FocusEvent) => {
  console.log('focus', evt)
}
const onBlur = (evt: FocusEvent) => {
  console.log('blur', evt)
}
</script>
