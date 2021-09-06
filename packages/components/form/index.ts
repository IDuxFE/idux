import type { FormComponent, FormItemComponent, FormWrapperComponent } from './src/types'

import Form from './src/Form'
import FormItem from './src/FormItem'
import FormWrapper from './src/FormWrapper'

const IxForm = Form as unknown as FormComponent
const IxFormItem = FormItem as unknown as FormItemComponent
const IxFormWrapper = FormWrapper as unknown as FormWrapperComponent

export { IxForm, IxFormItem, IxFormWrapper }

export { FORM_ITEM_TOKEN, useFormItemRegister } from './src/token'

export type {
  FormInstance,
  FormPublicProps as FormProps,
  FormItemInstance,
  FormItemPublicProps as FormItemProps,
  FormWrapperInstance,
  FormWrapperPublicProps as FormWrapperProps,
  FormLabelAlign,
  FormLayout,
  FormSize,
  FormMessage,
} from './src/types'
