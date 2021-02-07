import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import { renderWork } from '@tests'
import IxTitle from '../src/Title.vue'
import { TitleProps } from '../src/types'

describe('Title.vue', () => {
  let TitleMount: (
    options?: MountingOptions<Partial<TitleProps>>,
  ) => VueWrapper<InstanceType<DefineComponent<TitleProps>>>

  beforeEach(() => {
    TitleMount = (options = {}) => {
      return mount<TitleProps>(IxTitle, {
        ...options,
      })
    }
  })

  renderWork(IxTitle)

  test('title work', async () => {
    const wrapper = TitleMount({ props: { title: 'title' } })

    expect(wrapper.find('.ix-title-content').text()).toBe('title')

    await wrapper.setProps({ title: 'change title' })

    expect(wrapper.find('.ix-title-content').text()).toBe('change title')
  })

  test('title slot work', async () => {
    const wrapper = TitleMount({ props: { title: 'title' }, slots: { default: 'slot title' } })

    expect(wrapper.find('.ix-title-content').text()).toBe('slot title')
  })

  test('subTitle work', async () => {
    const wrapper = TitleMount({ props: { subTitle: 'subTitle' } })

    expect(wrapper.find('.ix-title-sub').text()).toBe('subTitle')

    await wrapper.setProps({ subTitle: 'change subTitle' })

    expect(wrapper.find('.ix-title-sub').text()).toBe('change subTitle')
  })

  test('subTitle slot work', async () => {
    const wrapper = TitleMount({ props: { subTitle: 'subTitle' }, slots: { subTitle: 'slot subTitle' } })

    expect(wrapper.find('.ix-title-sub').text()).toBe('slot subTitle')
  })

  test('extra work', async () => {
    const onExtraClick = jest.fn()
    const wrapper = TitleMount({
      props: { extra: 'up' },
      attrs: {
        onExtraClick,
      },
    })

    expect(wrapper.find('.ix-title-extra').exists()).toBe(true)

    await wrapper.find('.ix-icon-up').trigger('click')

    expect(onExtraClick).toBeCalledTimes(1)

    await wrapper.setProps({ extra: ['up', 'down'] })

    expect(wrapper.findAll('.ix-icon').length).toBe(2)
    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)

    await wrapper.find('.ix-icon-down').trigger('click')

    expect(onExtraClick).toBeCalledTimes(2)
  })

  test('extra slot work', async () => {
    const wrapper = TitleMount({
      props: { extra: 'up' },
      slots: { extra: '<span class="test-slot-extra">extra</span>' },
    })

    expect(wrapper.find('.test-slot-extra').exists()).toBe(true)
  })

  test('size work', async () => {
    const wrapper = TitleMount({ props: { size: 'extraLarge', title: 'title' } })

    expect(wrapper.classes()).toContain('ix-title-extraLarge')

    await wrapper.setProps({ size: undefined })

    expect(wrapper.classes()).toContain('ix-title-large')

    await wrapper.setProps({ size: 'medium' })

    expect(wrapper.classes()).toContain('ix-title-medium')

    await wrapper.setProps({ size: 'small' })

    expect(wrapper.classes()).toContain('ix-title-small')
  })

  test('prefix work', async () => {
    const onPrefixClick = jest.fn()
    const wrapper = TitleMount({
      props: { prefix: 'up' },
      attrs: {
        onPrefixClick,
      },
    })

    expect(wrapper.find('.ix-title-prefix').exists()).toBe(true)

    await wrapper.find('.ix-icon-up').trigger('click')

    expect(onPrefixClick).toBeCalledTimes(1)

    await wrapper.setProps({ prefix: 'down' })

    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)

    await wrapper.find('.ix-icon-down').trigger('click')

    expect(onPrefixClick).toBeCalledTimes(2)
  })

  test('prefix slot work', async () => {
    const wrapper = TitleMount({
      props: { prefix: 'up' },
      slots: { prefix: '<span class="test-slot-prefix">prefix</span>' },
    })

    expect(wrapper.find('.test-slot-prefix').exists()).toBe(true)
  })
})
