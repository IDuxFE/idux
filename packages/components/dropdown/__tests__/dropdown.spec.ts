import { MountingOptions, mount } from '@vue/test-utils'

import IxDropdown from '../src/Dropdown'
import { DropdownProps } from '../src/types'

describe.skip('Dropdown', () => {
  const DropdownMount = (options?: MountingOptions<Partial<DropdownProps>>) => mount(IxDropdown, { ...options })

  test('render work', () => {
    const wrapper = DropdownMount({})

    expect(wrapper.html()).toMatchSnapshot()

    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.unmount()
    }).not.toThrow()
  })
})
