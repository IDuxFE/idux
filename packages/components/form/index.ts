import type { App } from 'vue'

import IxForm from './src/Form.vue'
import IxFormItem from './src/FormItem.vue'
import IxFormWrapper from './src/FormWrapper.vue'

IxForm.install = (app: App): void => {
  app.component(IxForm.name, IxForm)
}

IxFormItem.install = (app: App): void => {
  app.component(IxFormItem.name, IxFormItem)
}

IxFormWrapper.install = (app: App): void => {
  app.component(IxFormWrapper.name, IxFormWrapper)
}

export { IxForm, IxFormItem, IxFormWrapper }

export type { FormInstance, FormProps, FormItemInstance, FormItemProps } from './src/types'
