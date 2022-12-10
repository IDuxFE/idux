import { MountingOptions, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork, wait } from '@tests'

import { IxLayoutSiderTrigger } from '@idux/components/layout'
import { type MenuData } from '@idux/components/menu'

import ProLayout from '../src/Layout'
import LayoutSider from '../src/contents/Sider'
import { ProLayoutProps } from '../src/types'

const dataSource: MenuData[] = [
  {
    type: 'sub',
    key: 'sub1',
    icon: 'setting',
    label: 'Sub Menu 1',
    children: [
      { type: 'item', key: 'item4', label: 'Item 4', icon: 'setting', disabled: true },
      { type: 'item', key: 'item5', label: 'Item 5', icon: 'setting' },
      { type: 'divider', key: 'divider2' },
      {
        type: 'sub',
        key: 'sub2',
        icon: 'setting',
        label: 'Menu Sub 2',
        children: [
          { type: 'item', key: 'item6', label: 'Item 6' },
          { type: 'item', key: 'item7', label: 'Item 7' },
        ],
      },
      {
        type: 'sub',
        key: 'sub3',
        icon: 'setting',
        label: 'Menu Sub 3',
        children: [
          { type: 'item', key: 'item8', label: 'Item 8' },
          { type: 'item', key: 'item9', label: 'Item 9' },
        ],
      },
    ],
  },
  {
    type: 'sub',
    key: 'sub4',
    icon: 'github',
    label: 'Menu Sub 4',
    children: [
      { type: 'item', key: 'item10', label: 'Item 10' },
      { type: 'item', key: 'item11', label: 'Item 11' },
    ],
  },
  { type: 'item', key: 'item12', icon: 'mail', label: 'Item 12' },
]

const defaultSelectedSubLabel = 'Sub Menu 1'
const defaultSelectedItemLabel = 'Item 5'
const defaultContent = 'This is page content'

