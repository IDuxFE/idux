import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork, wait } from '@tests'

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
    const onCopy = vi.fn()
    const wrapper = TextMount({ props: { copyable: true, onCopy } })

    expect(wrapper.html()).toMatchSnapshot()

    document.execCommand = vi.fn().mockReturnValue(true)
    await wrapper.find('.ix-text-copy-icon').trigger('click')

    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(onCopy).toBeCalledWith(true, defaultSlot())

    await wait(3000)
    await wrapper.setProps({ copyable: false })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('copyIcon work', async () => {
    const wrapper = TextMount({ props: { copyable: true, copyIcon: 'left' } })

    expect(wrapper.find('.ix-text-copy-icon .ix-icon').classes()).toContain('ix-icon-left')

    await wrapper.setProps({ copyIcon: ['left', 'right'] })

    expect(wrapper.find('.ix-text-copy-icon .ix-icon').classes()).toContain('ix-icon-left')
    await wrapper.find('.ix-text-copy-icon').trigger('click')

    expect(wrapper.find('.ix-text-copy-icon .ix-icon').classes()).toContain('ix-icon-right')

    await wrapper.setProps({
      copyIcon: ({ copied }: { copied: boolean }) => h('span', { class: `custom-${copied ? 'copied' : 'copy'}` }),
    })
    await wait(3000)

    expect(wrapper.find('.ix-text-copy-icon .custom-copy').exists()).toBeTruthy()
    await wrapper.find('.ix-text-copy-icon').trigger('click')

    expect(wrapper.find('.ix-text-copy-icon .custom-copied').exists()).toBeTruthy()
  })

  // 需要 E2E 测试
  test('expandable work', async () => {
    const onUpdateExpanded = vi.fn()
    const wrapper = TextMount({
      props: { ellipsis: { rows: 1, expandable: true }, 'onUpdate:expanded': onUpdateExpanded },
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.find('.ix-text-inner').trigger('click')

    expect(wrapper.html()).toMatchSnapshot()
    expect(onUpdateExpanded).toBeCalledWith(true)
  })

  // 需要 E2E 测试
  test.skip('expandIcon work', async () => {
    const wrapper = TextMount({
      props: { ellipsis: { rows: 1, expandable: true }, expandIcon: 'left', expanded: false },
    })

    expect(wrapper.find('.ix-text-expand-icon .ix-icon').classes()).toContain('ix-icon-left')

    await wrapper.setProps({ expandIcon: ['left', 'right'] })

    expect(wrapper.find('.ix-text-expand-icon .ix-icon').classes()).toContain('ix-icon-left')
    await wrapper.setProps({ expanded: true })

    expect(wrapper.find('.ix-text-expand-icon .ix-icon').classes()).toContain('ix-icon-right')

    await wrapper.setProps({
      expanded: false,
      expandIcon: ({ expanded }: { expanded: boolean }) =>
        h('span', { class: `custom-${expanded ? 'expanded' : 'expand'}` }),
    })

    expect(wrapper.find('.ix-text-expand-icon .custom-expand').exists()).toBeTruthy()
    await wrapper.setProps({ expanded: true })

    expect(wrapper.find('.ix-text-expand-icon .custom-expanded').exists()).toBeTruthy()
  })

  // 需要 E2E 测试
  test('ellipsis work', async () => {
    const wrapper = TextMount({ props: { ellipsis: { rows: 2 } } })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ ellipsis: undefined })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('tag work', async () => {
    const wrapper = TextMount({ props: { tag: 'div' } })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.ix-text-inner').element.tagName).toBe('DIV')

    await wrapper.setProps({ tag: undefined })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.ix-text-inner').element.tagName).toBe('SPAN')
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
