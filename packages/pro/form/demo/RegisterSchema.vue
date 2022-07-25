<template>
  <IxProForm class="demo-form" autoId="register-schema" :fields="fields" :schema="schema" @submit="onSubmit">
    <template #password="props">
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
import { AbstractControl, ValidateErrors } from '@idux/cdk/forms'
import { IxCheckbox } from '@idux/components/checkbox'
import { ProFormFieldsSchema, ProFormJsonSchema } from '@idux/pro/form'

const noLabelControlCol = { sm: { offset: 8, span: 16 }, xs: 24 }

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
    password: {
      componentProps: {
        type: 'password',
      },
    },
    confirmPassword: {
      componentProps: {
        type: 'password',
      },
      validators: [confirmPasswordValidator],
    },
    nickname: {
      formItemProps: {
        labelTooltip: 'What do you want others to call you?',
      },
    },
    captcha: {
      customControl: 'captcha',
      formItemProps: {
        description: 'We must make sure that your are a human.',
      },
      disabled: true,
    },
    agree: {
      formItemProps: {
        controlCol: noLabelControlCol,
      },
      component: IxCheckbox,
      componentProps: {
        label: 'I have read the agreement',
      },
    },
  },
}

const schema: ProFormJsonSchema = {
  properties: {
    email: {
      type: 'string',
      title: 'E-mail',
      format: 'email',
    },
    password: {
      type: 'string',
      title: 'Password',
      minLength: 6,
      maxLength: 18,
    },
    confirmPassword: {
      type: 'string',
      title: 'Confirm Password',
    },
    nickname: {
      type: 'string',
      title: 'Nickname',
    },
    website: {
      type: 'string',
      title: 'Website',
    },
    captcha: {
      type: 'string',
      title: 'Captcha',
      description: 'We must make sure that your are a human.',
    },
    agree: {
      type: 'boolean',
      const: true,
    },
  },
  required: ['email', 'password', 'confirmPassword', 'nickname', 'captcha'],
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
