<template>
  <IxForm :control="formGroup" :labelCol="8">
    <h4 v-typography>Name</h4>
    <IxRow>
      <IxCol span="8">
        <IxFormItem label="First Name" required>
          <IxInput control="name.firstName"></IxInput>
        </IxFormItem>
      </IxCol>
      <IxCol span="8">
        <IxFormItem label="Last Name" required>
          <IxInput control="name.lastName"></IxInput>
        </IxFormItem>
      </IxCol>
    </IxRow>
    <h4 v-typography>Address</h4>
    <IxFormWrapper control="address">
      <IxRow>
        <IxCol span="8">
          <IxFormItem label="City" required>
            <IxInput control="city"></IxInput>
          </IxFormItem>
        </IxCol>
        <IxCol span="8">
          <IxFormItem label="Street" required>
            <IxInput control="street"></IxInput>
          </IxFormItem>
        </IxCol>
        <IxCol span="8">
          <IxFormItem label="Zip Code">
            <IxInput control="zip"></IxInput>
          </IxFormItem>
        </IxCol>
      </IxRow>
      <IxFormItem>
        <IxButton mode="primary" @click="onSubmit">Submit</IxButton>
      </IxFormItem>
    </IxFormWrapper>
  </IxForm>
</template>

<script setup lang="ts">
import { Validators, useFormGroup } from '@idux/cdk/forms'

const { required } = Validators

// const nameGroup = useFormGroup({
//   firstName: ['', required],
//   lastName: ['', required],
// })

// const addressGroup = useFormGroup({
//   city: ['', required],
//   street: ['', required],
//   zip: [''],
// })

const formGroup = useFormGroup({
  // name: nameGroup,
  // address: addressGroup,
  name: {
    firstName: ['', required],
    lastName: ['', required],
  },
  address: {
    city: ['', required],
    street: ['', required],
    zip: [''],
  },
})

const onSubmit = () => {
  if (formGroup.valid.value) {
    console.log('submit', formGroup.getValue())
  } else {
    formGroup.markAsDirty()
  }
}
</script>
