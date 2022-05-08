import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import ProTree from '../src/ProTree'
import { ProTreeProps } from '../src/types'

describe.skip('ProTree', () => {
  const ProTreeMount = (options?: MountingOptions<Partial<ProTreeProps>>) =>
    mount(ProTree, { ...(options as MountingOptions<ProTreeProps>) })

  renderWork<ProTreeProps>(ProTree, {
    props: {},
  })

  test('xxx work', async () => {
    const wrapper = ProTreeMount({ props: { xxx: 'Xxx' } })

    expect(wrapper.classes()).toContain('ix-Xxx')

    await wrapper.setProps({ xxx: 'Yyy' })

    expect(wrapper.classes()).toContain('ix-Yyy')
  })
})
