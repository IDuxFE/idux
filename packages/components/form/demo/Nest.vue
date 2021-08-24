<template>
  <ix-form :control="formGroup" :labelCol="8">
    <h4 v-typography>Name</h4>
    <ix-row>
      <ix-col span="8">
        <ix-form-item control="name.firstName" label="First Name" required>
          <ix-input></ix-input>
        </ix-form-item>
      </ix-col>
      <ix-col span="8">
        <ix-form-item control="name.lastName" label="Last Name" required>
          <ix-input></ix-input>
        </ix-form-item>
      </ix-col>
    </ix-row>
    <h4 v-typography>Address</h4>
    <ix-form-wrapper control="address">
      <ix-row>
        <ix-col span="8">
          <ix-form-item control="city" label="City" required>
            <ix-input></ix-input>
          </ix-form-item>
        </ix-col>
        <ix-col span="8">
          <ix-form-item control="street" label="Street" required>
            <ix-input></ix-input>
          </ix-form-item>
        </ix-col>
        <ix-col span="8">
          <ix-form-item control="zip" label="Zip Code">
            <ix-input></ix-input>
          </ix-form-item>
        </ix-col>
      </ix-row>
      <ix-form-item>
        <ix-button mode="primary" @click="onSubmit">Submit</ix-button>
      </ix-form-item>
    </ix-form-wrapper>
  </ix-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFormGroup, Validators } from '@idux/cdk/forms'

interface Name {
  firstName: string
  lastName: string
}

interface Address {
  city: string
  street: string
  zip?: number
}

export default defineComponent({
  setup() {
    const { required } = Validators

    const nameGroup = useFormGroup<Name>({
      firstName: ['', required],
      lastName: ['', required],
    })

    const addressGroup = useFormGroup<Address>({
      city: ['', required],
      street: ['', required],
      zip: [undefined],
    })

    const formGroup = useFormGroup({
      name: nameGroup,
      address: addressGroup,
    })

    const onSubmit = () => {
      if (formGroup.valid.value) {
        console.log('submit', formGroup.getValue())
      } else {
        formGroup.markAsDirty()
      }
    }

    return { formGroup, onSubmit }
  },
})
</script>
