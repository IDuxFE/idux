import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork, wait } from '@tests'

import { IxIcon } from '@idux/components/icon'

import Tree from '../src/Tree'
import { TreeNode, TreeProps } from '../src/types'

const dataSource: TreeNode[] = [
  {
    label: 'Node 0',
    key: '0',
    children: [
      {
        label: 'Node 0-0',
        key: '0-0',
        children: [
          { label: 'Node 0-0-0', key: '0-0-0' },
          { label: 'Node 0-0-1', key: '0-0-1' },
          { label: 'Node 0-0-2', key: '0-0-2' },
        ],
      },
      {
        label: 'Node 0-1',
        key: '0-1',
        disabled: true,
        children: [
          { label: 'Node 0-1-0', key: '0-1-0' },
          { label: 'Node 0-1-1', key: '0-1-1' },
          { label: 'Node 0-1-2', key: '0-1-2' },
        ],
      },
    ],
  },
  {
    label: 'Node 1',
    key: '1',
    children: [
      {
        label: 'Node 1-0',
        key: '1-0',
        children: [
          { label: 'Node 1-0-0', key: '1-0-0' },
          { label: 'Node 1-0-1', key: '1-0-1' },
          { label: 'Node 1-0-2', key: '1-0-2' },
        ],
      },
      {
        label: 'Node 1-1',
        key: '1-1',
        children: [
          { label: 'Node 1-1-0', key: '1-1-0' },
          { label: 'Node 1-1-1', key: '1-1-1' },
          { label: 'Node 1-1-2', key: '1-1-2' },
        ],
      },
    ],
  },
  { label: 'Node 2', key: '2' },
]

const checkedKeys = ['0-0', '0-1']
const expandedKeys = ['0', '0-0', '0-1']
const selectedKeys = ['0-1']

