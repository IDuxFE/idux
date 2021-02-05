import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { defineComponent, DefineComponent } from 'vue'
import IxResult from '../src/Result.vue'
import { ResultProps } from '../src/types'
import { IxIcon } from '../../icon'
import { renderWork } from '@tests'

describe('Result.vue', () => {
  let ResultMount: (
    options?: MountingOptions<Partial<ResultProps>>,
  ) => VueWrapper<InstanceType<DefineComponent<ResultProps>>>

  beforeEach(() => {
    ResultMount = (options = {}) => {
      return mount<ResultProps>(IxResult, {
        ...options,
      })
    }
  })

  renderWork(IxResult)

  test('status work', async () => {
    const wrapper = ResultMount()
    expect(wrapper.findComponent(IxIcon).exists()).toBeTruthy()
    expect(wrapper.findComponent(IxIcon).props().name).toEqual('info-circle')
    expect(wrapper.classes()).toContain('ix-result-info')

    await wrapper.setProps({ status: 'success' })
    expect(wrapper.classes()).toContain('ix-result-success')
    expect(wrapper.findComponent(IxIcon).props().name).toEqual('check-circle')

    await wrapper.setProps({ status: 'warning' })
    expect(wrapper.classes()).toContain('ix-result-warning')
    expect(wrapper.findComponent(IxIcon).props().name).toEqual('exclamation-circle')

    await wrapper.setProps({ status: 'error' })
    expect(wrapper.classes()).toContain('ix-result-error')
    expect(wrapper.findComponent(IxIcon).props().name).toEqual('close-circle')

    await wrapper.setProps({ status: 'info' })
    expect(wrapper.classes()).toContain('ix-result-info')
    expect(wrapper.findComponent(IxIcon).props().name).toEqual('info-circle')
  })

  test('title work', async () => {
    const wrapper = ResultMount()
    expect(wrapper.find('.ix-result-title').exists()).toBeFalsy()

    await wrapper.setProps({ title: 'Title' })
    expect(wrapper.find('.ix-result-title').exists()).toBeTruthy()
  })

  test('subtitle work', async () => {
    const wrapper = ResultMount()
    expect(wrapper.find('.ix-result-subtitle').exists()).toBeFalsy()

    await wrapper.setProps({ subtitle: 'Subtitle' })
    expect(wrapper.find('.ix-result-subtitle').exists()).toBeTruthy()
  })

  test('icon work', () => {
    const wrapper = ResultMount({ props: { icon: 'check-circle' } })
    expect(wrapper.findComponent(IxIcon).props().name).toEqual('check-circle')
  })

  test('slot work', () => {
    const title = 'This is a title.'
    const subtitle = 'This is a subtitle.'
    const extra = 'This is the extra.'
    const TestComponent = defineComponent({
      components: { IxResult },
      template: `
      <IxResult>
        <template>
          <ul>
            <li>1</li>
            <li>2</li>
          </ul>
        </template>
        <template v-slot:title>${title}</template>
        <template v-slot:subtitle>${subtitle}</template>
        <template v-slot:extra>${extra}</template>
      </IxResult>
      `,
    })
    const wrapper = mount(TestComponent)
    expect(wrapper.find('.ix-result-content').exists()).toBeTruthy()
    expect(wrapper.find('.ix-result-title').exists()).toBeTruthy()
    expect(wrapper.find('.ix-result-subtitle').exists()).toBeTruthy()
    expect(wrapper.find('.ix-result-extra').exists()).toBeTruthy()

    expect(wrapper.get('.ix-result-content').get('ul').html()).toEqual('<ul><li>1</li><li>2</li></ul>')
    expect(wrapper.get('.ix-result-title').text()).toEqual(title)
    expect(wrapper.get('.ix-result-subtitle').text()).toEqual(subtitle)
    expect(wrapper.get('.ix-result-extra').text()).toEqual(extra)
  })
})
