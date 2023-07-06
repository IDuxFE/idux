import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import Text from '../src/Text'
import { TextProps } from '../src/types'

const defaultSlot =
  () => `@idux 是一套企业级中后台 UI 组件库, 致力于提供高效愉悦的开发体验。 基于 Vue 3.x + TypeScript 开发,
      全部代码开源并遵循 MIT 协议，任何企业、组织及个人均可免费使用。`

describe('Text', () => {
  const TextMount = (options?: MountingOptions<Partial<TextProps>>) => {
    const { slots } = options || {}
    return mount(Text, { ...(options as MountingOptions<TextProps>), slots: { default: defaultSlot, ...slots } })
  }

  renderWork<TextProps>(Text, {
    slots: { default: defaultSlot },
  })

  test('copyable work', async () => {
    const wrapper = TextMount({ props: { copyable: true } })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.classes()).toContain('ix-text-wrapper')

    document.execCommand = vi.fn().mockReturnValue(true)
    await wrapper.find('.ix-text-copy-icon').trigger('click')

    expect(document.execCommand).toHaveBeenCalledWith('copy')

    await wrapper.setProps({ copyable: false })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.classes()).not.toContain('ix-text-wrapper')
    expect(wrapper.classes()).toContain('ix-text')
  })

  // 需要 E2E 测试
  test('expandable work', async () => {
    const wrapper = TextMount({ props: { lineClamp: 2, expandable: true } })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.trigger('click')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('lineClamp work', async () => {
    const wrapper = TextMount({ props: { lineClamp: 2 } })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.classes()).toContain('ix-text-line-clamp')

    await wrapper.setProps({ lineClamp: undefined })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.classes()).not.toContain('ix-text-line-clamp')
  })

  test('tag work', async () => {
    const wrapper = TextMount({ props: { tag: 'div' } })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.element.tagName).toBe('DIV')

    await wrapper.setProps({ tag: undefined })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  test('tooltip work', async () => {
    const wrapper = TextMount({ props: { tooltip: 'native' } })

    // 无效
    await wrapper.trigger('mouseenter')

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ tooltip: true })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ tooltip: false })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
