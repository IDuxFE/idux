<template>
  <IxProForm class="demo-form" autoId="register" :fields="fields" @submit="onSubmit">
    <template #captcha="props">
      <IxRow gutter="8">
        <IxCol span="12">
          <IxInput v-bind="props"> </IxInput>
        </IxCol>
        <IxCol span="12">
          <IxButton @click="getCaptcha">Get captcha</IxButton>
        </IxCol>
      </IxRow>
    </template>
    <IxFormItem :controlCol="noLabelControlCol">
      <IxButton block mode="primary" type="submit">Submit</IxButton>
    </IxFormItem>
  </IxProForm>
</template>

<script setup lang="ts">
import { AbstractControl, ValidateErrors, Validators } from '@idux/cdk/forms'
import { IxCheckbox } from '@idux/components/checkbox'
import { ProFormFieldsSchema } from '@idux/pro/form'

const noLabelControlCol = { sm: { offset: 8, span: 16 }, xs: 24 }

const { required, requiredTrue, email, rangeLength } = Validators
const confirmPasswordValidator = (value: string, control: AbstractControl): ValidateErrors | undefined => {
  if (!value) {
    return { required: { message: 'Please confirm your password!' } }
  } else if (value !== control.root.get('password')?.getValue()) {
    return { confirm: { message: 'Two passwords that you enter is inconsistent!' } }
  }
  return undefined
}

const getCaptcha = () => console.log('getCaptcha')

const fields: ProFormFieldsSchema = {
  formProps: {
    labelCol: { sm: 8, xs: 24 },
    controlCol: { sm: 16, xs: 24 },
  },
  properties: {
    email: {
      formItemProps: {
        label: 'E-mail',
        required: true,
      },
      validators: [required, email],
    },
    password: {
      formItemProps: {
        label: 'Password',
        required: true,
      },
      componentProps: {
        type: 'password',
      },
      validators: [required, rangeLength(6, 18)],
    },
    confirmPassword: {
      formItemProps: {
        label: 'Confirm Password',
        required: true,
      },
      componentProps: {
        type: 'password',
      },
      validators: [required, confirmPasswordValidator],
    },
    nickname: {
      formItemProps: {
        label: 'Nickname',
        labelTooltip: 'What do you want others to call you?',
        required: true,
      },
      validators: [required],
    },
    website: {
      formItemProps: {
        label: 'Website',
      },
    },
    captcha: {
      customControl: 'captcha',
      formItemProps: {
        label: 'Captcha',
        description: 'We must make sure that your are a human.',
        required: true,
      },
      disabled: true,
      validators: [required],
    },
    agree: {
      formItemProps: {
        controlCol: noLabelControlCol,
      },
      component: IxCheckbox,
      componentProps: {
        label: 'I have read the agreement',
      },
      validators: [requiredTrue],
    },
  },
}

const onSubmit = (value: unknown) => {
  console.log('submit', value)
}
</script>

<style scoped lang="less">
.demo-form {
  max-width: 400px;
}
</style>
