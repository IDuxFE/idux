import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import ProTagSelect from '../src/ProTagSelect'
import { ProTagSelectProps } from '../src/types'

describe.skip('ProTagSelect', () => {
  const ProTagSelectMount = (options?: MountingOptions<Partial<ProTagSelectProps>>) =>
    mount(ProTagSelect, { ...(options as MountingOptions<ProTagSelectProps>) })

  renderWork<ProTagSelectProps>(ProTagSelect, {
    props: {},
  })

  test('xxx work', async () => {
    const wrapper = ProTagSelectMount({ props: { xxx: 'Xxx' } })

    expect(wrapper.classes()).toContain('ix-Xxx')

    await wrapper.setProps({ xxx: 'Yyy' })

    expect(wrapper.classes()).toContain('ix-Yyy')
  })
})
