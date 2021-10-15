import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import Tab from '../src/Tab'
import Tabs from '../src/Tabs'
import { TabsProps } from '../src/types'

const defaultSlots = [
  h(Tab, { key: 'tab1' }, { default: () => '内容1' }),
  h(Tab, { key: 'tab2' }, { default: () => '内容2' }),
  h(Tab, { key: 'tab3' }, { default: () => '内容3' }),
]

describe('Tabs', () => {
  const TabsMount = (options?: MountingOptions<Partial<TabsProps>>) => {
    const { slots, ...rest } = options || {}
    const mergedOptions = {
      slots: { default: () => defaultSlots, ...slots },
      ...rest,
    } as MountingOptions<TabsProps>
    return mount(Tabs, mergedOptions)
  }

  renderWork<TabsProps>(Tabs)

  test('v-model:selectedKey work', async () => {
    const onUpdateSelectedKey = jest.fn()
    const onTabClick = jest.fn()
    const wrapper = TabsMount({
      props: {
        selectedKey: 'tab1',
        'onUpdate:selectedKey': onUpdateSelectedKey,
        onTabClick,
      },
    })

    expect(wrapper.findAll('.ix-tabs-nav-tab')[0].classes()).toContain('ix-tabs-nav-tab-selected')

    await wrapper.setProps({ selectedKey: 'tab2' })

    expect(wrapper.findAll('.ix-tabs-nav-tab')[0].classes()).not.toContain('ix-tabs-nav-tab-selected')

    await wrapper.find('.ix-tabs-nav-tab').trigger('click')

    expect(onUpdateSelectedKey).toBeCalledTimes(1)
    expect(onTabClick).toBeCalledTimes(1)
  })

  test('type work', async () => {
    const wrapper = TabsMount()

    expect(wrapper.classes()).toContain('ix-tabs-card')

    await wrapper.setProps({ type: 'line' })

    expect(wrapper.classes()).toContain('ix-tabs-line')

    await wrapper.setProps({ type: 'segment' })

    expect(wrapper.classes()).toContain('ix-tabs-segment')
  })

  test('mode work', async () => {
    const wrapper = TabsMount({
      props: {
        type: 'segment',
        mode: 'primary',
      },
    })

    expect(wrapper.classes()).toContain('ix-tabs-segment')
    expect(wrapper.classes()).toContain('ix-tabs-nav-primary')

    await wrapper.setProps({ type: 'card' })

    expect(wrapper.classes()).not.toContain('ix-tabs-nav-primary')
  })

  test('forceRender work', async () => {
    const wrapper = TabsMount({
      props: {
        selectedKey: 'tab1',
      },
    })

    expect(wrapper.findAll('.ix-tabs-pane').length).toBe(1)

    await wrapper.setProps({ forceRender: true })

    expect(wrapper.findAll('.ix-tabs-pane').length).toBe(3)
  })

  test('placement work', async () => {
    const wrapper = TabsMount({
      props: {
        type: 'line',
        placement: 'start',
      },
    })

    expect(wrapper.classes()).toContain('ix-tabs-nav-start')

    await wrapper.setProps({ type: 'card' })

    expect(wrapper.classes()).not.toContain('ix-tabs-nav-start')
  })

  test('only accept tab children work', async () => {
    const wrapper = TabsMount({
      props: {
        forceRender: true,
      },
      slots: {
        default: () => [h(Tab, {}, { title: () => '内容1' }), h('div', {}, { default: () => '内容2' })],
      },
    })

    expect(wrapper.findAll('.ix-tabs-nav-tab').length).toBe(1)
    expect(wrapper.findAll('.ix-tabs-pane').length).toBe(1)
  })

  describe('Tab', () => {
    test('title work', async () => {
      const wrapper = TabsMount({
        slots: {
          default: () => h(Tab, {}, { title: () => '内容1' }),
        },
      })

      expect(wrapper.find('.ix-tabs-nav-tab').text()).toBe('内容1')
    })

    test('disabled work', async () => {
      const wrapper = TabsMount({
        slots: {
          default: () => h(Tab, { disabled: true }, { tab: () => '内容1' }),
        },
      })

      expect(wrapper.find('.ix-tabs-nav-tab').classes()).toContain('ix-tabs-nav-tab-disabled')
    })

    test('forceRender work', async () => {
      const wrapper = TabsMount({
        props: {
          selectedKey: 'tab1',
        },
        slots: {
          default: () => [
            h(Tab, { key: 'tab1', forceRender: true }, { tab: () => '内容1' }),
            h(Tab, { key: 'tab2' }, { tab: () => '内容2' }),
          ],
        },
      })

      expect(wrapper.findAll('.ix-tabs-pane').length).toBe(1)

      await wrapper.setProps({ selectedKey: 'tab2' })

      expect(wrapper.findAll('.ix-tabs-pane').length).toBe(2)
    })
  })
})
