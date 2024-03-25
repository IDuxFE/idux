import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import ControlTrigger from '../src/ControlTrigger'
import { ControlTriggerProps } from '../src/types'

describe.skip('Trigger', () => {
  const TriggerMount = (options?: MountingOptions<Partial<ControlTriggerProps>>) =>
    mount(ControlTrigger, { ...(options as MountingOptions<ControlTriggerProps>) })

  renderWork<ControlTriggerProps>(ControlTrigger, {
    props: {},
  })

  test('xxx work', async () => {
    const wrapper = TriggerMount({ props: { xxx: 'Xxx' } })

    expect(wrapper.classes()).toContain('ix-Xxx')

    await wrapper.setProps({ xxx: 'Yyy' })

    expect(wrapper.classes()).toContain('ix-Yyy')
  })
})
