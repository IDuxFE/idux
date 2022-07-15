import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import ProForm from '../src/ProForm'
import { ProFormProps } from '../src/types'

describe.skip('ProForm', () => {
  const ProFormMount = (options?: MountingOptions<Partial<ProFormProps>>) =>
    mount(ProForm, { ...(options as MountingOptions<ProFormProps>) })

  renderWork<ProFormProps>(ProForm, {
    props: {},
  })

  test('xxx work', async () => {
    const wrapper = ProFormMount({ props: { xxx: 'Xxx' } })

    expect(wrapper.classes()).toContain('ix-Xxx')

    await wrapper.setProps({ xxx: 'Yyy' })

    expect(wrapper.classes()).toContain('ix-Yyy')
  })
})
