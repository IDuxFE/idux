import type { TreeSelectNode } from '@idux/components/tree-select'

import { MountingOptions, flushPromises, mount } from '@vue/test-utils'
import { VNode, h } from 'vue'

import { isElementVisible, renderWork, wait } from '@tests'

import { IxEmpty } from '@idux/components/empty'
import { IxIcon } from '@idux/components/icon'

import TreeSelect from '../src/TreeSelect'
import Content from '../src/content/Content'
import { TreeSelectProps } from '../src/types'

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

const defaultSingleValue = '0'
const defaultMultipleValue = ['0']
const expandedKeys = ['0']

describe('TreeSelect', () => {
  afterEach(() => {
    if (document.querySelector('.ix-tree-select-overlay')) {
      document.querySelector('.ix-tree-select-overlay')!.innerHTML = ''
    }
  })

  describe('single work', () => {
    const TreeSelectMount = (options?: MountingOptions<Partial<TreeSelectProps>>) => {
      const { props, ...rest } = options || {}
      return mount(TreeSelect, {
        ...rest,
        props: { dataSource: defaultDataSource, value: defaultSingleValue, expandedKeys, ...props },
        attachTo: 'body',
      })
    }

    renderWork<TreeSelectProps>(TreeSelect, {
      props: { open: true, dataSource: defaultDataSource, value: defaultSingleValue },
      attachTo: 'body',
    })

    test('v-model:value work', async () => {
      const onUpdateValue = vi.fn()
      const onChange = vi.fn()
      const wrapper = TreeSelectMount({ props: { open: true, value: '0', 'onUpdate:value': onUpdateValue, onChange } })

      expect(wrapper.find('.ix-selector-item').text()).toBe('Node 0')

      await wrapper.setProps({ value: undefined })

      expect(wrapper.find('.ix-selector-item').exists()).toBe(false)

      const allNodes = wrapper.findComponent(Content).findAll('.ix-tree-node-content')

      await allNodes[0].trigger('click')

      expect(onUpdateValue).toBeCalledWith('0')
      expect(onChange).toBeCalledWith('0', undefined)

      await wrapper.setProps({ value: '0' })
      await allNodes[1].trigger('click')

      expect(onUpdateValue).toBeCalledWith('0-0')
      expect(onChange).toBeCalledWith('0-0', '0')
    })

    test('v-model:expandedKeys work', async () => {
      const onUpdateExpandedKeys = vi.fn()
      const onExpandedChange = vi.fn()
      const wrapper = TreeSelectMount({
        props: { open: true, expandedKeys: [], 'onUpdate:expandedKeys': onUpdateExpandedKeys, onExpandedChange },
      })

      const allNodes = wrapper.findComponent(Content).findAll('.ix-tree-node')

      expect(allNodes[0].classes()).not.toContain('ix-tree-node-expanded')

      await allNodes[0].find('.ix-tree-node-expand').trigger('click')

      expect(onUpdateExpandedKeys).toBeCalledWith(['0'])
      expect(onExpandedChange).toBeCalledWith(
        ['0'],
        [
          {
            children: [
              { key: '0-0', label: 'Node 0-0' },
              { key: '0-1', label: 'Node 0-1' },
              { key: '0-2', label: 'Node 0-2' },
            ],
            key: '0',
            label: 'Node 0',
          },
        ],
      )
    })

    test('loadedKeys work', async () => {
      const loadChildren = (node: TreeSelectNode) => {
        return new Promise<TreeSelectNode[]>(resolve => {
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

      const wrapper = TreeSelectMount({
        props: {
          open: true,
          dataSource: [
            { key: '0', label: '0' },
            { key: '1', label: '1', isLeaf: true },
          ],
          expandedKeys: undefined,
          loadChildren,
          loadedKeys: ['0'],
        },
      })

      let allNodes = wrapper.findComponent(Content).findAll('.ix-tree-node')

      expect(allNodes.length).toBe(2)

      await allNodes[0].find('.ix-tree-node-expand').trigger('click')

      expect(allNodes[0].find('.ix-tree-node-expand').find('.ix-icon-loading').exists()).toBe(false)

      await wait(50)

      allNodes = wrapper.findComponent(Content).findAll('.ix-tree-node')

      expect(allNodes.length).toBe(2)

      // await wrapper.setProps({ loadedKeys: [] })

      // await allNodes[0].find('.ix-tree-node-expand').trigger('click')

      // expect(allNodes[0].find('.ix-tree-node-expand').find('.ix-icon-loading').exists()).toBe(true)

      // await wait(50)

      // allNodes = wrapper.findComponent(Content).findAll('.ix-tree-node')

      // expect(allNodes.length).toBe(4)
    })

    test('v-model:open work', async () => {
      const wrapper = TreeSelectMount({ props: { open: true } })

      expect(wrapper.find('.ix-selector-opened').exists()).toBe(true)
      expect(wrapper.findComponent(Content).isVisible()).toBe(true)

      await wrapper.setProps({ open: false })

      expect(wrapper.find('.ix-selector-opened').exists()).toBe(false)
      expect(wrapper.findComponent(Content).isVisible()).toBe(false)
    })

    test('autofocus work', async () => {
      const wrapper = TreeSelectMount({ props: { autofocus: true } })
      await flushPromises()

      expect(wrapper.find('.ix-selector-opened').exists()).toBe(true)
      expect(wrapper.findComponent(Content).isVisible()).toBe(true)
    })

    test('custom keys work', async () => {
      const dataSource = [
        {
          text: 'Node 0',
          value: '0',
          options: [
            {
              text: 'Node 0-0',
              value: '0-0',
            },
            {
              text: 'Node 0-1',
              value: '0-1',
            },
            {
              text: 'Node 0-2',
              value: '0-2',
            },
          ],
        },
      ]

      const wrapper = TreeSelectMount({
        props: { value: '0', open: true, dataSource, childrenKey: 'options', labelKey: 'text', nodeKey: 'value' },
      })

      expect(wrapper.find('.ix-selector-item').text()).toBe('Node 0')
      expect(wrapper.html()).toMatchSnapshot()
    })

    test('clearable work', async () => {
      const onUpdateValue = vi.fn()
      const wrapper = TreeSelectMount({ props: { clearable: true, 'onUpdate:value': onUpdateValue } })

      expect(wrapper.find('.ix-selector-clearable').exists()).toBe(true)

      await wrapper.find('.ix-selector-clear').trigger('click')

      expect(onUpdateValue).toBeCalledWith(undefined)

      await wrapper.setProps({ clearable: false })

      expect(wrapper.find('.ix-selector-clearable').exists()).toBe(false)
    })

    test('clearIcon work', async () => {
      const wrapper = TreeSelectMount({ props: { clearable: true, clearIcon: 'up' } })

      expect(wrapper.find('.ix-selector-clear').find('.ix-icon-up').exists()).toBe(true)

      await wrapper.setProps({ clearIcon: 'down' })

      expect(wrapper.find('.ix-selector-clear').find('.ix-icon-down').exists()).toBe(true)
    })

    test('disabled work', async () => {
      const wrapper = TreeSelectMount({ props: { disabled: true } })

      expect(wrapper.find('.ix-selector-disabled').exists()).toBe(true)

      // await wrapper.find('.ix-select').trigger('click')

      // expect(wrapper.find('.ix-select-opened').exists()).toBe(false)

      await wrapper.setProps({ disabled: false })

      expect(wrapper.find('.ix-selector-disabled').exists()).toBe(false)

      // await wrapper.find('.ix-select').trigger('click')

      // expect(wrapper.find('.ix-select-opened').exists()).toBe(true)
    })

    test('readonly work', async () => {
      const wrapper = TreeSelectMount({
        props: { searchable: true, clearable: true, readonly: true, multiple: true, value: ['0'] },
      })

      expect(wrapper.find('.ix-selector-readonly').exists()).toBe(true)
      expect(wrapper.find('.ix-selector-clearable').exists()).toBe(false)
      expect(wrapper.find('.ix-selector-searchable').exists()).toBe(false)
      expect(wrapper.find('.ix-selector-item-remove').exists()).toBe(false)

      await wrapper.find('.ix-selector').trigger('click')

      expect(wrapper.find('.ix-selector-opened').exists()).toBe(false)

      await wrapper.setProps({ readonly: false })

      expect(wrapper.find('.ix-selector-readonly').exists()).toBe(false)
      expect(wrapper.find('.ix-selector-clearable').exists()).toBe(true)
      expect(wrapper.find('.ix-selector-searchable').exists()).toBe(true)
      expect(wrapper.find('.ix-selector-item-remove').exists()).toBe(true)

      await wrapper.find('.ix-selector').trigger('click')

      expect(wrapper.find('.ix-selector-opened').exists()).toBe(true)
    })

    test('overlayClassName work', async () => {
      const wrapper = TreeSelectMount({ props: { open: true, overlayClassName: 'test-class' } })

      expect(isElementVisible(document.querySelector('.test-class'))).toBe(true)

      await wrapper.setProps({ overlayClassName: undefined })

      expect(isElementVisible(document.querySelector('.test-class'))).toBe(false)
    })

    test('overlayRender work', async () => {
      const overlayRender = (children: VNode[]) => {
        return [children, h('div', { class: 'custom-render-div' })]
      }
      const wrapper = TreeSelectMount({ props: { open: true, overlayRender } })

      expect(wrapper.findComponent(Content).find('.custom-render-div').exists()).toBe(true)
    })

    test('searchable work', async () => {
      const onExpandedChange = vi.fn()
      const wrapper = TreeSelectMount({ props: { open: true, searchable: true, onExpandedChange } })

      const input = wrapper.find('input')
      input.setValue('invalid value')

      expect(wrapper.html()).toMatchSnapshot()

      await wrapper.setProps({ searchable: 'overlay' })

      let overlaySearchWrapper = wrapper.findComponent(Content).find('.ix-tree-select-overlay-search-wrapper')

      expect(overlaySearchWrapper.exists()).toBe(true)
      expect(overlaySearchWrapper.find('.ix-button').exists()).toBe(true)

      await overlaySearchWrapper.find('input').setValue('l')

      expect(wrapper.html()).toMatchSnapshot()

      await overlaySearchWrapper.find('.ix-button').trigger('click')
      expect(onExpandedChange).toBeCalled()

      await wrapper.setProps({ searchable: false })

      overlaySearchWrapper = wrapper.findComponent(Content).find('.ix-tree-select-overlay-search-wrapper')

      expect(input.element.style.opacity).toBe('0')
      expect(overlaySearchWrapper.exists()).toBe(false)
    })

    test('searchFn work', async () => {
      const wrapper = TreeSelectMount({
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

      const input = wrapper.find('input')
      await input.setValue('all')

      expect(wrapper.html()).toMatchSnapshot()

      // only math 0
      await input.setValue('test')

      expect(wrapper.html()).toMatchSnapshot()
    })

    test('size work', async () => {
      const wrapper = TreeSelectMount({ props: { size: 'lg' } })

      expect(wrapper.find('.ix-selector-lg').exists()).toBe(true)

      await wrapper.setProps({ size: 'sm' })

      expect(wrapper.find('.ix-selector-sm').exists()).toBe(true)

      await wrapper.setProps({ size: undefined })

      expect(wrapper.find('.ix-selector-md').exists()).toBe(true)
    })

    test('clearable props work', async () => {
      const wrapper = TreeSelectMount({ props: { clearable: true } })

      expect(wrapper.find('.ix-selector-clear').exists()).toBe(true)
    })
  })

  describe('multiple work', () => {
    const TreeSelectMount = (options?: MountingOptions<Partial<TreeSelectProps>>) => {
      const { props, ...rest } = options || {}
      return mount(TreeSelect, {
        ...rest,
        props: { dataSource: defaultDataSource, value: defaultSingleValue, multiple: true, expandedKeys, ...props },
        attachTo: 'body',
      })
    }

    renderWork<TreeSelectProps>(TreeSelect, {
      props: { open: true, dataSource: defaultDataSource, value: defaultMultipleValue },
      attachTo: 'body',
    })

    test('v-model:value work', async () => {
      const onUpdateValue = vi.fn()
      const onChange = vi.fn()
      const wrapper = TreeSelectMount({
        props: { open: true, value: ['0', '0-0'], 'onUpdate:value': onUpdateValue, onChange },
      })

      expect(wrapper.findAll('.ix-selector-item').length).toBe(2)

      await wrapper.setProps({ value: ['0'] })

      expect(wrapper.findAll('.ix-selector-item').length).toBe(1)

      const allNodes = wrapper.findComponent(Content).findAll('.ix-tree-node-content')

      await allNodes[1].trigger('click')
      expect(onUpdateValue).toBeCalledWith(['0', '0-0'])
      expect(onChange).toBeCalledWith(['0', '0-0'], ['0'])
    })

    test('maxLabel work', async () => {
      const wrapper = TreeSelectMount({ props: { maxLabel: 2, value: ['0', '0-0', '0-1'] } })

      let items = wrapper.findAll('.ix-selector-item')

      expect(items[0].text()).toBe('Node 0')
      expect(items[1].text()).toBe('Node 0-0')
      expect(items[2].text()).toBe('+ 1 ...')

      await wrapper.setProps({ maxLabel: 3 })

      items = wrapper.findAll('.ix-selector-item')

      expect(items[0].text()).toBe('Node 0')
      expect(items[1].text()).toBe('Node 0-0')
      expect(items[2].text()).toBe('Node 0-1')
    })

    test('checkable work', async () => {
      const wrapper = TreeSelectMount({ props: { open: true, checkable: true } })

      expect(wrapper.findComponent(Content).find('.ix-checkbox').exists()).toBe(true)

      await wrapper.setProps({ multiple: false })

      expect(wrapper.findComponent(Content).find('.ix-checkbox').exists()).toBe(false)
    })
  })

  describe('slot work', () => {
    const TreeSelectMount = (options?: MountingOptions<Partial<TreeSelectProps>>) => {
      const { props, ...rest } = options || {}
      return mount(TreeSelect, {
        ...rest,
        props: { dataSource: defaultDataSource, value: defaultSingleValue, expandedKeys, ...props },
        attachTo: 'body',
      })
    }

    test('empty work', async () => {
      let emptyText = 'empty text'
      const wrapper = TreeSelectMount({ props: { open: true, empty: emptyText, dataSource: [] } })

      expect(wrapper.findComponent(Content).find('.ix-empty-description').text()).toBe(emptyText)

      emptyText = 'empty text 2'
      await wrapper.setProps({ empty: { description: emptyText } })

      expect(wrapper.findComponent(Content).find('.ix-empty-description').text()).toBe(emptyText)
    })

    test('empty slot work', async () => {
      const wrapper = TreeSelectMount({
        props: { open: true, empty: 'empty text', dataSource: [] },
        slots: { empty: () => h(IxEmpty, { description: 'empty slot' }) },
      })

      expect(wrapper.findComponent(Content).find('.ix-empty-description').text()).toBe('empty slot')
    })

    test('placeholder work', async () => {
      const wrapper = TreeSelectMount({ props: { value: undefined, placeholder: 'placeholder' } })

      expect(wrapper.find('.ix-selector-placeholder').text()).toBe('placeholder')

      await wrapper.setProps({ value: 'tom' })

      expect(wrapper.find('.ix-selector-placeholder').exists()).toBe(false)

      await wrapper.setProps({ value: undefined })

      expect(wrapper.find('.ix-selector-placeholder').text()).toBe('placeholder')

      await wrapper.setProps({ placeholder: 'place' })

      expect(wrapper.find('.ix-selector-placeholder').text()).toBe('place')
    })

    test('placeholder slot work', async () => {
      const wrapper = TreeSelectMount({
        props: { value: undefined, placeholder: 'placeholder' },
        slots: { placeholder: () => 'placeholder slot' },
      })

      expect(wrapper.find('.ix-selector-placeholder').text()).toBe('placeholder slot')
    })

    test('suffix work', async () => {
      const wrapper = TreeSelectMount({ props: { suffix: 'up' } })

      expect(wrapper.find('.ix-icon-up').exists()).toBe(true)

      await wrapper.setProps({ suffix: undefined })

      expect(wrapper.find('.ix-icon-down').exists()).toBe(true)
    })

    test('suffix slot work', async () => {
      const wrapper = TreeSelectMount({ props: { suffix: 'down' }, slots: { suffix: () => h(IxIcon, { name: 'up' }) } })

      expect(wrapper.find('.ix-icon-up').exists()).toBe(true)
    })

    test('label slot work', async () => {
      const wrapper = TreeSelectMount({
        props: {
          dataSource: [
            {
              label: 'Node 0',
              key: '0',
              icon: 'github',
              children: [
                {
                  label: 'Node 0-0',
                  key: '0-0',
                  icon: 'github',
                },
                {
                  label: 'Node 0-1',
                  key: '0-1',
                  icon: 'github',
                },
                {
                  label: 'Node 0-2',
                  key: '0-2',
                  icon: 'github',
                },
              ],
            },
          ],
        },
        slots: { label: rawNode => h('div', [h(IxIcon, { name: rawNode.icon }), h('span', rawNode.label)]) },
      })

      expect(wrapper.find('.ix-icon-github').exists()).toBe(true)
      expect(wrapper.find('.ix-selector-item').text()).toBe('Node 0')
    })

    test('treeLabel slot work', async () => {
      const wrapper = TreeSelectMount({
        props: {
          open: true,
          dataSource: [
            {
              label: 'Node 0',
              key: '0',
              icon: 'github',
              children: [
                {
                  label: 'Node 0-0',
                  key: '0-0',
                  icon: 'github',
                },
                {
                  label: 'Node 0-1',
                  key: '0-1',
                  icon: 'github',
                },
                {
                  label: 'Node 0-2',
                  key: '0-2',
                  icon: 'github',
                },
              ],
            },
          ],
        },
        slots: { treeLabel: ({ node }) => h('div', [h(IxIcon, { name: node.icon }), h('span', node.label)]) },
      })

      expect(wrapper.findComponent(Content).find('.ix-icon-github').exists()).toBe(true)
      expect(wrapper.findComponent(Content).find('.ix-tree-node-content-label').text()).toBe('Node 0')
    })

    test('treePrefix && treeSuffix slot work', async () => {
      const wrapper = TreeSelectMount({
        props: {
          open: true,
          dataSource: [
            {
              label: 'Node 0',
              key: '0',
              treePrefix: 'github',
              treeSuffix: 'appstore',
              children: [
                {
                  label: 'Node 0-0',
                  key: '0-0',
                  treePrefix: 'github',
                  treeSuffix: 'appstore',
                },
                {
                  label: 'Node 0-1',
                  key: '0-1',
                  treePrefix: 'github',
                  treeSuffix: 'appstore',
                },
                {
                  label: 'Node 0-2',
                  key: '0-2',
                  treePrefix: 'github',
                  treeSuffix: 'appstore',
                },
              ],
            },
          ],
        },
        slots: {
          treePrefix: ({ node }) => h('div', [h(IxIcon, { name: node.treePrefix }), h('span', node.label)]),
          treeSuffix: ({ node }) => h('div', [h(IxIcon, { name: node.treeSuffix }), h('span', node.label)]),
        },
      })

      expect(wrapper.findComponent(Content).find('.ix-icon-github').exists()).toBe(true)
      expect(wrapper.findComponent(Content).find('.ix-icon-appstore').exists()).toBe(true)
      expect(wrapper.findComponent(Content).find('.ix-tree-node-content-label').text()).toBe('Node 0')
    })

    test('expandIcon work', async () => {
      const wrapper = TreeSelectMount({
        props: {
          open: true,
          expandIcon: 'up',
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
              ],
            },
          ],
        },
      })

      expect(wrapper.findComponent(Content).find('.ix-tree-node-expand').find('.ix-icon-up').exists()).toBe(true)

      await wrapper.setProps({ expandIcon: 'down' })

      expect(wrapper.findComponent(Content).find('.ix-tree-node-expand').find('.ix-icon-up').exists()).toBe(false)
      expect(wrapper.findComponent(Content).find('.ix-tree-node-expand').find('.ix-icon-down').exists()).toBe(true)

      await wrapper.setProps({ expandIcon: ['minus-square', 'plus-square'], expandedKeys: ['0'] })

      const allNodes = wrapper.findComponent(Content).findAll('.ix-tree-node')

      expect(wrapper.findComponent(Content).find('.ix-tree-node-expand').find('.ix-icon-up').exists()).toBe(false)
      expect(wrapper.findComponent(Content).find('.ix-tree-node-expand').find('.ix-icon-down').exists()).toBe(false)

      expect(allNodes[0].find('.ix-icon-minus-square').exists()).toBe(true)
      expect(allNodes[1].find('.ix-icon-plus-square').exists()).toBe(true)
    })

    test('expandIcon slot work', async () => {
      const onUpdateExpandedKeys = vi.fn()
      const wrapper = TreeSelectMount({
        props: { open: true, expandIcon: 'right', 'onUpdate:expandedKeys': onUpdateExpandedKeys },
        slots: {
          expandIcon: ({ expanded }: { expanded: boolean }) => h(IxIcon, { name: expanded ? 'down' : 'up' }),
        },
      })

      const allNodes = wrapper.findComponent(Content).findAll('.ix-tree-node')

      expect(allNodes[0].find('.ix-icon-down').exists()).toBe(true)

      await allNodes[0].find('.ix-tree-node-expand').trigger('click')

      expect(onUpdateExpandedKeys).toBeCalledWith([])

      await wrapper.setProps({ expandedKeys: ['0-0', '0-1'] })

      expect(wrapper.findComponent(Content).find('.ix-tree-node-expand').find('.ix-icon-up').exists()).toBe(true)
      expect(wrapper.findComponent(Content).find('.ix-tree-node-expand').find('.ix-icon-down').exists()).toBe(false)
    })

    test('leafLineIcon slot work', async () => {
      const wrapper = TreeSelectMount({
        props: { open: true, showLine: true },
        slots: {
          leafLineIcon: () => h(IxIcon, { name: 'up' }),
        },
      })

      expect(wrapper.findComponent(Content).findAll('.ix-tree-node')[1].find('.ix-icon-up').exists()).toBe(true)

      await wrapper.setProps({ showLine: false })

      expect(wrapper.findComponent(Content).findAll('.ix-tree-node')[1].find('.ix-icon-up').exists()).toBe(false)
    })

    test('maxLabel slot work', async () => {
      const wrapper = TreeSelectMount({
        props: {
          open: true,
          value: ['0', '0-0'],
          multiple: true,
          checkable: true,
          maxLabel: 1,
        },
        slots: {
          maxLabel: moreNodes => h('span', moreNodes.length),
        },
      })

      expect(wrapper.findAll('.ix-selector-item-label')[1].text()).toBe('1')
    })

    test('expandAll and collapseAll work', async () => {
      const onUpdateExpandedKeys = vi.fn()
      const wrapper = TreeSelectMount({
        props: {
          open: true,
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
      const wrapper = TreeSelectMount({
        props: {
          open: true,
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
})
