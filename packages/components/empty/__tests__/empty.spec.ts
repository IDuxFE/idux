import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import IxEmpty from '../src/Empty.vue'
import { EmptyProps } from '../src/types'

describe('Empty.vue', () => {
  let EmptyMount: (
    options?: MountingOptions<Partial<EmptyProps>>,
  ) => VueWrapper<InstanceType<DefineComponent<EmptyProps>>>

  beforeEach(() => {
    EmptyMount = (options = {}) => {
      return mount<EmptyProps>(IxEmpty, {
        ...options,
      })
    }
  })

  test('render work', () => {
    const wrapper = EmptyMount()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
