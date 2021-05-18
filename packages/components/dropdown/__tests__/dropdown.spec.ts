import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import IxDropdown from '../src/Dropdown.vue'
import { DropdownInstance, DropdownProps } from '../src/types'

describe('Dropdown.vue', () => {
  let DropdownMount: (options?: MountingOptions<Partial<DropdownProps>>) => VueWrapper<DropdownInstance>

  beforeEach(() => {
    DropdownMount = options => mount<DropdownInstance>(IxDropdown, { ...options })
  })

  test('render work', () => {
    const wrapper = DropdownMount({})

    expect(wrapper.html()).toMatchSnapshot()

    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.unmount()
    }).not.toThrow()
  })
})
