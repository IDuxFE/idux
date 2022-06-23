import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import ProSearch from '../src/ProSearch'
import { ProSearchProps } from '../src/types'

describe.skip('ProSearch', () => {
  const ProSearchMount = (options?: MountingOptions<Partial<ProSearchProps>>) =>
    mount(ProSearch, { ...(options as MountingOptions<ProSearchProps>) })

  renderWork<ProSearchProps>(ProSearch, {
    props: {},
  })

  test('xxx work', async () => {
    const wrapper = ProSearchMount({ props: { xxx: 'Xxx' } })

    expect(wrapper.classes()).toContain('ix-Xxx')

    await wrapper.setProps({ xxx: 'Yyy' })

    expect(wrapper.classes()).toContain('ix-Yyy')
  })
})
