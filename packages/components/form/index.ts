import type { FormComponent, FormItemComponent, FormWrapperComponent } from './src/types'

import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'
import FormWrapper from './src/FormWrapper.vue'

const IxForm = Form as unknown as FormComponent
const IxFormItem = FormItem as unknown as FormItemComponent
const IxFormWrapper = FormWrapper as unknown as FormWrapperComponent

export { IxForm, IxFormItem, IxFormWrapper }

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
  FormMessageFn,
  FormMessage,
} from './src/types'
