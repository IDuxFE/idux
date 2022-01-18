import { MountingOptions, flushPromises, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import { createGlobalConfig } from '@idux/components/config'

import IxIcon from '../src/Icon'
import { addIconDefinitions } from '../src/helper'
import { IconDefinition, IconProps } from '../src/types'

const MyUp: IconDefinition = { name: 'my-up', svg: '<svg></svg>' }
const MyDown: IconDefinition = { name: 'my-down', svg: '<svg></svg>' }

describe('Icon', () => {
  const IconMount = (options?: MountingOptions<Partial<IconProps>>) => mount(IxIcon, { ...options })

  renderWork<IconProps>(IxIcon, { props: { name: 'up' } })

  test('static load work', async () => {
    addIconDefinitions([MyUp, MyDown])

    const wrapper = IconMount({ props: { name: 'my-up' } })
    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('my-up')

    await wrapper.setProps({ name: 'my-down' })
    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('my-down')
  })

  test('dynamic load work', async () => {
    const loadIconDynamically = async (iconName: string) => `<svg data-icon="${iconName}"></svg>`
    const config = createGlobalConfig({ icon: { loadIconDynamically } })

    const wrapper = IconMount({
      props: { name: 'dynamic-up' },
      global: { plugins: [config] },
    })

    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('dynamic-up')

    await wrapper.setProps({ name: 'dynamic-down' })
    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('dynamic-down')
  })

  test('rotate work', async () => {
    const wrapper = IconMount({ props: { name: 'up', rotate: true } })

    expect(wrapper.classes()).toContain('ix-icon-spinning')

    await wrapper.setProps({ rotate: 90 })

    expect(wrapper.classes()).not.toContain('ix-icon-spinning')
    expect(wrapper.element.style.transform).toBe('rotate(90deg)')

    await wrapper.setProps({ rotate: '180' })

    expect(wrapper.element.style.transform).toBe('rotate(180deg)')
  })

  test('slot work', async () => {
    const wrapper = IconMount({ slots: { default: MyUp.svg } })

    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
