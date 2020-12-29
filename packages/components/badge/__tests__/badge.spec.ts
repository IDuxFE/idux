import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import Badge from '../src/Badge.vue'
import { BadgeProps } from '../src/types'

describe('Badge.vue', () => {
  let BadgeMount: (
    options?: MountingOptions<Partial<BadgeProps>>,
  ) => VueWrapper<InstanceType<DefineComponent<BadgeProps>>>

  beforeEach(() => {
    BadgeMount = (options = {}) => {
      return mount<BadgeProps>(Badge, {
        ...options,
      })
    }
  })

  test('render work', () => {
    const wrapper = BadgeMount()
    expect(wrapper.html()).toMatchSnapshot()
  })

  // 基本功能测试
  test('count work', async () => {
    const wrapper = BadgeMount({ props: { count: 10 } })
    const badge = wrapper.find('.ix-badge')
    expect(badge.text()).toBe('10')
    expect(badge.html()).toMatchSnapshot()
    await wrapper.setProps({ count: '50' })
    expect(badge.text()).toBe('50')
    expect(badge.html()).toMatchSnapshot()
    await wrapper.setProps({ count: '1-1' })
    expect(badge.text()).toBe('1-1')
    expect(badge.html()).toMatchSnapshot()
  })

  // 是否显示0
  test('showZero work', async () => {
    const wrapper = BadgeMount({ props: { count: 0 } })
    const badge = wrapper.find('.ix-badge')
    expect(badge.classes()).toContain('ix-badge-hide-zero')
    expect(badge.text()).toBe('')
    expect(badge.html()).toMatchSnapshot()
    await wrapper.setProps({ showZero: true })
    expect(badge.classes()).not.toContain('ix-badge-hide-zero')
    expect(badge.text()).toBe('0')
    expect(badge.html()).toMatchSnapshot()
  })

  // 超出的数据显示
  test('overflowCount work', async () => {
    const wrapper = BadgeMount({ props: { count: 100 } })
    const badge = wrapper.find('.ix-badge')
    expect(badge.text()).toBe('99+')
    expect(badge.html()).toMatchSnapshot()
    await wrapper.setProps({ count: '1000', overflowCount: 999 })
    expect(badge.text()).toBe('999+')
    expect(badge.html()).toMatchSnapshot()
  })

  // 圆点徽标呈现
  test('dot work', async () => {
    const wrapper = BadgeMount()
    const badge = wrapper.find('.ix-badge')
    expect(badge.classes()).not.toContain('ix-badge-dot')
    expect(badge.html()).toMatchSnapshot()
    await wrapper.setProps({ dot: true })
    expect(badge.classes()).toContain('ix-badge-dot')
    expect(badge.text()).toBe('')
    expect(badge.html()).toMatchSnapshot()
  })

  // 设置颜色属性
  test('color work', async () => {
    const wrapper = BadgeMount({ props: { color: '#f00' } })
    const badge = wrapper.find('.ix-badge')
    expect(badge.attributes().style).toContain('background-color: rgb(255, 0, 0)')
    expect(badge.html()).toMatchSnapshot()
  })

  // 自定义插槽
  test('count slot work', async () => {
    const wrapper = BadgeMount({ slots: { count: '<div class="count-slot"></div>' } })
    const countSlot = wrapper.find('.count-slot')
    expect(countSlot.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
