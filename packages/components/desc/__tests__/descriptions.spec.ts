import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import Desc from '../src/Desc'
import DescItem from '../src/DescItem'
import { DescProps } from '../src/types'

const defaultSlot = () => [
  h(DescItem, { label: 'A' }, () => 'aaa'),
  h(DescItem, { label: 'B' }, () => 'bbb'),
  h(DescItem, { label: 'C' }, () => 'ccc'),
  h(DescItem, { label: 'D' }, () => 'ddd'),
  h(DescItem, { label: 'E' }, () => 'eee'),
  h(DescItem, { label: 'F' }, () => 'fff'),
  h(DescItem, { label: 'G', col: 2, colonless: true, labelAlign: 'start', labelWidth: '120px' }, () => 'ggg'),
]

describe('Desc', () => {
  const DescMount = (options?: MountingOptions<Partial<DescProps>>) => {
    const { slots, ...reset } = options || {}
    return mount(Desc, { ...(reset as MountingOptions<DescProps>), slots: { default: defaultSlot, ...slots } })
  }

  renderWork<DescProps>(Desc, {
    props: {},
    slots: { default: defaultSlot },
  })

  test('col work', async () => {
    const wrapper = DescMount({ props: { col: 3 } })

    const allItems = wrapper.findAllComponents(DescItem)

    expect(allItems[0].classes()).toContain('ix-col-span-8')
    expect(allItems[6].classes()).toContain('ix-col-span-16')

    await wrapper.setProps({ col: 4 })

    expect(allItems[0].classes()).toContain('ix-col-span-6')
    expect(allItems[6].classes()).toContain('ix-col-span-12')
  })

  test('colonless work', async () => {
    const wrapper = DescMount({ props: { colonless: true } })

    const allItems = wrapper.findAllComponents(DescItem)

    expect(allItems[0].find('.ix-desc-item-label').classes()).not.toContain('ix-desc-item-label-colon')
    expect(allItems[6].find('.ix-desc-item-label').classes()).not.toContain('ix-desc-item-label-colon')

    await wrapper.setProps({ colonless: false })

    expect(allItems[0].find('.ix-desc-item-label').classes()).toContain('ix-desc-item-label-colon')
    expect(allItems[6].find('.ix-desc-item-label').classes()).not.toContain('ix-desc-item-label-colon')
  })

  test('header work', async () => {
    const wrapper = DescMount({ props: { header: '哈哈哈' } })

    expect(wrapper.find('.ix-header-title').text()).toBe('哈哈哈')

    await wrapper.setProps({ header: { title: '嘿嘿嘿', suffix: 'setting' } })

    expect(wrapper.find('.ix-header-title').text()).toBe('嘿嘿嘿')
    expect(wrapper.find('.ix-header-suffix').find('.ix-icon-setting').exists()).toBe(true)
  })

  test('labelAlign work', async () => {
    const wrapper = DescMount({ props: { labelAlign: 'start' } })

    const allItems = wrapper.findAllComponents(DescItem)

    expect(allItems[0].find('.ix-desc-item-label').classes()).toContain('ix-desc-item-label-start')
    expect(allItems[6].find('.ix-desc-item-label').classes()).toContain('ix-desc-item-label-start')

    await wrapper.setProps({ labelAlign: 'end' })

    expect(allItems[0].find('.ix-desc-item-label').classes()).not.toContain('ix-desc-item-label-start')
    expect(allItems[6].find('.ix-desc-item-label').classes()).toContain('ix-desc-item-label-start')
  })

  test('labelWidth work', async () => {
    const wrapper = DescMount({ props: { labelWidth: '80px' } })

    const allItems = wrapper.findAllComponents(DescItem)

    expect(allItems[0].find('label').element.style.width).toBe('80px')
    expect(allItems[6].find('label').element.style.width).toBe('120px')

    await wrapper.setProps({ labelWidth: 99 })

    expect(allItems[0].find('label').element.style.width).toBe('99px')
    expect(allItems[6].find('label').element.style.width).toBe('120px')
  })

  test('layout work', async () => {
    const wrapper = DescMount({ props: { layout: 'vertical' } })

    expect(wrapper.classes()).toContain('ix-desc-vertical')

    await wrapper.setProps({ layout: 'horizontal' })

    expect(wrapper.classes()).not.toContain('ix-desc-vertical')
  })

  test('size work', async () => {
    const wrapper = DescMount({ props: { size: 'sm' } })

    expect(wrapper.classes()).toContain('ix-desc-sm')

    await wrapper.setProps({ size: 'lg' })

    expect(wrapper.classes()).toContain('ix-desc-lg')
  })
})
