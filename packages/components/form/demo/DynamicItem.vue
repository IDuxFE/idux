<template>
  <IxForm class="demo-form" :control="formGroup" labelCol="6">
    <IxFormItem>
      <IxSpace>
        <IxButton icon="plus" @click="addGroupItem()">Group Field</IxButton>
        <IxButton icon="plus" @click="addArrayItem()">Array Field</IxButton>
        <IxButton mode="primary" @click="onSubmit">Submit</IxButton>
      </IxSpace>
    </IxFormItem>
    <template v-for="(control, key) in formGroup.controls.value" :key="control.uid">
      <IxFormItem v-if="key !== 'array'" :label="key">
        <IxInput :control="control"></IxInput>
        <IxIcon name="minus-circle" @click="removeGroupItem(key)"></IxIcon>
      </IxFormItem>
    </template>
    <template v-for="(control, index) in formArray.controls.value" :key="control.uid">
      <IxFormItem :label="'Array-' + control.uid">
        <IxInput :control="control"></IxInput>
        <IxIcon name="minus-circle" @click="removeArrayItem(index)"></IxIcon>
      </IxFormItem>
    </template>
  </IxForm>
</template>

<script setup lang="ts">
import { useFormArray, useFormControl, useFormGroup } from '@idux/cdk/forms'

interface FormValue {
  array: string[]
  [key: string]: any
}

const formArray = useFormArray([['']])

const formGroup = useFormGroup<FormValue>({
  array: formArray,
})

let uid = 0
const addGroupItem = () => {
  const itemKey = `Group-${uid++}`
  formGroup.addControl(itemKey, useFormControl())
}

const removeGroupItem = (key: string) => {
  formGroup.removeControl(key)
}

const addArrayItem = () => {
  formArray.push(useFormControl(''))
}

const removeArrayItem = (index: number) => {
  formArray.removeAt(index)
}

const onSubmit = () => console.log('submit', formGroup.getValue())
</script>

<style lang="less" scoped>
.demo-form:not(.ix-form-inline) {
  max-width: 300px;
  .ix-input {
    width: 80%;
    margin-right: 16px;
  }

  .ix-icon {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
