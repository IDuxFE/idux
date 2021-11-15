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
    const wrapper = SpaceMount()

    expect(wrapper.classes()).toContain('ix-space-align-center')

    await wrapper.setProps({ align: 'start' })

    expect(wrapper.classes()).toContain('ix-space-align-start')

    await wrapper.setProps({ align: 'center' })

    expect(wrapper.classes()).toContain('ix-space-align-center')

    await wrapper.setProps({ align: 'end' })

    expect(wrapper.classes()).toContain('ix-space-align-end')

    await wrapper.setProps({ align: 'baseline' })

    expect(wrapper.classes()).toContain('ix-space-align-baseline')
  })

  test('direction work', async () => {
    const wrapper = SpaceMount()

    expect(wrapper.classes()).toContain('ix-space-horizontal')

    await wrapper.setProps({ direction: 'vertical' })

    expect(wrapper.classes()).toContain('ix-space-vertical')
  })

  test('gap work', async () => {
    const wrapper = SpaceMount()

    const wrapperElement = wrapper.element as HTMLElement
    const itemElements = wrapper.findAll('.ix-space-item').map(item => item.element as HTMLElement)

    expect(wrapperElement.style.marginBottom).toBe('-8px')
    expect(itemElements[0].style.marginRight).toBe('8px')
    expect(itemElements[0].style.paddingBottom).toEqual('8px')
    expect(itemElements[1].style.marginRight).toBe('8px')
    expect(itemElements[1].style.paddingBottom).toEqual('8px')
    expect(itemElements[2].style.marginRight).toBe('')
    expect(itemElements[2].style.paddingBottom).toEqual('8px')

    await wrapper.setProps({ gap: 16 })

    expect(wrapperElement.style.marginBottom).toBe('-16px')
    expect(itemElements[0].style.marginRight).toBe('16px')
    expect(itemElements[0].style.paddingBottom).toEqual('16px')
    expect(itemElements[1].style.marginRight).toBe('16px')
    expect(itemElements[1].style.paddingBottom).toEqual('16px')
    expect(itemElements[2].style.marginRight).toBe('')
    expect(itemElements[2].style.paddingBottom).toEqual('16px')

    await wrapper.setProps({ gap: `24px` })

    expect(wrapperElement.style.marginBottom).toBe('-24px')
    expect(itemElements[0].style.marginRight).toBe('24px')
    expect(itemElements[0].style.paddingBottom).toEqual('24px')
    expect(itemElements[1].style.marginRight).toBe('24px')
    expect(itemElements[1].style.paddingBottom).toEqual('24px')
    expect(itemElements[2].style.marginRight).toBe('')
    expect(itemElements[2].style.paddingBottom).toEqual('24px')

    await wrapper.setProps({ gap: [8, 16] })

    expect(wrapperElement.style.marginBottom).toBe('-16px')
    expect(itemElements[0].style.marginRight).toBe('8px')
    expect(itemElements[0].style.paddingBottom).toEqual('16px')
    expect(itemElements[1].style.marginRight).toBe('8px')
    expect(itemElements[1].style.paddingBottom).toEqual('16px')
    expect(itemElements[2].style.marginRight).toBe('')
    expect(itemElements[2].style.paddingBottom).toEqual('16px')
  })

  test('split work', async () => {
    const wrapper = SpaceMount({ props: { split: '/' } })

    expect(wrapper.findAll('.ix-space-item-split').length).toBe(2)
    expect(wrapper.find('.ix-space-item-split').text()).toBe('/')

    await wrapper.setProps({ split: '-' })

    expect(wrapper.find('.ix-space-item-split').text()).toBe('-')
  })

  test('wrap work', async () => {
    const wrapper = SpaceMount()

    expect(wrapper.classes()).toContain('ix-space-wrap')

    await wrapper.setProps({ wrap: false })
    expect(wrapper.classes()).not.toContain('ix-space-wrap')
  })
})
