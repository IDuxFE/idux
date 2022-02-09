import { MountingOptions, mount } from '@vue/test-utils'
import { createTextVNode, h } from 'vue'

import { renderWork } from '@tests'

import { IxButton } from '@idux/components/button'

import Space from '../src/Space'
import { SpaceProps } from '../src/types'

const defaultSlots = () => {
  return [createTextVNode('Space'), h(IxButton, { mode: 'primary' }, () => 'Button'), h(IxButton, {}, () => 'Button')]
}

describe('Space', () => {
  const SpaceMount = (options?: MountingOptions<Partial<SpaceProps>>) => {
    const { slots, ...rest } = options || {}
    return mount(Space, {
      ...rest,
      slots: { default: defaultSlots, ...slots },
    })
  }

  renderWork<SpaceProps>(Space, { slots: { default: defaultSlots } })

  test('align work', async () => {
    const wrapper = SpaceMount({ props: { align: 'start' } })

    expect(wrapper.classes()).toContain('ix-space-align-start')

    await wrapper.setProps({ align: 'end' })

    expect(wrapper.classes()).toContain('ix-space-align-end')
  })

  test('block work', async () => {
    const wrapper = SpaceMount({ props: { block: true } })

    expect(wrapper.classes()).toContain('ix-space-block')

    await wrapper.setProps({ block: false })

    expect(wrapper.classes()).not.toContain('ix-space-block')
  })

  test('justify work', async () => {
    const wrapper = SpaceMount({ props: { justify: 'start' } })

    expect(wrapper.classes()).toContain('ix-space-justify-start')

    await wrapper.setProps({ justify: 'end' })

    expect(wrapper.classes()).toContain('ix-space-justify-end')
  })

  test('size work', async () => {
    const wrapper = SpaceMount({ props: { size: 'sm' } })

    const wrapperElement = wrapper.element as HTMLElement
    const itemElements = wrapper.findAll('.ix-space-item').map(item => item.element as HTMLElement)

    expect(wrapperElement.style.marginBottom).toBe('-8px')
    expect(itemElements[0].style.marginRight).toBe('8px')
    expect(itemElements[0].style.paddingBottom).toEqual('8px')
    expect(itemElements[1].style.marginRight).toBe('8px')
    expect(itemElements[1].style.paddingBottom).toEqual('8px')
    expect(itemElements[2].style.marginRight).toBe('')
    expect(itemElements[2].style.paddingBottom).toEqual('8px')

    await wrapper.setProps({ size: 'md' })

    expect(wrapperElement.style.marginBottom).toBe('-16px')
    expect(itemElements[0].style.marginRight).toBe('16px')
    expect(itemElements[0].style.paddingBottom).toEqual('16px')
    expect(itemElements[1].style.marginRight).toBe('16px')
    expect(itemElements[1].style.paddingBottom).toEqual('16px')
    expect(itemElements[2].style.marginRight).toBe('')
    expect(itemElements[2].style.paddingBottom).toEqual('16px')

    await wrapper.setProps({ size: 30 })

    expect(wrapperElement.style.marginBottom).toBe('-30px')
    expect(itemElements[0].style.marginRight).toBe('30px')
    expect(itemElements[0].style.paddingBottom).toEqual('30px')
    expect(itemElements[1].style.marginRight).toBe('30px')
    expect(itemElements[1].style.paddingBottom).toEqual('30px')
    expect(itemElements[2].style.marginRight).toBe('')
    expect(itemElements[2].style.paddingBottom).toEqual('30px')

    await wrapper.setProps({ size: [16, 8] })

    expect(wrapperElement.style.marginBottom).toBe('-16px')
    expect(itemElements[0].style.marginRight).toBe('8px')
    expect(itemElements[0].style.paddingBottom).toEqual('16px')
    expect(itemElements[1].style.marginRight).toBe('8px')
    expect(itemElements[1].style.paddingBottom).toEqual('16px')
    expect(itemElements[2].style.marginRight).toBe('')
    expect(itemElements[2].style.paddingBottom).toEqual('16px')
  })

  test('separator work', async () => {
    const wrapper = SpaceMount({ props: { separator: '/' } })

    expect(wrapper.findAll('.ix-space-item-separator').length).toBe(2)
    expect(wrapper.find('.ix-space-item-separator').text()).toBe('/')

    await wrapper.setProps({ separator: '-' })

    expect(wrapper.find('.ix-space-item-separator').text()).toBe('-')
  })

  test('vertical work', async () => {
    const wrapper = SpaceMount({ props: { vertical: true } })

    expect(wrapper.classes()).toContain('ix-space-vertical')

    await wrapper.setProps({ vertical: false })

    expect(wrapper.classes()).not.toContain('ix-space-vertical')
  })

  test('wrap work', async () => {
    const wrapper = SpaceMount({ props: { wrap: false } })

    expect(wrapper.classes()).toContain('ix-space-nowrap')

    await wrapper.setProps({ wrap: true })

    expect(wrapper.classes()).not.toContain('ix-space-nowrap')
  })
})
