import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import IxForm from '../src/Form'
import { FormProps } from '../src/types'

describe.skip('Form.vue', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const FormMount = (options?: MountingOptions<Partial<FormProps>>) => mount(IxForm, { ...options })

  renderWork(IxForm)
})
