import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxDropdown from '../src/Dropdown.vue'
import { DropdownProps } from '../src/types'

describe('Dropdown.vue', () => {
  let DropdownMount: (options?: MountingOptions<Partial<DropdownProps>>) => VueWrapper<InstanceType<typeof IxDropdown>>

  beforeEach(() => {
    DropdownMount = options => mount(IxDropdown, { ...options })
  })

  renderWork(IxDropdown)
})
