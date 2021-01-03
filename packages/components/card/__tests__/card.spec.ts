import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import IxCard from '../src/Card.vue'
import { CardProps } from '../src/types'

describe('Card.vue', () => {
  let CardMount: (options?: MountingOptions<Partial<CardProps>>) => VueWrapper<InstanceType<DefineComponent<CardProps>>>

  beforeEach(() => {
    CardMount = (options = {}) => {
      return mount<CardProps>(IxCard, {
        ...options,
      })
    }
  })

  test('render work', () => {
    const wrapper = CardMount()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('borderless word', async () => {
    const wrapper = CardMount()
    expect(wrapper.classes()).toContain('ix-card-border')

    await wrapper.setProps({ borderless: true })
    expect(wrapper.classes()).not.toContain('ix-card-border')
  })

  test('hoverable word', async () => {
    const wrapper = CardMount()
    expect(wrapper.classes()).not.toContain('ix-card-hover')

    await wrapper.setProps({ hoverable: true })
    expect(wrapper.classes()).toContain('ix-card-hover')
  })

  test('loading work', async () => {
    const wrapper = CardMount()
    expect(wrapper.find('.ix-card-loading-block').exists()).toBeFalsy()

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.ix-card-loading-block').exists()).toBeTruthy()
  })

  test('size work', async () => {
    const wrapper = CardMount()
    expect(wrapper.classes()).not.toContain('ix-card-small')

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.classes()).toContain('ix-card-small')
  })

  test('title work', async () => {
    const wrapper = CardMount()
    expect(wrapper.find('.ix-card-head-title').exists()).toBeFalsy()

    await wrapper.setProps({ title: 'test' })
    expect(wrapper.find('.ix-card-head-title').text()).toEqual('test')
  })

  test('titleSlot work', async () => {
    const wrapper = CardMount({ slots: { title: '<div class="title-slot"></div>' } })
    expect(wrapper.find('.title-slot').exists()).toBeTruthy()

    await wrapper.setProps({ title: 'test' })
    expect(wrapper.find('.ix-card-head-title').text()).not.toEqual('test')
  })

  test('extra work', async () => {
    const wrapper = CardMount()
    expect(wrapper.find('.ix-card-head-extra').exists()).toBeFalsy()

    await wrapper.setProps({ extra: 'More' })
    expect(wrapper.find('.ix-card-head-extra').text()).toEqual('More')
  })

  test('extraSlot work', async () => {
    const wrapper = CardMount({ slots: { extra: '<div class="extra-slot"></div>' } })
    expect(wrapper.find('.extra-slot').exists()).toBeTruthy()

    await wrapper.setProps({ extra: 'More' })
    expect(wrapper.find('.ix-card-head-extra').text()).not.toEqual('More')
  })

  test('footerSlot work', async () => {
    const wrapper = CardMount({ slots: { footer: '<div class="footer-slot"></div>' } })
    expect(wrapper.find('.footer-slot').exists()).toBeTruthy()
  })
})
