import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxForm from '../src/Form.vue'
import { FormInstance, FormProps } from '../src/types'

describe.skip('Form.vue', () => {
  let FormMount: (options?: MountingOptions<Partial<FormProps>>) => VueWrapper<FormInstance>

  beforeEach(() => {
    FormMount = options => mount<FormInstance>(IxForm, { ...options })
    console.log(FormMount)
  })

  renderWork(IxForm)
})
