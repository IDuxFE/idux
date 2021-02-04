import { renderWork } from '@tests'
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

  renderWork(IxEmpty)

  test('image work', async () => {
    const wrapper = EmptyMount()
    expect(wrapper.find('.ix-icon').exists()).toEqual(true)

    await wrapper.setProps({ image: 'image.url' })

    expect(wrapper.find('.ix-icon').exists()).toEqual(false)
    expect(wrapper.find('img').exists()).toEqual(true)
  })

  test('description work', async () => {
    const description = 'my description'
    const wrapper = EmptyMount({ props: { description } })

    expect(wrapper.find('.ix-empty-description').text()).toEqual(description)
  })

  test('description slot work', async () => {
    const description = 'description slots'
    const wrapper = EmptyMount({
      props: { description: 'description props' },
      slots: { description },
    })

    expect(wrapper.find('.ix-empty-description').text()).toEqual(description)
  })

  test('default slot work', async () => {
    const wrapper = EmptyMount({ slots: { default: '<div class="default-slot"></div>' } })
    expect(wrapper.find('.default-slot').exists()).toEqual(true)
  })
})