describe('ProLayout', () => {
  const ProLayoutMount = (options?: MountingOptions<Partial<ProLayoutProps>>) => {
    const { props, slots, ...rest } = options || {}
    const _options = {
      props: {
        menus: dataSource,
        ...props,
      },
      slots: {
        default: () => defaultContent,
        ...slots,
      },
      ...rest,
    } as MountingOptions<ProLayoutProps>
    return mount(ProLayout, { ..._options })
  }

  renderWork<ProLayoutProps>(ProLayout, {
    props: { menus: dataSource },
    slots: { default: () => defaultContent },
  })

  test('v-model:activeKey work', async () => {
    const onUpdateActiveKey = vi.fn()
    const wrapper = ProLayoutMount({
      props: { 'onUpdate:activeKey': onUpdateActiveKey },
    })

    expect(wrapper.find('.ix-pro-layout-header').find('.ix-menu-item-selected').text()).toBe(defaultSelectedSubLabel)
    expect(wrapper.find('.ix-pro-layout-sider').find('.ix-menu-item-selected').text()).toBe(defaultSelectedItemLabel)

    await wrapper.setProps({ activeKey: 'item7' })

    expect(wrapper.find('.ix-pro-layout-sider').find('.ix-menu-item-selected').text()).toBe('Item 7')

    const items = await wrapper.find('.ix-pro-layout-sider').findAll('.ix-menu-item')
    await items[items.length - 1].trigger('click')

    expect(onUpdateActiveKey).toBeCalled()
  })

  test('v-model:collapsed work', async () => {
    const onUpdateCollapsed = vi.fn()
    const wrapper = ProLayoutMount({
      props: { collapsed: true, 'onUpdate:collapsed': onUpdateCollapsed },
      slots: {
        siderFooter: () => h(IxLayoutSiderTrigger),
      },
    })

    expect(wrapper.find('.ix-layout-sider-collapsed').exists()).toBe(true)

    await wrapper.setProps({ collapsed: false })

    expect(wrapper.find('.ix-layout-sider-collapsed').exists()).toBe(false)

    await wrapper.findComponent(IxLayoutSiderTrigger).find('button').trigger('click')

    expect(onUpdateCollapsed).toBeCalledWith(true, 'trigger')
  })

  test('compress work', async () => {
    const wrapper = ProLayoutMount({})
    await flushPromises()

    expect(wrapper.classes()).not.toContain('ix-layout-float-sider')

    await wrapper.setProps({ compress: false })

    expect(wrapper.classes()).toContain('ix-layout-float-sider')

    await wrapper.setProps({ compress: true })

    expect(wrapper.classes()).not.toContain('ix-layout-float-sider')
  })

  test('collapsedDelay work', async () => {
    const onUpdateCollapsed = vi.fn()
    const wrapper = ProLayoutMount({
      props: {
        siderHover: { delay: 10 },
        collapsed: true,
        'onUpdate:collapsed': onUpdateCollapsed,
      },
    })
    await flushPromises()

    expect(wrapper.find('.ix-layout-sider-collapsed').exists()).toBe(true)

    await wrapper.findComponent(LayoutSider).trigger('pointerenter')

    expect(onUpdateCollapsed).not.toBeCalled()

    await wait(10)

    expect(onUpdateCollapsed).toBeCalledWith(false, 'pointer')
  })

  test('menus work', async () => {
    const wrapper = ProLayoutMount({
      props: { menus: [] },
    })

    expect(wrapper.find('.ix-menu-item').exists()).toBe(false)

    await wrapper.setProps({ menus: dataSource })

    expect(wrapper.find('.ix-menu-item').exists()).toBe(true)
  })

  test('theme work', async () => {
    const wrapper = ProLayoutMount()

    expect(wrapper.find('.ix-pro-layout-header').classes()).toContain('ix-pro-layout-header-dark')
    expect(wrapper.find('.ix-pro-layout-sider').classes()).toContain('ix-pro-layout-sider-light')

    await wrapper.setProps({ theme: 'dark' })

    expect(wrapper.find('.ix-pro-layout-header').classes()).toContain('ix-pro-layout-header-dark')
    expect(wrapper.find('.ix-pro-layout-sider').classes()).toContain('ix-pro-layout-sider-dark')

    await wrapper.setProps({ theme: 'light' })

    expect(wrapper.find('.ix-pro-layout-header').classes()).toContain('ix-pro-layout-header-light')
    expect(wrapper.find('.ix-pro-layout-sider').classes()).toContain('ix-pro-layout-sider-light')

    await wrapper.setProps({ theme: { header: 'light', sider: 'dark' } })

    expect(wrapper.find('.ix-pro-layout-header').classes()).toContain('ix-pro-layout-header-light')
    expect(wrapper.find('.ix-pro-layout-sider').classes()).toContain('ix-pro-layout-sider-dark')
  })

  test('type work', async () => {
    const wrapper = ProLayoutMount()

    expect(wrapper.classes()).toContain('ix-pro-layout-is-both')
    expect(wrapper.find('.ix-pro-layout-header').exists()).toBe(true)
    expect(wrapper.find('.ix-pro-layout-sider').exists()).toBe(true)

    await wrapper.setProps({ type: 'mixin' })

    expect(wrapper.classes()).toContain('ix-pro-layout-is-mixin')
    expect(wrapper.find('.ix-pro-layout-header').exists()).toBe(true)
    expect(wrapper.find('.ix-pro-layout-sider').exists()).toBe(true)

    await wrapper.setProps({ type: 'header' })

    expect(wrapper.classes()).toContain('ix-pro-layout-is-header')
    expect(wrapper.find('.ix-pro-layout-header').exists()).toBe(true)
    expect(wrapper.find('.ix-pro-layout-sider').exists()).toBe(false)

    await wrapper.setProps({ type: 'sider' })

    expect(wrapper.classes()).toContain('ix-pro-layout-is-sider')
    expect(wrapper.find('.ix-pro-layout-header').exists()).toBe(false)
    expect(wrapper.find('.ix-pro-layout-sider').exists()).toBe(true)
  })

  test('logo work', async () => {
    const wrapper = ProLayoutMount()

    expect(wrapper.find('.ix-pro-layout-logo').exists()).toBe(false)

    await wrapper.setProps({
      logo: {
        image: '../assets/1.png',
        title: 'Pro Layout',
      },
    })

    expect(wrapper.find('.ix-pro-layout-logo').exists()).toBe(true)

    await wrapper.setProps({
      type: 'sider',
    })

    expect(wrapper.find('.ix-pro-layout-logo').exists()).toBe(true)

    await wrapper.setProps({
      logo: null,
    })

    expect(wrapper.find('.ix-pro-layout-logo').exists()).toBe(false)
  })

  test('slots work', async () => {
    const wrapper = ProLayoutMount({
      props: { type: 'both' },
      slots: {
        logo: () => h('div', { id: 'logo' }),
        headerExtra: () => h('div', { id: 'extra' }),
        siderHeader: () => h('div', { id: 'siderHeader' }),
        siderFooter: () => h('div', { id: 'siderFooter' }),
        default: () => h('div', { id: 'default' }),
        footer: () => h('div', { id: 'footer' }),
      },
    })

    expect(wrapper.find('.ix-pro-layout-header .ix-pro-layout-logo #logo').exists()).toBe(true)
    expect(wrapper.find('.ix-pro-layout-sider .ix-pro-layout-logo').exists()).toBe(false)
    expect(wrapper.find('.ix-pro-layout-header-extra #extra').exists()).toBe(true)
    expect(wrapper.find('.ix-pro-layout-sider-header #siderHeader').exists()).toBe(true)
    expect(wrapper.find('.ix-pro-layout-sider-footer #siderFooter').exists()).toBe(true)
    expect(wrapper.find('.ix-pro-layout-content #default').exists()).toBe(true)
    expect(wrapper.find('.ix-pro-layout-footer #footer').exists()).toBe(true)

    await wrapper.setProps({
      type: 'sider',
    })

    expect(wrapper.find('.ix-pro-layout-header .ix-pro-layout-logo').exists()).toBe(false)
    expect(wrapper.find('.ix-pro-layout-sider .ix-pro-layout-logo #logo').exists()).toBe(true)

    const wrapper2 = ProLayoutMount({
      props: { type: 'both' },
      slots: {
        siderHeader: () => h('div', { id: 'siderHeader' }),
        siderFooter: () => h('div', { id: 'siderFooter' }),
        default: () => h('div', { id: 'default' }),
        footer: () => h('div', { id: 'footer' }),
      },
    })

    expect(wrapper2.find('.ix-pro-layout-header .ix-pro-layout-logo').exists()).toBe(false)
    expect(wrapper2.find('.ix-pro-layout-header-extra').exists()).toBe(false)

    await wrapper2.setProps({
      type: 'sider',
    })

    expect(wrapper2.find('.ix-pro-layout-sider .ix-pro-layout-logo').exists()).toBe(false)
  })
})
