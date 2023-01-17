import { MountingOptions, mount } from '@vue/test-utils'

import { IxButton } from '@idux/components/button'
import { IxTransferList } from '@idux/components/transfer'
import TransferOperations from '@idux/components/transfer/src/TransferOperations'

import ProTransfer from '../src/ProTransfer'
import { ProTransferProps, TransferData } from '../src/types'

interface Data extends TransferData {
  key: string
  label: string
  disabled?: boolean
  children?: Data[]
}

const createData = (idx: number, includeDisabled = true): Data => ({
  key: `${idx}`,
  disabled: false,
  label: `Selection-${idx}`,
  children: [
    {
      key: `${idx}-1`,
      disabled: false,
      label: `Selection-${idx}-1`,
    },
    {
      key: `${idx}-2`,
      disabled: false,
      label: `Selection-${idx}-2`,
      children: [
        {
          key: `${idx}-2-1`,
          disabled: false,
          label: `Selection-${idx}-2-1`,
        },
        {
          key: `${idx}-2-2`,
          disabled: includeDisabled,
          label: `Selection-${idx}-2-2`,
        },
      ],
    },
    {
      key: `${idx}-3`,
      disabled: false,
      label: `Selection-${idx}-3`,
    },
  ],
})

describe('ProTransfer', () => {
  const expandedKeys = Array.from(new Array(5))
    .map((_, idx) => [idx + 1 + '', idx + 1 + '-2'])
    .flat()

  const mockedTreeDataSource = Array.from(new Array(5)).map((_, idx) => createData(idx + 1))
  const noneDisabledTreeDataSource = Array.from(new Array(5)).map((_, idx) => createData(idx + 1, false))

  const proTreeTransferMount = (options?: MountingOptions<Partial<ProTransferProps>>) => {
    const _options = options ?? {}
    _options.props = {
      dataSource: mockedTreeDataSource,
      sourceExpandedKeys: expandedKeys,
      targetExpandedKeys: expandedKeys,
      ...(_options.props ?? {}),
      type: 'tree',
    }
    return mount(ProTransfer, _options)
  }

  test('tree transfer render work', async () => {
    const wrapper = proTreeTransferMount({ props: { value: ['1-2', '1-2-1', '1-2-2'] } })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('tree v-model:value work', async () => {
    const onChange = vi.fn()
    const wrapper = proTreeTransferMount({ props: { value: ['1-2', '1-2-1', '1-2-2'], onChange } })

    const [sourceTree, targetTree] = wrapper.findAll('.ix-tree')
    const [appendTrigger, removeTrigger] = wrapper.findComponent(TransferOperations).findAllComponents(IxButton)

    expect(sourceTree.findAll('.ix-tree-node').length).toBe(27)
    expect(targetTree.findAll('.ix-tree-node').length).toBe(4)

    await wrapper.setProps({ value: ['1-2-2'] })

    expect(sourceTree.findAll('.ix-tree-node').length).toBe(29)
    expect(targetTree.findAll('.ix-tree-node').length).toBe(3)

    await sourceTree.findAll('.ix-tree-node')[0].find('input').setValue(true)
    await appendTrigger.trigger('click')

    expect(onChange).toBeCalledWith(['1-2-2', '1', '1-2', '1-2-1', '1-1', '1-3'], ['1-2-2'])

    await wrapper.setProps({ value: ['1-2-2', '1', '1-2', '1-2-1', '1-1', '1-3'] })

    await targetTree.findAll('.ix-tree-node')[0].find('input').setValue(true)
    await removeTrigger.trigger('click')

    expect(onChange).toBeCalledWith(['1-2-2'], ['1-2-2', '1', '1-2', '1-2-1', '1-1', '1-3'])
  })

  test('tree disableData work', async () => {
    const onChange = vi.fn()
    const wrapper = proTreeTransferMount({
      props: {
        dataSource: noneDisabledTreeDataSource,
        value: ['1-2', '1-2-1', '1-2-2'],
        disableData: (item: Data) => item.key.endsWith('-2-2'),
        onChange,
      },
    })

    const [sourceTree, targetTree] = wrapper.findAll('.ix-tree')
    const [appendTrigger, removeTrigger] = wrapper.findComponent(TransferOperations).findAllComponents(IxButton)

    expect(sourceTree.findAll('.ix-tree-node').length).toBe(27)
    expect(targetTree.findAll('.ix-tree-node').length).toBe(4)

    await wrapper.setProps({ value: ['1-2-2'] })

    expect(sourceTree.findAll('.ix-tree-node').length).toBe(29)
    expect(targetTree.findAll('.ix-tree-node').length).toBe(3)

    await sourceTree.findAll('.ix-tree-node')[0].find('input').setValue(true)
    await appendTrigger.trigger('click')

    expect(onChange).toBeCalledWith(['1-2-2', '1', '1-2', '1-2-1', '1-1', '1-3'], ['1-2-2'])

    await wrapper.setProps({ value: ['1-2-2', '1', '1-2', '1-2-1', '1-1', '1-3'] })

    await targetTree.findAll('.ix-tree-node')[0].find('input').setValue(true)
    await removeTrigger.trigger('click')

    expect(onChange).toBeCalledWith(['1-2-2'], ['1-2-2', '1', '1-2', '1-2-1', '1-1', '1-3'])
  })

  test('tree immediate work', async () => {
    const wrapper = proTreeTransferMount({ props: { mode: 'immediate' } })

    const [sourceTree] = wrapper.findAll('.ix-tree')

    await sourceTree.findAll('.ix-tree-node')[0].find('input').setValue(true)

    const [, targetTree] = wrapper.findAll('.ix-tree')

    expect(targetTree.findAll('.ix-tree-node').length).toBe(5)

    await targetTree.findAll('.ix-tree-node')[0].find('.ix-pro-transfer-tree-content-close-icon').trigger('click')

    expect(wrapper.findAll('.ix-tree')[1]).toBeUndefined()
  })

  test('tree cascaderStrategy off work', async () => {
    const onChange = vi.fn()
    const wrapper = proTreeTransferMount({
      props: { dataSource: noneDisabledTreeDataSource, onChange, treeProps: { cascaderStrategy: 'off' } },
    })

    const [appendTrigger, removeTrigger] = wrapper.findComponent(TransferOperations).findAllComponents(IxButton)

    const [sourceTree] = wrapper.findAll('.ix-tree')
    const sourceNodes = sourceTree.findAll('.ix-tree-node')
    await sourceNodes[2].find('input').setValue(true)
    await sourceNodes[3].find('input').setValue(true)
    await sourceNodes[4].find('input').setValue(true)
    await appendTrigger.trigger('click')

    const targetList = wrapper.findComponent(IxTransferList)

    expect(targetList.findAll('.ix-transfer-list-item').length).toBe(3)
    expect(onChange).toBeCalledWith(['1-2', '1-2-1', '1-2-2'], [])

    await onChange.mockClear()

    await targetList.findAll('.ix-transfer-list-item')[0].find('input').setValue(true)
    await removeTrigger.trigger('click')

    expect(targetList.findAll('.ix-transfer-list-item').length).toBe(2)
    expect(onChange).toBeCalledWith(['1-2-1', '1-2-2'], ['1-2', '1-2-1', '1-2-2'])
  })

  test('tree cascaderStrategy child work', async () => {
    const onChange = vi.fn()
    const wrapper = proTreeTransferMount({
      props: { dataSource: noneDisabledTreeDataSource, onChange, treeProps: { cascaderStrategy: 'child' } },
    })

    const [appendTrigger, removeTrigger] = wrapper.findComponent(TransferOperations).findAllComponents(IxButton)

    const [sourceTree] = wrapper.findAll('.ix-tree')
    const sourceNodes = sourceTree.findAll('.ix-tree-node')
    await sourceNodes[2].find('input').setValue(true)
    await sourceNodes[3].find('input').setValue(true)
    await sourceNodes[4].find('input').setValue(true)
    await appendTrigger.trigger('click')

    const [, targetTree] = wrapper.findAll('.ix-tree')

    expect(targetTree.findAll('.ix-tree-node').length).toBe(4)
    expect(onChange).toBeCalledWith(['1-2-1', '1-2-2'], [])

    await onChange.mockClear()

    await targetTree.findAll('.ix-tree-node')[2].find('input').setValue(true)
    await removeTrigger.trigger('click')

    expect(targetTree.findAll('.ix-tree-node').length).toBe(3)
    expect(onChange).toBeCalledWith(['1-2-2'], ['1-2-1', '1-2-2'])
  })

  test('tree cascaderStrategy parent work', async () => {
    const onChange = vi.fn()
    const wrapper = proTreeTransferMount({
      props: { dataSource: noneDisabledTreeDataSource, onChange, treeProps: { cascaderStrategy: 'parent' } },
    })

    const [appendTrigger, removeTrigger] = wrapper.findComponent(TransferOperations).findAllComponents(IxButton)

    const [sourceTree] = wrapper.findAll('.ix-tree')
    const sourceNodes = sourceTree.findAll('.ix-tree-node')
    await sourceNodes[2].find('input').setValue(true)
    await sourceNodes[3].find('input').setValue(true)
    await sourceNodes[4].find('input').setValue(true)
    await appendTrigger.trigger('click')

    const [, targetTree] = wrapper.findAll('.ix-tree')

    expect(targetTree.findAll('.ix-tree-node').length).toBe(4)
    expect(onChange).toBeCalledWith(['1-2'], [])

    await onChange.mockClear()

    await targetTree.findAll('.ix-tree-node')[2].find('input').setValue(true)
    await removeTrigger.trigger('click')

    expect(targetTree.findAll('.ix-tree-node').length).toBe(3)
    expect(onChange).toBeCalledWith(['1-2-2'], ['1-2'])
  })

  test('flatTargetData work', async () => {
    const wrapper = proTreeTransferMount({ props: { flatTargetData: true } })

    const sourceTree = wrapper.find('.ix-tree')
    const [appendTrigger, removeTrigger] = wrapper.findComponent(TransferOperations).findAllComponents(IxButton)

    await sourceTree.findAll('.ix-tree-node')[0].find('input').setValue(true)
    await appendTrigger.trigger('click')

    const targetList = wrapper.findComponent(IxTransferList)

    expect(targetList.findAll('.ix-transfer-list-item').length).toBe(3)

    await Promise.all(
      targetList
        .findAll('.ix-transfer-list-item')
        .slice(0, 2)
        .map(item => item.find('input').setValue(true)),
    )

    await removeTrigger.trigger('click')

    expect(targetList.findAll('.ix-transfer-list-item').length).toBe(1)
  })

  test('flatTargetData and immediate work', async () => {
    const wrapper = proTreeTransferMount({ props: { flatTargetData: true, mode: 'immediate' } })

    const sourceTree = wrapper.find('.ix-tree')

    await sourceTree.findAll('.ix-tree-node')[0].find('input').setValue(true)

    const targetList = wrapper.findComponent(IxTransferList)

    expect(targetList.findAll('.ix-transfer-list-item').length).toBe(3)

    await targetList.findAll('.ix-transfer-list-item')[0].find('.ix-transfer-list-item-close-icon').trigger('click')
    await targetList.findAll('.ix-transfer-list-item')[1].find('.ix-transfer-list-item-close-icon').trigger('click')

    expect(targetList.findAll('.ix-transfer-list-item').length).toBe(1)
  })

  test('loadChildren work', async () => {
    const onChange = vi.fn()
    const loadChildren = (node: Data) => {
      const depth = node.key.split('-').length
      if (depth > 2) {
        return
      }

      return Array.from(new Array(5)).map((_, index) => ({
        key: `${node.key}-${index + 1}`,
        disabled: false,
        label: `${node.label}-${index + 1}`,
        children: [],
        isLeaf: depth >= 2,
      }))
    }
    const wrapper = proTreeTransferMount({
      props: {
        dataSource: [
          {
            key: '1',
            disabled: false,
            label: 'Selection-1',
            children: [],
          },
          {
            key: '2',
            disabled: false,
            label: 'Selection-2',
            children: [],
          },
        ],
        treeProps: { loadChildren },
        sourceExpandedKeys: ['1', '1-1', '2', '2-1'],
        targetExpandedKeys: ['1', '1-1', '2', '2-1'],
        onChange,
      },
    })

    const [appendTrigger, removeTrigger] = wrapper.findComponent(TransferOperations).findAllComponents(IxButton)

    const [sourceTree] = wrapper.findAll('.ix-tree')
    expect(sourceTree.findAll('.ix-tree-node').length).toBe(2)

    const sourceNodes = sourceTree.findAll('.ix-tree-node')
    await sourceNodes[0].find('.ix-tree-node-expand').trigger('click')
    await sourceNodes[1].find('.ix-tree-node-expand').trigger('click')
    expect(sourceTree.findAll('.ix-tree-node').length).toBe(12)

    await sourceTree.findAll('.ix-tree-node')[0].find('input').setValue(true)
    await appendTrigger.trigger('click')

    const [, targetTree] = wrapper.findAll('.ix-tree')

    expect(sourceTree.findAll('.ix-tree-node').length).toBe(6)
    expect(targetTree.findAll('.ix-tree-node').length).toBe(6)
    expect(onChange).toBeCalledWith(['1', '1-1', '1-2', '1-3', '1-4', '1-5'], [])

    onChange.mockClear()

    await targetTree.findAll('.ix-tree-node')[1].find('.ix-tree-node-expand').trigger('click')
    expect(sourceTree.findAll('.ix-tree-node').length).toBe(6)
    expect(targetTree.findAll('.ix-tree-node').length).toBe(11)
    expect(onChange).toBeCalledWith(
      ['1', '1-1', '1-2', '1-3', '1-4', '1-5', '1-1-1', '1-1-2', '1-1-3', '1-1-4', '1-1-5'],
      ['1', '1-1', '1-2', '1-3', '1-4', '1-5'],
    )

    await targetTree.findAll('.ix-tree-node')[0].find('input').setValue(true)
    await removeTrigger.trigger('click')
    expect(sourceTree.findAll('.ix-tree-node').length).toBe(17)
    expect(wrapper.findAll('.ix-tree')[1]).toBeUndefined()
    expect(onChange).toBeCalledWith(
      [],
      ['1', '1-1', '1-2', '1-3', '1-4', '1-5', '1-1-1', '1-1-2', '1-1-3', '1-1-4', '1-1-5'],
    )
  })
})
