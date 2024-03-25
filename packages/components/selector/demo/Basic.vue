<template>
  <IxSpace vertical>
    <IxSelector
      :dataSource="dataSoure"
      :disabled="!enabled"
      :multiple="multiple"
      :clearable="clearable"
      :readonly="readonly"
      :borderless="borderless"
      :size="size"
      :allowInput="allowInput"
      :status="status"
      :suffix="suffix"
      :suffixRotate="suffixRotate"
      :onFocus="onFocus"
      :onBlur="onBlur"
      :onClear="onClear"
      :onCompositionStart="onCompositionStart"
      :onCompositionEnd="onCompositionEnd"
      :onInput="onInput"
      :onInputValueChange="onInputValueChange"
      :onItemRemove="onItemRemove"
    ></IxSelector>
    <IxSpace align="center">
      <IxSpace align="center">
        <span>enabled</span>
        <IxSwitch v-model:checked="enabled">enabled</IxSwitch>
      </IxSpace>
      <IxSpace align="center">
        <span>multiple</span>
        <IxSwitch v-model:checked="multiple">multiple</IxSwitch>
      </IxSpace>
      <IxSpace align="center">
        <span>clearable</span>
        <IxSwitch v-model:checked="clearable">clearable</IxSwitch>
      </IxSpace>
      <IxSpace align="center">
        <span>readonly</span>
        <IxSwitch v-model:checked="readonly">readonly</IxSwitch>
      </IxSpace>
      <IxSpace align="center">
        <span>borderless</span>
        <IxSwitch v-model:checked="borderless">borderless</IxSwitch>
      </IxSpace>
    </IxSpace>
    <IxSpace align="center">
      <span>size: </span>
      <IxRadioGroup v-model:value="size">
        <IxRadio value="sm"> sm </IxRadio>
        <IxRadio value="md"> md </IxRadio>
        <IxRadio value="lg"> lg </IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <IxSpace align="center">
      <span>allowInput: </span>
      <IxRadioGroup v-model:value="allowInput">
        <IxRadio :value="true"> true </IxRadio>
        <IxRadio :value="false"> false </IxRadio>
        <IxRadio value="searchable"> searchable </IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <IxSpace align="center">
      <span>status: </span>
      <IxRadioGroup v-model:value="status">
        <IxRadio value="valid"> valid </IxRadio>
        <IxRadio value="invalid"> invalid </IxRadio>
        <IxRadio value="validating"> validating </IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <IxSpace align="center">
      <span>suffix: </span>
      <IxRadioGroup v-model:value="suffix">
        <IxRadio value="down"> down </IxRadio>
        <IxRadio value="search"> search </IxRadio>
        <IxRadio value="calendar"> calendar </IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <IxSpace align="center">
      <span>suffixRotate: </span>
      <IxRadioGroup v-model:value="suffixRotate">
        <IxRadio :value="false"> false </IxRadio>
        <IxRadio :value="true"> true </IxRadio>
        <IxRadio :value="180"> 180 </IxRadio>
      </IxRadioGroup>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { SelectorData } from '@idux/components/selector'

const dataSoure: SelectorData[] = [
  {
    key: 1,
    label: 'item-1',
  },
  {
    key: 2,
    label: 'item-1',
  },
  {
    key: 3,
    label: 'item-1',
    disabled: true,
  },
]

const enabled = ref(true)
const multiple = ref(true)
const clearable = ref(false)
const readonly = ref(false)
const borderless = ref(false)
const allowInput = ref(false)
const size = ref<'sm' | 'md' | 'lg'>('md')
const status = ref<'valid' | 'invalid' | 'validating'>('valid')
const suffix = ref('down')
const suffixRotate = ref(false)

const onFocus = (evt: FocusEvent) => {
  console.log('focus', evt)
}
const onBlur = (evt: FocusEvent) => {
  console.log('blur', evt)
}
const onClear = (evt: MouseEvent) => {
  console.log('clear', evt)
}
const onCompositionStart = (evt: CompositionEvent) => {
  console.log('compositionstart', evt)
}
const onCompositionEnd = (evt: CompositionEvent) => {
  console.log('compositionend', evt)
}
const onInput = (evt: Event) => {
  console.log('input', evt)
}
const onInputValueChange = (value: string) => {
  console.log('inputValueChange', value)
}
const onItemRemove = (value: number) => {
  console.log('itemRemove', value)
}
</script>
