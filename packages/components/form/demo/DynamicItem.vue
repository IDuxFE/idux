<template>
  <ix-form class="demo-form" :control="formGroup" labelCol="6">
    <ix-form-item>
      <ix-space>
        <ix-button icon="plus" @click="addGroupItem()">Group Field</ix-button>
        <ix-button icon="plus" @click="addArrayItem()">Array Field</ix-button>
        <ix-button mode="primary" @click="onSubmit">Submit</ix-button>
      </ix-space>
    </ix-form-item>
    <template v-for="(control, key) in formGroup.controls.value" :key="control.id">
      <ix-form-item v-if="key !== 'array'" :control="control" :label="key">
        <ix-input></ix-input>
        <ix-icon name="minus-circle" @click="removeGroupItem(key)"></ix-icon>
      </ix-form-item>
    </template>
    <template v-for="(control, index) in arrayControl.controls.value" :key="control.id">
      <ix-form-item :control="control" :label="'Array-' + control.id">
        <ix-input></ix-input>
        <ix-icon name="minus-circle" @click="removeArrayItem(index)"></ix-icon>
      </ix-form-item>
    </template>
  </ix-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FormArray, useFormArray, useFormControl, useFormGroup } from '@idux/cdk/forms'

export default defineComponent({
  setup() {
    const formGroup = useFormGroup<any>({
      array: useFormArray([]),
    })

    const arrayControl = formGroup.get('array') as FormArray<string[]>

    let id = 0
    const addGroupItem = () => {
      const itemKey = `Group-${id++}`
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
