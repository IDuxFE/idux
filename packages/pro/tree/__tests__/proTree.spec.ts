import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork, wait } from '@tests'

import { type TreeNode } from '@idux/components/tree'

import ProTree from '../src/ProTree'
import { ProTreeProps } from '../src/types'

const defaultDataSource = [
  {
    label: 'Node 0',
    key: '0',
    children: [
      {
        label: 'Node 0-0',
        key: '0-0',
      },
      {
        label: 'Node 0-1',
        key: '0-1',
      },
      {
        label: 'Node 0-2',
        key: '0-2',
      },
    ],
  },
]

const expandedKeys = ['0']

describe('ProTree', () => {
  const ProTreeMount = (options?: MountingOptions<Partial<ProTreeProps>>) => {
    const { props, ...rest } = options || {}
    return mount(ProTree, {
      ...rest,
      props: { dataSource: defaultDataSource, expandedKeys, ...props },
      attachTo: 'body',
    })
  }

  renderWork<ProTreeProps>(ProTree, {
    props: { dataSource: defaultDataSource },
  })

  test('checkable work', async () => {
    const wrapper = ProTreeMount()

    expect(wrapper.find('.ix-tree-node-checkbox').exists()).toBe(false)

    await wrapper.setProps({ checkable: true })

    expect(wrapper.find('.ix-tree-node-checkbox').exists()).toBe(true)
  })

  test('searchable work', async () => {
    const wrapper = ProTreeMount()

    expect(wrapper.find('.ix-pro-tree-search-wrapper').exists()).toBe(true)
    expect(wrapper.find('.ix-divider').exists()).toBe(false)

    await wrapper.setProps({ searchable: false })

    expect(wrapper.find('.ix-tree-node-checkbox').exists()).toBe(false)
    expect(wrapper.find('.ix-divider').exists()).toBe(true)

    await wrapper.setProps({ collapsed: true })

    expect(wrapper.find('.ix-divider').exists()).toBe(false)

    await wrapper.setProps({ collapsed: false })

    expect(wrapper.find('.ix-divider').exists()).toBe(true)
  })

  test(':checkedKeys.sync work', async () => {
    const onUpdateCheckedKeys = vi.fn()
    const onCheckedChange = vi.fn()

    const wrapper = ProTreeMount({
      props: {
        checkable: true,
        checkedKeys: ['0'],
        'onUpdate:checkedKeys': onUpdateCheckedKeys,
        onCheckedChange,
      },
    })

    const allNodes = wrapper.findAll('.ix-tree-node')

    allNodes.forEach(node => {
      expect(node.find('.ix-checkbox-checked').exists()).toBe(true)
    })

    // 0-0, unchecked
    await allNodes[1].find('input').setValue(false)

    expect(onUpdateCheckedKeys).toBeCalledWith(['0-1', '0-2'])
    expect(onCheckedChange).toBeCalledWith(
      ['0-1', '0-2'],
      [
        {
          key: '0-1',
          label: 'Node 0-1',
        },
        {
          key: '0-2',
          label: 'Node 0-2',
        },
      ],
    )

    await wrapper.setProps({ checkedKeys: ['0-0'] })

    // 0 indeterminate
    expect(allNodes[0].find('.ix-checkbox-indeterminate').exists()).toBe(true)
  })

  test(':expandedKeys.sync work', async () => {
    const onUpdateExpandedKeys = vi.fn()
    const wrapper = ProTreeMount({
      props: {
        dataSource: [
          {
            label: 'Node 0',
            key: '0',
            children: [
              {
                label: 'Node 0-0',
                key: '0-0',
                children: [
                  {
                    label: 'Node 0-0-0',
                    key: '0-0-0',
                  },
                ],
              },
              {
                label: 'Node 0-1',
                key: '0-1',
              },
              {
                label: 'Node 0-2',
                key: '0-2',
              },
            ],
          },
        ],
        expandedKeys: ['0'],
        'onUpdate:expandedKeys': onUpdateExpandedKeys,
      },
    })

    const allNodes = wrapper.findAll('.ix-tree-node')

    expect(allNodes[0].classes()).toContain('ix-tree-node-expanded')

    await wrapper.setProps({ expandedKeys: ['0', '0-0'] })

    expect(allNodes[0].classes()).toContain('ix-tree-node-expanded')
    expect(allNodes[1].classes()).toContain('ix-tree-node-expanded')

    // 0-0
    await allNodes[1].find('.ix-tree-node-expand').trigger('click')

    expect(onUpdateExpandedKeys).toBeCalledWith(['0'])

    await wrapper.setProps({ expandedKeys: ['0'] })

    expect(allNodes[0].classes()).toContain('ix-tree-node-expanded')
    expect(allNodes[1].classes()).not.toContain('ix-tree-node-expanded')

    // 0-0
    await allNodes[1].find('.ix-tree-node-expand').trigger('click')

    expect(onUpdateExpandedKeys).toBeCalledWith(['0', '0-0'])

    await wrapper.setProps({ expandedKeys: ['0', '0-0'] })

    expect(allNodes[0].classes()).toContain('ix-tree-node-expanded')
    expect(allNodes[1].classes()).toContain('ix-tree-node-expanded')
  })

  test(':selectedKeys.sync work', async () => {
    const onUpdateSelectedKeys = vi.fn()
    const wrapper = ProTreeMount({
      props: { selectedKeys: ['0'], 'onUpdate:selectedKeys': onUpdateSelectedKeys },
    })

    const allNodes = wrapper.findAll('.ix-tree-node')

    expect(allNodes[0].classes()).toContain('ix-tree-node-selected')

    await wrapper.setProps({ selectedKeys: ['0', '0-0'] })

    expect(allNodes[0].classes()).toContain('ix-tree-node-selected')
    expect(allNodes[1].classes()).toContain('ix-tree-node-selected')

    // 0-0
    await allNodes[1].find('.ix-tree-node-content').trigger('click')

    expect(onUpdateSelectedKeys).toBeCalledWith([])

    await wrapper.setProps({ selectedKeys: [] })

    expect(allNodes[0].classes()).not.toContain('ix-tree-node-selected')
    expect(allNodes[1].classes()).not.toContain('ix-tree-node-selected')

    // 0-0
    await allNodes[1].find('.ix-tree-node-content').trigger('click')

    expect(onUpdateSelectedKeys).toBeCalledWith(['0-0'])

    await wrapper.setProps({ selectedKeys: ['0-0'] })

    expect(allNodes[0].classes()).not.toContain('ix-tree-node-selected')
    expect(allNodes[1].classes()).toContain('ix-tree-node-selected')
  })

  test('loadedKeys work', async () => {
    const onUpdateLoadedKeys = vi.fn()
    const loadChildren = (node: TreeNode) => {
      return new Promise<TreeNode[]>(resolve => {
        setTimeout(() => {
          const parentKey = node.key as string
          const children = [
            { label: `Child ${parentKey}-0 `, key: `${parentKey}-0` },
            { label: `Child ${parentKey}-1 `, key: `${parentKey}-1` },
          ]
          resolve(children)
        }, 50)
      })
    }

    const wrapper = ProTreeMount({
      props: {
        dataSource: [
          { key: '0', label: '0' },
          { key: '1', label: '1', isLeaf: true },
        ],
        expandedKeys: undefined,
        checkedKeys: undefined,
        selectedKeys: undefined,
        loadChildren,
        loadedKeys: ['0'],
        'onUpdate:loadedKeys': onUpdateLoadedKeys,
      },
    })

    let allNodes = wrapper.findAll('.ix-tree-node')

    expect(allNodes.length).toBe(2)

    await allNodes[0].find('.ix-tree-node-expand').trigger('click')

    expect(allNodes[0].find('.ix-tree-node-expand').find('.ix-icon-loading').exists()).toBe(false)

    await wait(50)

    allNodes = wrapper.findAll('.ix-tree-node')

    expect(allNodes.length).toBe(2)

    await wrapper.setProps({ loadedKeys: [] })

    await allNodes[0].find('.ix-tree-node-expand').trigger('click')

    expect(allNodes[0].find('.ix-tree-node-expand').find('.ix-icon-loading').exists()).toBe(true)

    await wait(50)

    allNodes = wrapper.findAll('.ix-tree-node')

    expect(allNodes.length).toBe(4)
  })

  test(':collapsed.sync work', async () => {
    const onUpdateCollapsed = vi.fn()
    const onCollapsed = vi.fn()

    const wrapper = ProTreeMount({
      props: {
        'onUpdate:collapsed': onUpdateCollapsed,
        onCollapsed,
      },
    })

    expect(wrapper.find('.ix-pro-tree-collapsed-icon').exists()).toBe(false)

    await wrapper.setProps({ collapsed: false })

    expect(wrapper.find('.ix-pro-tree-collapsed-icon').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-collapse').exists()).toBe(true)

    await wrapper.setProps({ collapsed: true })

    expect(wrapper.find('.ix-icon-uncollapse').exists()).toBe(true)

    await wrapper.find('.ix-pro-tree-collapsed-icon').trigger('click')

    expect(onUpdateCollapsed).toBeCalledWith(false)
    expect(onCollapsed).toBeCalledWith(false)
  })

  test('collapsedWidth work', async () => {
    const wrapper = ProTreeMount({
      props: {
        collapsed: true,
      },
    })

    expect(wrapper.attributes('style')).toContain('width: 44px')

    await wrapper.setProps({ collapsedWidth: 100 })

    expect(wrapper.attributes('style')).toContain('width: 100px')
  })

  test('placeholder work', async () => {
    const wrapper = ProTreeMount({
      props: {
        placeholder: 'placeholder',
      },
    })

    expect(wrapper.find('.ix-pro-tree-search-wrapper .ix-input-inner').attributes('placeholder')).toBe('placeholder')

    await wrapper.setProps({ placeholder: 'temp' })

    expect(wrapper.find('.ix-pro-tree-search-wrapper .ix-input-inner').attributes('placeholder')).toBe('temp')
  })

  test('header work', async () => {
    const wrapper = ProTreeMount({
      props: {
        header: 'title',
      },
    })

    expect(wrapper.find('.ix-header-title').text()).toBe('title')

    await wrapper.setProps({
      header: {
        title: 'tmp',
        suffix: 'setting',
      },
    })

    expect(wrapper.find('.ix-header-title').text()).toBe('tmp')
    expect(wrapper.find('.ix-header-suffix .ix-icon-setting').exists()).toBe(true)
  })

  test('header slot work', async () => {
    const wrapper = ProTreeMount({
      props: {
        header: 'title',
      },
      slots: {
        header: 'header',
      },
    })

    expect(wrapper.find('.ix-pro-tree-header-wrapper').text()).toBe('header')
    expect(wrapper.find('.ix-header').exists()).toBe(false)
  })

  test('clearIcon work', async () => {
    const wrapper = ProTreeMount({
      props: {
        searchValue: 'searchValue',
      },
    })

    expect(wrapper.find('.ix-input-clear .ix-icon-close-circle').exists()).toBe(true)

    await wrapper.setProps({
      clearIcon: 'setting',
    })

    expect(wrapper.find('.ix-input-clear .ix-icon-setting').exists()).toBe(true)
  })

  test('collapseIcon work', async () => {
    const wrapper = ProTreeMount()

    expect(wrapper.find('.ix-pro-tree-collapsed-icon').exists()).toBe(false)

    await wrapper.setProps({
      collapsed: false,
    })

    expect(wrapper.find('.ix-pro-tree-collapsed-icon').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-collapse').exists()).toBe(true)

    await wrapper.setProps({
      collapseIcon: ['left', 'right'],
    })

    expect(wrapper.find('.ix-icon-left').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-collapse').exists()).toBe(false)

    await wrapper.setProps({
      collapsed: true,
    })

    expect(wrapper.find('.ix-icon-right').exists()).toBe(true)
    expect(wrapper.find('.ix-icon-uncollapse').exists()).toBe(false)
  })

  test('searchValue.sync work', async () => {
    const onSearch = vi.fn()
    const onUpdateSearch = vi.fn()
    const wrapper = ProTreeMount({
      props: {
        searchValue: 'Node 0-0',
        onSearch,
        'onUpdate:searchValue': onUpdateSearch,
      },
    })

    const input = wrapper.find('.ix-pro-tree-search-wrapper .ix-input-inner')

    expect(!!wrapper.findAll('.ix-tree-node')[1]?.find('.ix-tree-node-content-label-highlight').exists()).toBe(true)

    await wrapper.setProps({
      searchValue: 'tmp',
    })

    expect(!!wrapper.findAll('.ix-tree-node')[1]?.find('.ix-tree-node-content-label-highlight').exists()).toBe(false)

    await input.setValue('search text')

    expect(onSearch).toBeCalledWith('search text')
    expect(onUpdateSearch).toBeCalledWith('search text')
  })

  test('expandAll and collapseAll work', async () => {
    const onUpdateExpandedKeys = vi.fn()
    const wrapper = ProTreeMount({
      props: {
        expandedKeys: ['0'],
        'onUpdate:expandedKeys': onUpdateExpandedKeys,
      },
    })

    await wrapper.vm.collapseAll()

    expect(onUpdateExpandedKeys).toBeCalledWith([])

    await wrapper.vm.expandAll()

    expect(onUpdateExpandedKeys).toBeCalledWith(['0'])
  })
  test('getNode work', async () => {
    const onUpdateExpandedKeys = vi.fn()
    const wrapper = ProTreeMount({
      props: {
        dataSource: defaultDataSource,
        expandedKeys: ['0'],
        'onUpdate:expandedKeys': onUpdateExpandedKeys,
      },
    })

    expect(wrapper.vm.getNode('0')).toMatchObject(defaultDataSource[0])

    expect(wrapper.vm.getNode('0-1')).toMatchObject(defaultDataSource[0].children[1])

    expect(wrapper.vm.getNode('4')).toBe(undefined)
  })
})
