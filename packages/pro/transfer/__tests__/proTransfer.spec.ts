import type { TableColumn } from '@idux/components/table'

import { MountingOptions, mount } from '@vue/test-utils'

import { ɵCheckableList } from '@idux/components/_private/checkable-list'
import { IxButton } from '@idux/components/button'
import TransferOperations from '@idux/components/transfer/src/TransferOperations'

import ProTransfer from '../src/ProTransfer'
import { ProTransferProps } from '../src/types'

interface Data {
  key: string
  label: string
  disabled?: boolean
  children?: Data[]
}

const createData = (idx: number): Data => ({
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
          disabled: true,
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
  const mockedTableDataSource = Array.from(new Array(20)).map((_, idx) => ({
    key: idx,
    name: 'Option' + idx,
    age: idx,
    disabled: [1, 6, 12, 16].includes(idx),
  }))
  const expandedKeys = Array.from(new Array(5))
    .map((_, idx) => [idx + 1 + '', idx + 1 + '-2'])
    .flat()

  const mockedTreeDataSource = Array.from(new Array(5)).map((_, idx) => createData(idx + 1))

  const ProTableTransferMount = (options?: MountingOptions<Partial<ProTransferProps>>) => {
    const sourceColumns: TableColumn[] = [
      {
        title: 'Name',
        dataKey: 'name',
      },
      {
        title: 'Age',
        dataKey: 'age',
      },
      {
        title: 'Address',
        dataKey: 'address',
      },
    ]

    const targetColumns: TableColumn[] = [
      {
        title: 'Name',
        dataKey: 'name',
      },
    ]

    const tableProps = {
      sourceColumns,
      targetColumns,
    }

    const _options = options ?? {}
    _options.props = {
      dataSource: mockedTableDataSource,
      tableProps: { ...(_options.props?.tableProps ?? {}), ...tableProps },
      ...(_options.props ?? {}),
      type: 'table',
    }
    return mount(ProTransfer, _options)
  }

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

  test('table transfer render work', async () => {
    const wrapper = ProTableTransferMount({ props: { value: [0, 1, 2, 3] } })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('tree transfer render work', async () => {
    const wrapper = proTreeTransferMount({ props: { value: ['1-2', '1-2-1', '1-2-2'] } })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('table v-model:value work', async () => {
    const onChange = vi.fn()
    const wrapper = ProTableTransferMount({ props: { value: [0, 1, 2, 3], onChange } })

    const [sourceTable, targetTable] = wrapper.findAll('.ix-table')
    const [appendTrigger, removeTrigger] = wrapper.findComponent(TransferOperations).findAllComponents(IxButton)

    expect(sourceTable.find('tbody').findAll('tr:not(.ix-table-measure-row)').length).toBe(16)
    expect(targetTable.find('tbody').findAll('tr:not(.ix-table-measure-row)').length).toBe(4)

    await wrapper.setProps({ value: [0, 1, 2, 3, 4] })

    expect(sourceTable.find('tbody').findAll('tr:not(.ix-table-measure-row)').length).toBe(15)
    expect(targetTable.find('tbody').findAll('tr:not(.ix-table-measure-row)').length).toBe(5)

    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[0]
      .find('.ix-checkbox')
      .find('input')
      .setValue(true)
    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[1]
      .find('.ix-checkbox')
      .find('input')
      .setValue(true)
    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[2]
      .find('.ix-checkbox')
      .find('input')
      .setValue(true)

    await appendTrigger.trigger('click')
    expect(onChange).toBeCalledWith([0, 1, 2, 3, 4, 5, 7], [0, 1, 2, 3, 4])

    await targetTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[0]
      .find('.ix-checkbox')
      .find('input')
      .setValue(true)
    await targetTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[1]
      .find('.ix-checkbox')
      .find('input')
      .setValue(true)
    await targetTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[2]
      .find('.ix-checkbox')
      .find('input')
      .setValue(true)
    await removeTrigger.trigger('click')
    expect(onChange).toBeCalledWith([1, 3, 4], [0, 1, 2, 3, 4])
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

    expect(onChange).toBeCalledWith(['1-2-2', '1', '1-1', '1-2', '1-2-1', '1-3'], ['1-2-2'])

    await wrapper.setProps({ value: ['1-2-2', '1', '1-1', '1-2', '1-2-1', '1-3'] })

    await targetTree.findAll('.ix-tree-node')[0].find('input').setValue(true)
    await removeTrigger.trigger('click')

    expect(onChange).toBeCalledWith(['1-2-2'], ['1-2-2', '1', '1-1', '1-2', '1-2-1', '1-3'])
  })

  test('table immediate work', async () => {
    const wrapper = ProTableTransferMount({ props: { mode: 'immediate' } })
    const [sourceTable] = wrapper.findAll('.ix-table')

    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[0]
      .find('.ix-checkbox')
      .find('input')
      .setValue(true)
    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[1]
      .find('.ix-checkbox')
      .find('input')
      .setValue(true)
    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[2]
      .find('.ix-checkbox')
      .find('input')
      .setValue(true)
    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[3]
      .find('.ix-checkbox')
      .find('input')
      .setValue(true)

    const [, targetTable] = wrapper.findAll('.ix-table')

    expect(targetTable.find('tbody').findAll('tr:not(.ix-table-measure-row)').length).toBe(3)
    expect(
      targetTable
        .find('tbody')
        .find('tr:not(.ix-table-measure-row)')
        .find('.ix-pro-transfer-table-content-removable-label')
        .exists(),
    ).toBeTruthy()

    await Promise.all(
      targetTable
        .find('tbody')
        .findAll('tr:not(.ix-table-measure-row)')
        .slice(0, 2)
        .map(tr => tr.find('.ix-pro-transfer-table-content-close-icon').trigger('click')),
    )

    expect(targetTable.find('tbody').findAll('tr:not(.ix-table-measure-row)').length).toBe(2)
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

  test('flatTargetData work', async () => {
    const wrapper = proTreeTransferMount({ props: { flatTargetData: true } })

    const sourceTree = wrapper.find('.ix-tree')
    const [appendTrigger, removeTrigger] = wrapper.findComponent(TransferOperations).findAllComponents(IxButton)

    await sourceTree.findAll('.ix-tree-node')[0].find('input').setValue(true)
    await appendTrigger.trigger('click')

    const targetList = wrapper.findComponent(ɵCheckableList)

    expect(targetList.findAll('.ix-checkable-list-item').length).toBe(3)

    await Promise.all(
      targetList
        .findAll('.ix-checkable-list-item')
        .slice(0, 2)
        .map(item => item.find('input').setValue(true)),
    )

    await removeTrigger.trigger('click')

    expect(targetList.findAll('.ix-checkable-list-item').length).toBe(1)
  })

  test('flatTargetData and immediate work', async () => {
    const wrapper = proTreeTransferMount({ props: { flatTargetData: true, mode: 'immediate' } })

    const sourceTree = wrapper.find('.ix-tree')

    await sourceTree.findAll('.ix-tree-node')[0].find('input').setValue(true)

    const targetList = wrapper.findComponent(ɵCheckableList)

    expect(targetList.findAll('.ix-checkable-list-item').length).toBe(3)

    await targetList.findAll('.ix-checkable-list-item')[0].find('.ix-checkable-list-item-close-icon').trigger('click')
    await targetList.findAll('.ix-checkable-list-item')[1].find('.ix-checkable-list-item-close-icon').trigger('click')

    expect(targetList.findAll('.ix-checkable-list-item').length).toBe(1)
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

  test('table custom label work', async () => {
    const sourceColumns: TableColumn[] = [
      {
        title: 'Name',
        dataKey: 'name',
      },
      {
        title: 'Age',
        dataKey: 'age',
      },
      {
        title: 'Address',
        dataKey: 'address',
      },
    ]

    const targetColumns: TableColumn[] = [
      {
        title: 'Name',
        dataKey: 'name',
        customCell: () => 'transfer custom Cell test',
      },
    ]

    const wrapper = ProTableTransferMount({
      props: {
        mode: 'immediate',
        value: [0],
        tableProps: {
          sourceColumns,
          targetColumns,
        },
      },
    })

    const label = wrapper
      .findAll('.ix-table')[1]
      .find('tbody')
      .find('tr:not(.ix-table-measure-row)')
      .find('.ix-pro-transfer-table-content-removable-label')
    expect(label.text()).toContain('transfer custom Cell test')
    expect(label.find('.ix-pro-transfer-table-content-close-icon').exists()).toBe(true)
  })

  test('table custom label with slot work', async () => {
    const sourceColumns: TableColumn[] = [
      {
        title: 'Name',
        dataKey: 'name',
      },
      {
        title: 'Age',
        dataKey: 'age',
      },
      {
        title: 'Address',
        dataKey: 'address',
      },
    ]

    const targetColumns: TableColumn[] = [
      {
        title: 'Name',
        dataKey: 'name',
        customCell: 'transferTargetCell',
      },
    ]

    const wrapper = ProTableTransferMount({
      props: {
        mode: 'immediate',
        value: [0],
        tableProps: {
          sourceColumns,
          targetColumns,
        },
      },
      slots: {
        transferTargetCell: () => 'transfer custom Cell test',
      },
    })

    const label = wrapper
      .findAll('.ix-table')[1]
      .find('tbody')
      .find('tr:not(.ix-table-measure-row)')
      .find('.ix-pro-transfer-table-content-removable-label')
    expect(label.text()).toContain('transfer custom Cell test')
    expect(label.find('.ix-pro-transfer-table-content-close-icon').exists()).toBe(true)
  })
})