describe('Tree', () => {
  const TreeMount = (options?: MountingOptions<Partial<TreeProps>>) => {
    const { props, ...rest } = options || {}
    return mount(Tree, {
      ...rest,
      props: { dataSource, expandedKeys, checkedKeys, selectedKeys, checkable: true, ...props },
    })
  }

  renderWork<TreeProps>(Tree, {
    props: { dataSource, expandedKeys, checkedKeys, selectedKeys, checkable: true },
  })

  test('v-model:checkedKeys work', async () => {
    const onUpdateCheckedKeys = jest.fn()
    const wrapper = TreeMount({
      props: { checkedKeys: ['0'], 'onUpdate:checkedKeys': onUpdateCheckedKeys },
    })

    const allNodes = wrapper.findAll('.ix-tree-node')

    expect(allNodes[0].find('.ix-checkbox-checked').exists()).toBe(true)

    await wrapper.setProps({ checkedKeys: ['0', '0-0'] })

    expect(allNodes[0].find('.ix-checkbox-checked').exists()).toBe(true)
    expect(allNodes[1].find('.ix-checkbox-checked').exists()).toBe(true)

    // 0-0, unchecked
    await allNodes[1].find('input').setValue(false)

    expect(allNodes[0].find('.ix-checkbox-checked').exists()).toBe(false)
    expect(allNodes[1].find('.ix-checkbox-checked').exists()).toBe(false)

    expect(onUpdateCheckedKeys).toBeCalledWith([])

    // 0-0, checked
    await allNodes[1].find('input').setValue(true)

    expect(allNodes[0].find('.ix-checkbox-checked').exists()).toBe(true)
    expect(allNodes[1].find('.ix-checkbox-checked').exists()).toBe(true)
    expect(allNodes[2].find('.ix-checkbox-checked').exists()).toBe(true)
    expect(allNodes[3].find('.ix-checkbox-checked').exists()).toBe(true)
    expect(allNodes[4].find('.ix-checkbox-checked').exists()).toBe(true)

    expect(onUpdateCheckedKeys).toBeCalledWith(['0-0', '0', '0-0-0', '0-0-1', '0-0-2'])
  })

  test('v-model:expandedKeys work', async () => {
    const onUpdateExpandedKeys = jest.fn()
    const wrapper = TreeMount({
      props: { expandedKeys: ['0'], 'onUpdate:expandedKeys': onUpdateExpandedKeys },
    })

    const allNodes = wrapper.findAll('.ix-tree-node')

    expect(allNodes[0].classes()).toContain('ix-tree-node-expanded')

    await wrapper.setProps({ expandedKeys: ['0', '0-0'] })

    expect(allNodes[0].classes()).toContain('ix-tree-node-expanded')
    expect(allNodes[1].classes()).toContain('ix-tree-node-expanded')

    // 0-0
    await allNodes[1].find('.ix-tree-node-expand').trigger('click')

    expect(allNodes[0].classes()).toContain('ix-tree-node-expanded')
    expect(allNodes[1].classes()).not.toContain('ix-tree-node-expanded')

    expect(onUpdateExpandedKeys).toBeCalledWith(['0'])

    // 0-0
    await allNodes[1].find('.ix-tree-node-expand').trigger('click')

    expect(allNodes[0].classes()).toContain('ix-tree-node-expanded')
    expect(allNodes[1].classes()).toContain('ix-tree-node-expanded')

    expect(onUpdateExpandedKeys).toBeCalledWith(['0', '0-0'])
  })

  test('v-model:selectedKeys work', async () => {
    const onUpdateSelectedKeys = jest.fn()
    const wrapper = TreeMount({
      props: { selectedKeys: ['0'], 'onUpdate:selectedKeys': onUpdateSelectedKeys },
    })

    const allNodes = wrapper.findAll('.ix-tree-node')

    expect(allNodes[0].classes()).toContain('ix-tree-node-selected')

    await wrapper.setProps({ selectedKeys: ['0', '0-0'] })

    expect(allNodes[0].classes()).toContain('ix-tree-node-selected')
    expect(allNodes[1].classes()).toContain('ix-tree-node-selected')

    // 0-0
    await allNodes[1].find('.ix-tree-node-content').trigger('click')

    expect(allNodes[0].classes()).not.toContain('ix-tree-node-selected')
    expect(allNodes[1].classes()).not.toContain('ix-tree-node-selected')

    expect(onUpdateSelectedKeys).toBeCalledWith([])

    // 0-0
    await allNodes[1].find('.ix-tree-node-content').trigger('click')

    expect(allNodes[0].classes()).not.toContain('ix-tree-node-selected')
    expect(allNodes[1].classes()).toContain('ix-tree-node-selected')

    expect(onUpdateSelectedKeys).toBeCalledWith(['0-0'])
  })

  test('selectable work', async () => {
    const onUpdateSelectedKeys = jest.fn()
    const wrapper = TreeMount({
      props: { selectable: false, selectedKeys: [], 'onUpdate:selectedKeys': onUpdateSelectedKeys },
    })

    const allNodes = wrapper.findAll('.ix-tree-node')

    // 0
    await allNodes[0].find('.ix-tree-node-content').trigger('click')

    expect(allNodes[0].classes()).not.toContain('ix-tree-node-selected')
    expect(onUpdateSelectedKeys).not.toBeCalled()

    // 0-0
    await wrapper.setProps({ selectable: true })
    await allNodes[0].find('.ix-tree-node-content').trigger('click')

    expect(allNodes[0].classes()).toContain('ix-tree-node-selected')
    expect(onUpdateSelectedKeys).toBeCalledWith(['0'])

    await allNodes[1].find('.ix-tree-node-content').trigger('click')

    expect(allNodes[0].classes()).not.toContain('ix-tree-node-selected')
    expect(allNodes[1].classes()).toContain('ix-tree-node-selected')
    expect(onUpdateSelectedKeys).toBeCalledWith(['0-0'])

    await wrapper.setProps({ selectable: 'multiple' })
    await allNodes[0].find('.ix-tree-node-content').trigger('click')

    expect(allNodes[0].classes()).toContain('ix-tree-node-selected')
    expect(allNodes[1].classes()).toContain('ix-tree-node-selected')
    expect(onUpdateSelectedKeys).toBeCalledWith(['0-0', '0'])
  })

  test('blocked work', async () => {
    const wrapper = TreeMount({
      props: { blocked: true },
    })

    expect(wrapper.classes()).toContain('ix-tree-blocked')

    await wrapper.setProps({ blocked: false })

    expect(wrapper.classes()).not.toContain('ix-tree-blocked')
  })

  test('checkable work', async () => {
    const wrapper = TreeMount({
      props: { checkable: true },
    })

    expect(wrapper.find('.ix-checkbox').exists()).toBe(true)

    await wrapper.setProps({ checkable: false })

    expect(wrapper.find('.ix-checkbox').exists()).toBe(false)
  })

  test('childrenKey work', async () => {
    const dataSource: TreeNode[] = [
      {
        label: 'Node 0',
        key: '0',
        test: [
          {
            label: 'Node 0-0',
            key: '0-0',
            test: [
              { label: 'Node 0-0-0', key: '0-0-0' },
              { label: 'Node 0-0-1', key: '0-0-1' },
            ],
          },
          {
            label: 'Node 0-1',
            key: '0-1',
            disabled: true,
            test: [
              { label: 'Node 0-1-0', key: '0-1-0' },
              { label: 'Node 0-1-1', key: '0-1-1' },
            ],
          },
        ],
      },
    ]

    const wrapper = TreeMount({
      props: { dataSource, childrenKey: 'test' },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('dataSource work', async () => {
    const wrapper = TreeMount()

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({
      dataSource: [
        {
          label: 'Node 0-change',
          key: '0',
          children: [
            {
              label: 'Node 0-0-change',
              key: '0-0',
              children: [
                { label: 'Node 0-0-0', key: '0-0-0' },
                { label: 'Node 0-0-1', key: '0-0-1' },
              ],
            },
            {
              label: 'Node 0-1',
              key: '0-1',
              disabled: true,
              children: [
                { label: 'Node 0-1-0', key: '0-1-0' },
                { label: 'Node 0-1-1', key: '0-1-1' },
              ],
            },
          ],
        },
        {
          label: 'Node 1',
          key: '1',
          children: [
            {
              label: 'Node 1-0',
              key: '1-0',
              children: [
                { label: 'Node 1-0-0', key: '1-0-0' },
                { label: 'Node 1-0-1', key: '1-0-1' },
              ],
            },
          ],
        },
      ],
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disabled work', async () => {
    const wrapper = TreeMount({
      props: { disabled: node => node.key === '0' },
    })

    const allNodes = wrapper.findAll('.ix-tree-node')

    expect(allNodes[0].classes()).toContain('ix-tree-node-disabled')
    expect(allNodes[0].find('.ix-checkbox').classes()).toContain('ix-checkbox-disabled')
    expect(allNodes[1].classes()).not.toContain('ix-tree-node-disabled')
    expect(allNodes[1].find('.ix-checkbox').classes()).not.toContain('ix-checkbox-disabled')

    await wrapper.setProps({ disabled: (node: TreeNode) => node.key === '0-0' })

    expect(allNodes[0].classes()).not.toContain('ix-tree-node-disabled')
    expect(allNodes[0].find('.ix-checkbox').classes()).not.toContain('ix-checkbox-disabled')
    expect(allNodes[1].classes()).toContain('ix-tree-node-disabled')
    expect(allNodes[1].find('.ix-checkbox').classes()).toContain('ix-checkbox-disabled')
  })

  test('empty work', async () => {
    let emptyDescription = 'This is an empty tree'
    const wrapper = TreeMount({
      props: { dataSource: [], empty: emptyDescription },
    })

    expect(wrapper.find('.ix-empty').text()).toBe(emptyDescription)

    emptyDescription = 'This is an empty tree2'
    await wrapper.setProps({ empty: { description: emptyDescription } })

    expect(wrapper.find('.ix-empty').text()).toBe(emptyDescription)
  })

  test('empty work', async () => {
    let emptyDescription = 'This is an empty tree'
    const wrapper = TreeMount({
      props: { dataSource: [], empty: emptyDescription },
    })

    expect(wrapper.find('.ix-empty').text()).toBe(emptyDescription)

    emptyDescription = 'This is an empty tree2'
    await wrapper.setProps({ empty: { description: emptyDescription } })

    expect(wrapper.find('.ix-empty').text()).toBe(emptyDescription)
  })

  test('expandIcon work', async () => {
    const wrapper = TreeMount({
      props: { expandIcon: 'up' },
    })

    expect(wrapper.find('.ix-tree-node-expand').find('.ix-icon-up').exists()).toBe(true)

    await wrapper.setProps({ expandIcon: 'down' })

    expect(wrapper.find('.ix-tree-node-expand').find('.ix-icon-up').exists()).toBe(false)
    expect(wrapper.find('.ix-tree-node-expand').find('.ix-icon-down').exists()).toBe(true)
  })

  test('expandIcon slot work', async () => {
    const wrapper = TreeMount({
      props: { expandIcon: 'right' },
      slots: {
        expandIcon: ({ expanded }: { expanded: boolean }) => h(IxIcon, { name: expanded ? 'down' : 'up' }),
      },
    })

    const allNodes = wrapper.findAll('.ix-tree-node')

    expect(allNodes[0].find('.ix-icon-down').exists()).toBe(true)

    await allNodes[0].find('.ix-tree-node-expand').trigger('click')

    expect(wrapper.find('.ix-tree-node-expand').find('.ix-icon-up').exists()).toBe(true)
    expect(wrapper.find('.ix-tree-node-expand').find('.ix-icon-down').exists()).toBe(false)
  })

  test('height and virtual work', async () => {
    const wrapper = TreeMount({
      props: { height: 100, virtual: true },
    })

    expect(wrapper.find('.cdk-virtual-scroll').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ virtual: false })

    expect(wrapper.find('.ix-virtual-scroll').exists()).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('leafLineIcon and showLine work', async () => {
    const wrapper = TreeMount({
      props: { showLine: true, leafLineIcon: 'up' },
    })
    // 0-0-0
    const leafNode = wrapper.findAll('.ix-tree-node')[2]

    expect(wrapper.classes()).toContain('ix-tree-show-line')
    expect(leafNode.find('.ix-tree-node-leaf').find('.ix-icon-up').exists()).toBe(true)
    expect(leafNode.find('.ix-tree-node-leaf').find('.ix-tree-node-leaf-line').exists()).toBe(false)

    await wrapper.setProps({ leafLineIcon: undefined })

    expect(leafNode.find('.ix-tree-node-leaf').find('.ix-icon-up').exists()).toBe(false)
    expect(leafNode.find('.ix-tree-node-leaf').find('.ix-tree-node-leaf-line').exists()).toBe(true)

    await wrapper.setProps({ showLine: false })

    expect(wrapper.classes()).not.toContain('ix-tree-show-line')
    expect(leafNode.find('.ix-tree-node-leaf').exists()).toBe(false)
  })

  test('leafLineIcon slot work', async () => {
    const wrapper = TreeMount({
      props: { showLine: true, leafLineIcon: 'up' },
      slots: {
        leafLineIcon: () => 'test',
      },
    })
    // 0-0-0
    const leafNode = wrapper.findAll('.ix-tree-node')[2]

    expect(leafNode.find('.ix-tree-node-leaf').find('.ix-icon-up').exists()).toBe(false)
    expect(leafNode.find('.ix-tree-node-leaf').text()).toBe('test')
  })

  test('loadChildren work', async () => {
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

    const wrapper = TreeMount({
      props: {
        dataSource: [
          { key: '0', label: '0' },
          { key: '1', label: '1', isLeaf: true },
        ],
        expandedKeys: [],
        checkedKeys: [],
        selectedKeys: [],
        loadChildren,
      },
    })

    const allNodes = wrapper.findAll('.ix-tree-node')

    expect(allNodes.length).toBe(2)
    expect(allNodes[0].find('.ix-tree-node-expand').exists()).toBe(true)
    expect(allNodes[1].find('.ix-tree-node-expand').exists()).toBe(false)

    await allNodes[0].find('.ix-tree-node-expand').trigger('click')

    expect(allNodes[0].find('.ix-tree-node-expand').find('.ix-icon-loading').exists()).toBe(true)

    await wait(50)

    expect(wrapper.findAll('.ix-tree-node').length).toBe(4)
    expect(allNodes[0].find('.ix-tree-node-expand').find('.ix-icon-loading').exists()).toBe(false)
    expect(allNodes[0].find('.ix-tree-node-expand').find('.ix-icon-right').exists()).toBe(true)
  })

  test('loadedKeys work', async () => {
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

    const wrapper = TreeMount({
      props: {
        dataSource: [
          { key: '0', label: '0' },
          { key: '1', label: '1', isLeaf: true },
        ],
        expandedKeys: [],
        checkedKeys: [],
        selectedKeys: [],
        loadChildren,
        loadedKeys: ['0'],
      },
    })

    const allNodes = wrapper.findAll('.ix-tree-node')

    expect(allNodes.length).toBe(2)

    await allNodes[0].find('.ix-tree-node-expand').trigger('click')

    expect(allNodes[0].find('.ix-tree-node-expand').find('.ix-icon-loading').exists()).toBe(false)

    await wait(50)

    expect(wrapper.findAll('.ix-tree-node').length).toBe(2)

    await wrapper.setProps({ loadedKeys: [] })

    await allNodes[0].find('.ix-tree-node-expand').trigger('click')

    expect(allNodes[0].find('.ix-tree-node-expand').find('.ix-icon-loading').exists()).toBe(true)

    await wait(50)

    expect(wrapper.findAll('.ix-tree-node').length).toBe(4)
  })

  test('nodeKey work', async () => {
    const wrapper = TreeMount({
      props: { nodeKey: 'label' },
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ nodeKey: (node: TreeNode) => node.key })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('searchValue work', async () => {
    const wrapper = TreeMount({
      props: { searchValue: 'node' },
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ searchValue: '0-0' })

    expect(wrapper.html()).toMatchSnapshot()

    // not match
    await wrapper.setProps({ searchValue: '0-0-0-0' })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('searchFn work', async () => {
    const wrapper = TreeMount({
      props: {
        searchValue: 'node',
        searchFn: (node, searchValue) => {
          if (searchValue === 'node') {
            return false
          }
          if (searchValue === 'all') {
            return true
          }
          return node.key === '0'
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ searchValue: 'all' })

    expect(wrapper.html()).toMatchSnapshot()

    // only math 0
    await wrapper.setProps({ searchValue: 'test' })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
