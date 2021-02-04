import { useGlobalConfig } from '@idux/components/core/config'

import { flushPromises, mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import { addIconDefinitions, fetchFromIconfont } from '../src/helper'
import IxIcon from '../src/Icon.vue'
import { IconProps, IconDefinition } from '../src/types'

const Up: IconDefinition = { name: 'up', svgString: '<svg></svg>' }
const Down: IconDefinition = { name: 'down', svgString: '<svg></svg>' }
const Loading: IconDefinition = { name: 'loading', svgString: '<svg></svg>' }

describe('Icon.vue', () => {
  let IconMount: (options?: MountingOptions<Partial<IconProps>>) => VueWrapper<InstanceType<DefineComponent<IconProps>>>

  beforeEach(() => {
    IconMount = (options = {}) => {
      return mount<IconProps>(IxIcon, {
        ...options,
      })
    }
  })

  test('render work', async () => {
    addIconDefinitions([Up])
    const wrapper = IconMount({ props: { name: 'up' } })
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('static load work', async () => {
    addIconDefinitions([Up, Down])
    const wrapper = IconMount({ props: { name: 'up' } })
    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('up')

    await wrapper.setProps({ name: 'down' })
    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('down')
  })

  test('dynamic load work', async () => {
    const loadIconDynamically = async (iconName: string) => `<svg data-icon="${iconName}"></svg>`

    const wrapper = mount({
      components: { IxIcon },
      template: `<IxIcon name="dynamic-up" />`,
      setup() {
        useGlobalConfig('icon', { loadIconDynamically })
      },
    })

    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('dynamic-up')

    await wrapper.setProps({ name: 'dynamic-down' })
    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('dynamic-down')
  })

  test('iconfont load work', async () => {
    fetchFromIconfont('https://at.alicdn.com/t/font_2269256_s10i6xhg8l.js')
    fetchFromIconfont([
      'https://at.alicdn.com/t/font_2269256_s10i6xhg8l.js',
      'https://at.alicdn.com/t/font_2269253_ogsttp6ftdp.js',
      'https://at.alicdn.com/t/font_2269256_s10i6xhg8l2.js',
    ])

    const wrapper = IconMount({ props: { name: 'ix-icon-up', iconfont: true } })
    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('ix-icon-up')

    await wrapper.setProps({ name: 'ix-icon-down' })
    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('ix-icon-down')

    await wrapper.setProps({ name: 'ix-icon-up' })
    await flushPromises()

    expect(wrapper.find('svg').attributes()['data-icon']).toEqual('ix-icon-up')
  })

  test('rotate work', async () => {
    addIconDefinitions([Up, Loading])
    const wrapper = IconMount({ props: { rotate: true } })

    expect(wrapper.classes()).toContain('ix-icon-spin')

    await wrapper.setProps({ name: 'up', rotate: 90 })
    await flushPromises()

    expect(wrapper.classes()).not.toContain('ix-icon-spin')
    expect(wrapper.find('svg').attributes()['style']).toEqual('transform: rotate(90deg)')

    await wrapper.setProps({ name: 'loading', rotate: '180' })
    await flushPromises()

    expect(wrapper.classes()).toContain('ix-icon-spin')
    expect(wrapper.find('svg').attributes()['style']).toEqual('transform: rotate(180deg)')
  })

  test('tag work', async () => {
    const wrapper = mount({
      components: { IxIcon },
      template: `<IxIcon @click="onClick"/>`,
      props: {
        onClick: { type: Function, default: () => void 0 },
      },
    })
    expect(wrapper.find('i').exists()).toBeFalsy()
    expect(wrapper.find('button').exists()).toBeTruthy()

    await wrapper.setProps({ onClick: null })

    expect(wrapper.find('i').exists()).toBeTruthy()
    expect(wrapper.find('button').exists()).toBeFalsy()

    await wrapper.setProps({ onClick: () => void 0 })

    expect(wrapper.find('i').exists()).toBeFalsy()
    expect(wrapper.find('button').exists()).toBeTruthy()
  })

  test('slot work', async () => {
    const wrapper = IconMount({
      slots: {
        default: Up.svgString,
      },
    })
    expect(wrapper.find('svg').exists()).toBeTruthy()
  })
})
