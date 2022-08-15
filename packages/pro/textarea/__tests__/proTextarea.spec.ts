import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import ProTextarea from '../src/ProTextarea'
import { ProTextareaProps } from '../src/types'

describe.skip('ProTextarea', () => {
  const ProTextareaMount = (options?: MountingOptions<Partial<ProTextareaProps>>) =>
    mount(ProTextarea, { ...(options as MountingOptions<ProTextareaProps>) })

  renderWork<ProTextareaProps>(ProTextarea, {
    props: {},
  })

  test('xxx work', async () => {
    const wrapper = ProTextareaMount({ props: { xxx: 'Xxx' } })

    expect(wrapper.classes()).toContain('ix-Xxx')

    await wrapper.setProps({ xxx: 'Yyy' })

    expect(wrapper.classes()).toContain('ix-Yyy')
  })
})
