<template>
  <IxForm :control="formGroup" :labelCol="8">
    <h4 v-typography>Name</h4>
    <IxRow>
      <IxCol span="8">
        <IxFormItem control="name.firstName" label="First Name" required>
          <IxInput></IxInput>
        </IxFormItem>
      </IxCol>
      <IxCol span="8">
        <IxFormItem control="name.lastName" label="Last Name" required>
          <IxInput></IxInput>
        </IxFormItem>
      </IxCol>
    </IxRow>
    <h4 v-typography>Address</h4>
    <IxFormWrapper control="address">
      <IxRow>
        <IxCol span="8">
          <IxFormItem control="city" label="City" required>
            <IxInput></IxInput>
          </IxFormItem>
        </IxCol>
        <IxCol span="8">
          <IxFormItem control="street" label="Street" required>
            <IxInput></IxInput>
          </IxFormItem>
        </IxCol>
        <IxCol span="8">
          <IxFormItem control="zip" label="Zip Code">
            <IxInput></IxInput>
          </IxFormItem>
        </IxCol>
      </IxRow>
      <IxFormItem>
        <IxButton mode="primary" @click="onSubmit">Submit</IxButton>
      </IxFormItem>
    </IxFormWrapper>
  </IxForm>
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
