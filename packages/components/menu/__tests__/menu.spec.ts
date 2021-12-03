import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork, wait } from '@tests'

import Menu from '../src/Menu'
// import MenuDivider from '../src/MenuDivider'
import MenuItem from '../src/MenuItem'
// import MenuItemGroup from '../src/MenuItemGroup'
import MenuSub from '../src/menu-sub/MenuSub'
import { MenuData, MenuProps } from '../src/types'

const dataSource: MenuData[] = [
  { type: 'item', key: 'item1', icon: 'home', slots: { default: () => h('a', 'Item 1') } },
  { type: 'item', key: 'item2', icon: 'mail', label: 'Item 2' },
  { type: 'item', key: 'item3', icon: 'appstore', label: 'Item 3', disabled: true },
  { type: 'divider', key: 'divider1' },
  {
    type: 'sub',
    key: 'sub1',
    icon: 'setting',
    label: 'Sub Menu 1',
    children: [
      {
        type: 'itemGroup',
        key: 'itemGroup1',
        label: 'Item Group 1',
        children: [
          { type: 'item', key: 'item4', label: 'Item 4' },
          { type: 'item', key: 'item5', label: 'Item 5' },
        ],
      },
      { type: 'divider', key: 'divider2' },
      {
        type: 'sub',
        key: 'sub2',
        label: 'Menu Sub 2',
        children: [
          { type: 'item', key: 'item6', label: 'Item 6' },
          { type: 'item', key: 'item7', label: 'Item 7' },
        ],
      },
      {
        type: 'sub',
        key: 'sub3',
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
    disabled: true,
    children: [
      { type: 'item', key: 'item10', label: 'Item 10' },
      { type: 'item', key: 'item11', label: 'Item 11' },
    ],
  },
]

describe('Menu', () => {
  const MenuMount = (options?: MountingOptions<Partial<MenuProps>>) => {
    const { props, ...rest } = options || {}
    return mount(Menu, {
      ...rest,
      props: { dataSource, ...props },
      attachTo: 'body',
    })
  }

  afterEach(() => {
    if (document.querySelector('.ix-menu-sub-overlay-container')) {
      document.querySelector('.ix-menu-sub-overlay-container')!.innerHTML = ''
    }
  })

  renderWork<MenuProps>(Menu, { props: { dataSource }, attachTo: 'body' })

  test('v-model:expandedKeys work', async () => {
    const onUpdateExpandedKeys = jest.fn()
    const wrapper = MenuMount({ props: { expandedKeys: ['sub1'], 'onUpdate:expandedKeys': onUpdateExpandedKeys } })

    const subs = wrapper.findAllComponents(MenuSub)
    expect(subs.length).toBe(4)
    expect(subs[0].classes()).toContain('ix-menu-sub-expanded')
    expect(subs[1].classes()).not.toContain('ix-menu-sub-expanded')
    expect(subs[2].classes()).not.toContain('ix-menu-sub-expanded')
    expect(subs[3].classes()).not.toContain('ix-menu-sub-expanded')

    await wrapper.setProps({ expandedKeys: ['sub4'] })

    expect(subs[0].classes()).not.toContain('ix-menu-sub-expanded')
    expect(subs[1].classes()).not.toContain('ix-menu-sub-expanded')
    expect(subs[2].classes()).not.toContain('ix-menu-sub-expanded')
    expect(subs[3].classes()).toContain('ix-menu-sub-expanded')

    await wrapper.setProps({ expandedKeys: [] })
    await subs[0].find('.ix-menu-sub-title').trigger('mouseenter')
    await wait(105)

    expect(onUpdateExpandedKeys).toBeCalledWith(['sub1'])
  })

  test('v-model:selectedKeys work', async () => {
    const onUpdateSelectedKeys = jest.fn()
    const wrapper = MenuMount({ props: { selectedKeys: ['item1'], 'onUpdate:selectedKeys': onUpdateSelectedKeys } })

    const items = wrapper.findAllComponents(MenuItem)
    expect(items.length).toBe(3)
    expect(items[0].classes()).toContain('ix-menu-item-selected')
    expect(items[1].classes()).not.toContain('ix-menu-item-selected')
    expect(items[2].classes()).not.toContain('ix-menu-item-selected')

    await wrapper.setProps({ selectedKeys: ['item3'] })

    expect(items[0].classes()).not.toContain('ix-menu-item-selected')
    expect(items[1].classes()).not.toContain('ix-menu-item-selected')
    expect(items[2].classes()).toContain('ix-menu-item-selected')

    await wrapper.setProps({ selectedKeys: [] })
    await items[0].trigger('click')
    await wait(100)

    expect(onUpdateSelectedKeys).toBeCalledWith(['item1'])
  })
})
