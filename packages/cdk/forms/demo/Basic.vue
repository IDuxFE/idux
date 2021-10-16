<template>
  <CustomForm :control="group">
    Name: <CustomInput control="name" /> <br />
    Age: <CustomInput control="age" /> <br />
    Email: <CustomInput control="email" />
  </CustomForm>
</template>

<script setup lang="ts">
import { Validators, useFormGroup } from '@idux/cdk/forms'

import CustomForm from './BasicForm.vue'
import CustomInput from './BasicInput.vue'

const { required, min, max, email } = Validators
const group = useFormGroup({
  name: ['tom', required],
  age: [18, [required, min(1), max(99)]],
  email: ['', [email]],
})

group.watchValue(value => console.log(value))
group.watchStatus(stats => console.log(stats))

group.get('name')!.watchStatus(stats => console.log(stats))
</script>
