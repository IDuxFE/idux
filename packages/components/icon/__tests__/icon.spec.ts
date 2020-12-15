import { useGlobalConfig } from '@idux/components/core/config'
import { flushPromises, mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import { addIconDefinitions, fetchFromIconfont } from '../src/helper'
import Icon from '../src/Icon.vue'
import { IconProps, IconDefinition } from '../src/types'

const Up: IconDefinition = {
  name: 'up',
  svgString:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M265.827 617.592l224.22-224.219c12.497-12.497 32.758-12.497 45.255 0l222.871 222.871c12.496 12.496 12.496 32.758 0 45.254-12.497 12.497-32.758 12.497-45.255 0L521.725 470.306c-4.999-4.999-13.103-4.999-18.102 0L311.082 662.847c-12.497 12.497-32.758 12.497-45.255 0-12.496-12.497-12.496-32.758 0-45.255z"/></svg>',
}

const Down: IconDefinition = {
  name: 'down',
  svgString:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M265.827 438.627l224.22 224.22c12.497 12.496 32.758 12.496 45.255 0l222.871-222.871c12.496-12.497 12.496-32.758 0-45.255-12.497-12.497-32.758-12.497-45.255 0L521.725 585.914c-4.999 4.998-13.103 4.998-18.102 0L311.082 393.373c-12.497-12.497-32.758-12.497-45.255 0-12.496 12.496-12.496 32.758 0 45.254z"/></svg>',
}

describe('Icon.vue', () => {
  let IconMount: (options?: MountingOptions<Partial<IconProps>>) => VueWrapper<InstanceType<DefineComponent<IconProps>>>

  beforeEach(() => {
    IconMount = (options = {}) => {
      return mount<IconProps>(Icon, {
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
    const loadIconDynamically = async (iconName: string) => {
      if (iconName === 'dynamic-up') {
        return Up.svgString
      } else if (iconName === 'dynamic-down') {
        return Down.svgString
      } else {
        return ''
      }
    }

    const wrapper = mount({
      components: { Icon },
      template: `<Icon name="dynamic-up" />`,
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
    jest.runAllTimers()

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
    addIconDefinitions([Up])
    const wrapper = IconMount({ props: { rotate: true } })

    expect(wrapper.classes()).toContain('ix-icon-spin')

    await wrapper.setProps({ name: 'up', rotate: 90 })
    await flushPromises()

    expect(wrapper.classes()).not.toContain('ix-icon-spin')
    expect(wrapper.find('svg').attributes()['style']).toEqual('transform: rotate(90deg)')

    await wrapper.setProps({ rotate: '180' })

    expect(wrapper.find('svg').attributes()['style']).toEqual('transform: rotate(180deg)')
  })

  test('tag work', async () => {
    const wrapper = mount({
      components: { Icon },
      template: `<Icon @click="onClick"/>`,
      props: {
        onClick: { type: Function, default: () => void 0 },
      },
    })
    expect(wrapper.find('i').exists()).toBeFalsy()
    expect(wrapper.find('button').exists()).toBeTruthy()

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
    await flushPromises()
    expect(wrapper.find('svg').exists()).toBeTruthy()
  })
})
