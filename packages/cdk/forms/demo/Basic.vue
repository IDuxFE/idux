<template>
  <ix-form :control="group">
    Name: <ix-input control="name" /> <br />
    Age: <ix-input control="age" /> <br />
    Email: <ix-input control="email" />
  </ix-form>
</template>

<script lang="ts">
/* eslint-disable vue/one-component-per-file */
/* eslint-disable vue/require-prop-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { defineComponent } from 'vue'
import { injectControl, provideControl, Validators, useFormGroup } from '@idux/cdk/forms'

const IxForm = defineComponent({
  props: ['control'],
  setup(props) {
    provideControl(props.control)
  },
  template: `<form><slot /></form>`,
})

const IxInput = defineComponent({
  props: ['control'],
  setup(props) {
    const control$ = injectControl(props.control)!

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (evt: any) => {
      control$.setValue(evt.target!.value, { dirty: true })
    }

    return { control$, onChange }
  },
  template: `<input :value="control$.valueRef.value" @input="onChange" @blur="control$.markAsBlurred()" />`,
})

export default defineComponent({
  components: { IxForm, IxInput },
  setup() {
    const { required, min, max, minLength, maxLength } = Validators
    const group = useFormGroup({
      name: ['tom', required],
      age: [18, [required, min(1), max(99)]],
      email: ['', [minLength(8), maxLength(40)]],
    })

    group.watchValue(value => console.log(value))
    group.watchStatus(stats => console.log(stats))

    group.get('name')?.watchStatus(stats => console.log(stats))

    return { group }
  },
})
</script>
