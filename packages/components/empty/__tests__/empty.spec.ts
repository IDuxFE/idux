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

  // 自定义插槽
  test('count slot work', async () => {
    const wrapper = EmptyMount({ slots: { count: '<div class="count-slot"></div>' } })
    const countSlot = wrapper.find('.count-slot')
    expect(countSlot.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
