<template>
  <CustomForm :control="formGroup">
    Name: <CustomInput control="name" /> <br />
    Age: <CustomInput control="age" /> <br />
    Email: <CustomInput control="email" /> <br />
    City: <CustomInput control="address.city" /> <br />
    Street: <CustomInput control="address.street" /> <br />
    Zip: <CustomInput control="address.zip" /> <br />
    Remark-0: <CustomInput control="remarks.0" /> <br />
    Remark-1:<CustomInput control="remarks.1" /> <br />
    Remark-2:<CustomInput control="remarks.2" /> <br />

    <IxButton mode="primary" @click="onSubmit">Submit</IxButton>
  </CustomForm>
</template>

<script setup lang="ts">
import { Validators, useFormArray, useFormGroup } from '@idux/cdk/forms'

import CustomForm from './CustomForm.vue'
import CustomInput from './CustomInput.vue'

const { required, min, max, email } = Validators

const address = useFormGroup({
  city: ['', required],
  street: ['', required],
  zip: [''],
})

const remarks = useFormArray<string[]>([['remark0'], ['remark1'], ['remark2']])

const formGroup = useFormGroup({
  name: ['tom', required],
  age: [18, [required, min(1), max(30)]],
  email: ['', [email]],
  address: address,
  remarks: remarks,
})

formGroup.watchValue(value => console.log('group value:', value))
formGroup.watchStatus(stats => console.log('group status:', stats))

const nameControl = formGroup.get('name')
nameControl.watchStatus(value => console.log('name value:', value))
nameControl.watchStatus(stats => console.log('name status:', stats))

const onSubmit = () => {
  if (formGroup.valid.value) {
    console.log('submit', formGroup.getValue())
  } else {
    console.log('formGroup invalid: ', formGroup)
  }
}
</script>
