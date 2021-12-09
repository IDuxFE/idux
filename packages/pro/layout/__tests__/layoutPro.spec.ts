import { MountingOptions, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { IxButton } from '@idux/components/button'
import { IxIcon } from '@idux/components/icon'
import { IxMenu, IxMenuDivider, IxMenuItem, IxMenuItemGroup, IxMenuSub } from '@idux/components/menu'

import LayoutPro from '../src/Layout'
import LayoutSiderTrigger from '../src/LayoutSiderTrigger'
import { LayoutProMenuData, LayoutProProps } from '../src/types'

export const dataSource: LayoutProMenuData[] = [
  {
    type: 'sub',
    key: 'sub1',
    icon: 'setting',
    label: 'Sub Menu 1',
    children: [
      {
        type: 'itemGroup',
        key: 'itemGroup1',
        icon: 'setting',
        label: 'Item Group 1',
        children: [
          { type: 'item', key: 'item4', label: 'Item 4', disabled: true },
          { type: 'item', key: 'item5', label: 'Item 5' },
        ],
      },
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
  { type: 'item', key: 'item2', icon: 'mail', label: 'Item 2' },
]

export const defaultSelectedLabel = 'Item 5'

const prefix = 'ix'
const cpmCls = `${prefix}-layout-pro`
const defaultContent = 'This is page content'

describe('LayoutPro', () => {
  const LayoutProMount = (options?: MountingOptions<Partial<LayoutProProps>>) => {
    const { props, ...rest } = options || {}
    const _options = {
      props: {
        activeKey: null,
        menus: dataSource,
        ...props,
      },
      ...rest,
    } as MountingOptions<LayoutProProps>
    return mount(LayoutPro, { ..._options })
  }

  renderWork<LayoutProProps>(LayoutPro, {
    props: {
      menus: [],
    },
    slots: {
      default: () => defaultContent,
    },
  })

  test('activeKey work', async () => {
    const onUpdateActiveKey = jest.fn()
    const wrapper = LayoutProMount({
      props: {
        'onUpdate:activeKey': onUpdateActiveKey,
      },
    })
    await flushPromises()

    expect(wrapper.find(`.${prefix}-menu-item-selected`).html().toString().includes(defaultSelectedLabel))

    wrapper.setProps({ activeKey: 'item7' })

    expect(wrapper.find(`.${prefix}-menu-item-selected`).html().toString().includes('Item 7'))

    await wrapper.findComponent(IxMenuItem).trigger('click')

    expect(onUpdateActiveKey).toBeCalled()
  })

  test('collapsed work', async () => {
    const onUpdateCollapsed = jest.fn()
    const wrapper = LayoutProMount({
      props: {
        collapsed: false,
        'onUpdate:collapsed': onUpdateCollapsed,
      },
      slots: {
        siderTop: () => h(LayoutSiderTrigger),
      },
    })
    await flushPromises()

    expect(wrapper.find(`${cpmCls}-sider-collapsed`).exists()).toBe(false)

    await wrapper.findComponent(LayoutSiderTrigger).trigger('click')

    expect(onUpdateCollapsed).toBeCalledWith(true)
  })

  test('mode work', async () => {
    const wrapper = LayoutProMount()
    await flushPromises()

    // sider(default)
    expect(wrapper.find(`.${cpmCls}-header`).exists()).toBe(false)
    expect(wrapper.find(`.${cpmCls}-sider`).exists()).toBe(true)
    expect(wrapper.find(`.${cpmCls}-sider`).find(`.${prefix}-menu`).exists()).toBe(true)

    await wrapper.setProps({ mode: 'header' })

    expect(wrapper.find(`.${cpmCls}-header`).exists()).toBe(true)
    expect(wrapper.find(`.${cpmCls}-header`).find(`.${prefix}-menu`).exists()).toBe(true)
    expect(wrapper.find(`.${cpmCls}-sider`).exists()).toBe(false)

    await wrapper.setProps({ mode: 'mixin' })

    expect(wrapper.find(`.${cpmCls}-header`).exists()).toBe(true)
    expect(wrapper.find(`.${cpmCls}-header`).find(`.${prefix}-menu`).exists()).toBe(false)
    expect(wrapper.find(`.${cpmCls}-sider`).exists()).toBe(true)

    await wrapper.setProps({ mode: 'both' })

    expect(wrapper.find(`.${cpmCls}-header`).exists()).toBe(true)
    expect(wrapper.find(`.${cpmCls}-header`).find(`.${prefix}-menu`).exists()).toBe(true)
    expect(wrapper.find(`.${cpmCls}-sider`).exists()).toBe(true)
    expect(wrapper.find(`.${cpmCls}-sider`).find(`.${prefix}-menu`).exists()).toBe(true)
  })

  test('menus work', async () => {
    const wrapper = LayoutProMount({
      props: {
        menus: [],
      },
    })
    await flushPromises()

    expect(wrapper.findComponent(IxMenu).exists()).toBe(false)

    await wrapper.setProps({
      menus: dataSource,
    })

    expect(wrapper.findComponent(IxMenu).exists()).toBe(true)
    expect(wrapper.findComponent(IxMenuItem).exists()).toBe(true)
    expect(wrapper.findComponent(IxMenuItemGroup).exists()).toBe(true)
    expect(wrapper.findComponent(IxMenuDivider).exists()).toBe(true)
  })

  test('theme work', async () => {
    const wrapper = LayoutProMount({
      props: {
        mode: 'both',
      },
    })
    await flushPromises()

    expect(wrapper.find(`.${cpmCls}-header`).classes()).toContain(`${cpmCls}-header-light`)
    expect(wrapper.find(`.${cpmCls}-sider`).classes()).toContain(`${cpmCls}-sider-light`)

    await wrapper.setProps({
      theme: 'dark',
    })

    expect(wrapper.find(`.${cpmCls}-header`).classes()).toContain(`${cpmCls}-header-dark`)
    expect(wrapper.find(`.${cpmCls}-sider`).classes()).toContain(`${cpmCls}-sider-dark`)

    await wrapper.setProps({
      theme: {
        header: 'light',
        sider: 'dark',
      },
    })

    expect(wrapper.find(`.${cpmCls}-header`).classes()).toContain(`${cpmCls}-header-light`)
    expect(wrapper.find(`.${cpmCls}-sider`).classes()).toContain(`${cpmCls}-sider-dark`)
  })

  test('indent work', async () => {
    const wrapper = LayoutProMount({
      props: {
        mode: 'both',
      },
    })
    await flushPromises()

    expect(wrapper.find(`.${cpmCls}-sider`).find(`.${prefix}-menu-item-group-title`).attributes('style')).toContain(
      'padding-left: 24px',
    )

    await wrapper.setProps({
      indent: 10,
    })

    expect(wrapper.find(`.${cpmCls}-sider`).find(`.${prefix}-menu-item-group-title`).attributes('style')).toContain(
      'padding-left: 10px',
    )
  })

  test('fixed work', async () => {
    const wrapper = LayoutProMount()
    await flushPromises()

    expect(wrapper.find(`.${cpmCls}`).classes(`${cpmCls}-fixed`)).toBe(true)

    await wrapper.setProps({
      fixed: false,
    })

    expect(wrapper.find(`.${cpmCls}`).classes(`${cpmCls}-fixed`)).toBe(false)
  })

  test('onMenuClick work', async () => {
    const onMenuClick = jest.fn()
    const wrapper = LayoutProMount({
      props: {
        onMenuClick,
      },
    })
    await flushPromises()
    await wrapper.findComponent(IxMenuItem).trigger('click')
    await wrapper.findComponent(IxMenuSub).trigger('click')
    await wrapper.findComponent(IxMenuItemGroup).trigger('click')

    expect(onMenuClick).toHaveBeenCalledTimes(3)
  })

  test('slot work', async () => {
    const wrapper = LayoutProMount({
      props: {
        mode: 'both',
      },
      slots: {
        logo: () => h('div', { id: 'logo' }),
        extra: () => h('div', { id: 'extra' }),
        siderTop: () => h('div', { id: 'siderTop' }),
        siderBottom: () => h('div', { id: 'siderBottom' }),
        default: () => h('div', { id: 'default' }),
      },
    })
    await flushPromises()

    expect(wrapper.find(`.${cpmCls}-header-logo`).find('#logo').exists()).toBe(true)
    expect(wrapper.find(`.${cpmCls}-header-extra`).find('#extra').exists()).toBe(true)
    expect(wrapper.find(`.${cpmCls}-sider-top`).find('#siderTop').exists()).toBe(true)
    expect(wrapper.find(`.${cpmCls}-sider-bottom`).find('#siderBottom').exists()).toBe(true)
    expect(wrapper.find(`.${prefix}-layout-content`).find('#default').exists()).toBe(true)
  })

  test('LayoutSiderTrigger icon work', async () => {
    const wrapper = LayoutProMount({
      props: {
        collapsed: false,
      },
      slots: {
        siderTop: () => h(LayoutSiderTrigger),
      },
    })
    await flushPromises()

    expect(wrapper.findComponent(LayoutSiderTrigger).find(`.${prefix}-icon-menu-unfold`).exists()).toBe(true)

    await wrapper.setProps({
      collapsed: true,
    })

    expect(wrapper.findComponent(LayoutSiderTrigger).find(`.${prefix}-icon-menu-fold`).exists()).toBe(true)

    const customStringIconWrapper = LayoutProMount({
      props: {
        collapsed: false,
      },
      slots: {
        siderTop: () => h(LayoutSiderTrigger, { foldedIcon: 'right', unfoldedIcon: 'left' }),
      },
    })
    await flushPromises()

    expect(customStringIconWrapper.findComponent(LayoutSiderTrigger).find(`.${prefix}-icon-left`).exists()).toBe(true)

    await customStringIconWrapper.setProps({
      collapsed: true,
    })

    expect(customStringIconWrapper.findComponent(LayoutSiderTrigger).find(`.${prefix}-icon-right`).exists()).toBe(true)

    const customRenderIconWrapper = LayoutProMount({
      props: {
        collapsed: false,
      },
      slots: {
        siderTop: () =>
          h(LayoutSiderTrigger, {
            foldedIcon: h(IxIcon, { name: 'star' }),
            unfoldedIcon: h(IxButton, null, () => 'put'),
          }),
      },
    })
    await flushPromises()

    expect(customRenderIconWrapper.findComponent(LayoutSiderTrigger).findComponent(IxButton).exists()).toBe(true)

    await customRenderIconWrapper.setProps({
      collapsed: true,
    })

    expect(customRenderIconWrapper.findComponent(LayoutSiderTrigger).findComponent(IxIcon).exists()).toBe(true)
  })
})
