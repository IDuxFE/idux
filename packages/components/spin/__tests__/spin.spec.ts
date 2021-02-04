import { renderWork } from '@tests'
import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import IxSpin from '../src/Spin.vue'
import { SpinProps } from '../src/types'

describe('Spin.vue', () => {
  let SpinMount: (options?: MountingOptions<Partial<SpinProps>>) => VueWrapper<InstanceType<DefineComponent<SpinProps>>>

  beforeEach(() => {
    SpinMount = (options = {}) => {
      return mount<SpinProps>(IxSpin, {
        ...options,
      })
    }
  })

  renderWork(IxSpin)

  test('spinning work', async () => {
    const wrapper = SpinMount({ props: { spinning: false } })

    expect(wrapper.find('.ix-spin-spinner').exists()).toBeFalsy()

    await wrapper.setProps({ spinning: true })

    expect(wrapper.find('.ix-spin-spinner').exists()).toBeTruthy()
  })

  test('size work', async () => {
    const wrapper = SpinMount()

    expect(wrapper.find('.ix-spin-spinner').classes()).toContain('ix-spin-spinner-small')

    await wrapper.setProps({ size: 'medium' })

    expect(wrapper.find('.ix-spin-spinner').classes()).not.toContain('ix-spin-spinner-small')
    expect(wrapper.find('.ix-spin-spinner').classes()).not.toContain('ix-spin-spinner-medium')

    await wrapper.setProps({ size: 'large' })

    expect(wrapper.find('.ix-spin-spinner').classes()).toContain('ix-spin-spinner-large')
  })

  test('icon work', async () => {
    const wrapper = SpinMount()

    expect(wrapper.find('.ix-icon-loading').exists()).toBeTruthy()

    await wrapper.setProps({ icon: 'up' })

    expect(wrapper.find('.ix-icon-up').exists()).toBeTruthy()
  })

  test('tip work', async () => {
    const wrapper = SpinMount()
    const tip = 'loading'
    expect(wrapper.find('.ix-spin-spinner-tip').exists()).toBeFalsy()

    await wrapper.setProps({ tip })

    const spinTipDom = wrapper.find('.ix-spin-spinner-tip')
    expect(spinTipDom.exists()).toBeTruthy()

    expect(spinTipDom.text()).toEqual(tip)
  })

  test('tipAlign work', async () => {
    const wrapper = SpinMount({ props: { tip: 'loading' } })

    expect(wrapper.find('.ix-spin-spinner-tip-vertical').exists()).toBeTruthy()

    await wrapper.setProps({ tipAlign: 'horizontal' })

    expect(wrapper.find('.ix-spin-spinner-tip-horizontal').exists()).toBeTruthy()
  })

  test('slot work', async () => {
    const wrapper = SpinMount({
      slots: {
        default: '<div class="content">content</div>',
      },
    })
    const defaultSlot = wrapper.find('.content')
    const containerDom = wrapper.find('.ix-spin-container')

    expect(containerDom.exists()).toBeTruthy()

    expect(containerDom.classes()).toContain('ix-spin-container-blur')

    expect(defaultSlot.exists()).toBeTruthy()
  })

  test('spinning with icon work', async () => {
    const wrapper = SpinMount({
      props: {
        spinning: false,
        icon: 'up',
      },
    })

    expect(wrapper.find('.ix-icon-up').exists()).toBeFalsy()
  })

  test('spinning with size work', async () => {
    const wrapper = SpinMount({
      props: {
        spinning: false,
      },
    })

    expect(wrapper.find('.ix-spin-spinner').exists()).toBeFalsy()

    expect(wrapper.find('.ix-spin-spinner-small').exists()).toBeFalsy()
  })

  test('spinning with tip work', async () => {
    const wrapper = SpinMount({
      props: {
        spinning: false,
        tip: 'loading',
      },
    })

    expect(wrapper.find('.ix-spin-spinner-tip').exists()).toBeFalsy()

    expect(wrapper.find('.ix-spin-spinner-tip-vertical').exists()).toBeFalsy()
  })

  test('spinning with slot work', async () => {
    const wrapper = SpinMount({
      props: {
        spinning: false,
      },
      slots: {
        default: '<div class="content">content</div>',
      },
    })

    const containerDom = wrapper.find('.ix-spin-container')

    expect(containerDom.classes()).not.toContain('ix-spin-container-blur')
  })
})
