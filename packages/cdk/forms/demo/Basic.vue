<template>
  <custom-form :control="group">
    Name: <custom-input control="name" /> <br />
    Age: <custom-input control="age" /> <br />
    Email: <custom-input control="email" />
  </custom-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Validators, useFormGroup } from '@idux/cdk/forms'

import CustomForm from './BasicForm.vue'
import CustomInput from './BasicInput.vue'

export default defineComponent({
  components: { CustomForm, CustomInput },
  setup() {
    const { required, min, max, minLength, maxLength } = Validators
    const group = useFormGroup({
      name: ['tom', required],
      age: [18, [required, min(1), max(99)]],
      email: ['', [minLength(8), maxLength(40)]],
    })

    group.watchValue(value => console.log(value))
    group.watchStatus(stats => console.log(stats))

    group.get('name')!.watchStatus(stats => console.log(stats))

    return { group }
  },
})
</script>
