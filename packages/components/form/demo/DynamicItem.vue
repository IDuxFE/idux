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
    <template v-for="(control, index) in arrayControl.controls.value" :key="control.uid">
      <IxFormItem :label="'Array-' + control.uid">
        <IxInput :control="control"></IxInput>
        <IxIcon name="minus-circle" @click="removeArrayItem(index)"></IxIcon>
      </IxFormItem>
    </template>
  </IxForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FormArray, useFormArray, useFormControl, useFormGroup } from '@idux/cdk/forms'

export default defineComponent({
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formGroup = useFormGroup<any>({
      array: useFormArray([]),
    })

    const arrayControl = formGroup.get('array') as FormArray<string[]>

    let uid = 0
    const addGroupItem = () => {
      const itemKey = `Group-${uid++}`
      formGroup.addControl(itemKey, useFormControl())
    }

    const removeGroupItem = (key: string) => {
      formGroup.removeControl(key)
    }

    const addArrayItem = () => {
      arrayControl.push(useFormControl())
    }

    const removeArrayItem = (index: number) => {
      arrayControl.removeAt(index)
    }

    const onSubmit = () => console.log('submit', formGroup.getValue())

    return {
      formGroup,
      arrayControl,
      addGroupItem,
      removeGroupItem,
      addArrayItem,
      removeArrayItem,
      onSubmit,
    }
  },
})
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
