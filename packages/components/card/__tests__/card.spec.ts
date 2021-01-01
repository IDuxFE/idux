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

  test('bordered word', async () => {
    const wrapper = CardMount()
    expect(wrapper.classes()).not.toContain('ix-card-border')

    await wrapper.setProps({ border: false })
    expect(wrapper.classes()).toContain('ix-card-border')
  })

  test('hoverable word', async () => {
    const wrapper = CardMount()
    expect(wrapper.classes()).not.toContain('ix-card-hover')

    await wrapper.setProps({ hoverable: false })
    expect(wrapper.classes()).toContain('ix-card-hover')
  })

  test.only('loading work', async () => {
    const wrapper = CardMount()
    expect(wrapper.classes()).not.toContain('ix-card-loading-block')
    expect(wrapper.classes()).toContain('ix-card-wraper')

    await wrapper.setProps({ loadding: true })
    expect(wrapper.classes()).toContain('ix-card-loading-block')
    expect(wrapper.classes()).not.toContain('ix-card-wraper')
  })

  test('size work', async () => {
    const wrapper = CardMount({ props: { size: 'large' } })

    expect(wrapper.classes()).toContain('ix-card-large')

    await wrapper.setProps({ size: 'small' })

    expect(wrapper.classes()).not.toContain('ix-card-large')
    expect(wrapper.classes()).toContain('ix-card-small')
  })

  test('title work', async () => {
    const wrapper = CardMount()
    expect(wrapper.find('.ix-card__head__title').exists()).toBeFalsy()

    await wrapper.setProps({ title: 'test' })
    expect(wrapper.find('.ix-card__head__title').text()).toEqual('test')
  })

  test('titleSlot work', async () => {
    const wrapper = CardMount({ slots: { title: '<div class="title-slot"></div>' } })
    expect(wrapper.find('.title-slot').exists()).toBeTruthy()

    await wrapper.setProps({ title: 'test' })
    expect(wrapper.find('.ix-card__head__title').text()).not.toEqual('test')
  })

  test('extra work', async () => {
    const wrapper = CardMount()
    expect(wrapper.find('.ix-card__head__extra').exists()).toBeFalsy()

    await wrapper.setProps({ title: 'More' })
    expect(wrapper.find('.ix-card__head__extra').text()).toEqual('More')
  })

  test('extraSlot work', async () => {
    const wrapper = CardMount({ slots: { title: '<div class="extra-slot"></div>' } })
    expect(wrapper.find('.extra-slot').exists()).toBeTruthy()

    await wrapper.setProps({ title: 'More' })
    expect(wrapper.find('.ix-card__head__extra').text()).not.toEqual('More')
  })

  test('extraEmit work', () => {
    const wrapper = CardMount({ slots: { title: '<div class="extra-slot"></div>' } })

    wrapper.vm.$emit('onExtraClicked', 'test')
    expect(wrapper.emitted().onExtraClicked).toEqual('test')
  })
})
