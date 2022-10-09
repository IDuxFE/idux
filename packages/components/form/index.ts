/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FormComponent, FormItemComponent, FormWrapperComponent } from './src/types'

import Form from './src/Form'
import FormItem from './src/FormItem'
import FormWrapper from './src/FormWrapper'

const IxForm = Form as unknown as FormComponent
const IxFormItem = FormItem as unknown as FormItemComponent
const IxFormWrapper = FormWrapper as unknown as FormWrapperComponent

export { IxForm, IxFormItem, IxFormWrapper }

export { FORM_TOKEN, FORM_ITEM_TOKEN } from './src/token'
export {
  useFormItemRegister,
  useFormElement,
  useFormFocusMonitor,
  useFormSize,
  useFormStatus,
} from './src/composables/public'

export type {
  FormInstance,
  FormComponent,
  FormPublicProps as FormProps,
  FormItemInstance,
  FormItemComponent,
  FormItemPublicProps as FormItemProps,
  FormWrapperInstance,
  FormWrapperComponent,
  FormWrapperPublicProps as FormWrapperProps,
  FormColType,
  FormLabelAlign,
  FormLayout,
  FormSize,
} from './src/types'

export type { FormContext } from './src/token'
export type { FormElementContext, FormFocusMonitor } from './src/composables/public'
