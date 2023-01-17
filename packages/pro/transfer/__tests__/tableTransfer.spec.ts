import type { TableColumn } from '@idux/components/table'

import { MountingOptions, mount } from '@vue/test-utils'

import { IxButton } from '@idux/components/button'
import TransferOperations from '@idux/components/transfer/src/TransferOperations'

import ProTransfer from '../src/ProTransfer'
import { ProTransferProps } from '../src/types'

describe('ProTransfer', () => {
  const mockedTableDataSource = Array.from(new Array(20)).map((_, idx) => ({
    key: idx,
    name: 'Option' + idx,
    age: idx,
    disabled: [1, 6, 12, 16].includes(idx),
  }))

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

  test('table transfer render work', async () => {
    const wrapper = ProTableTransferMount({ props: { value: [0, 1, 2, 3] } })
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
      .trigger('click')
    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[1]
      .find('.ix-checkbox')
      .find('input')
      .trigger('click')
    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[2]
      .find('.ix-checkbox')
      .find('input')
      .trigger('click')

    await appendTrigger.trigger('click')
    expect(onChange).toBeCalledWith([0, 1, 2, 3, 4, 5, 7], [0, 1, 2, 3, 4])

    await targetTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[0]
      .find('.ix-checkbox')
      .find('input')
      .trigger('click')
    await targetTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[1]
      .find('.ix-checkbox')
      .find('input')
      .trigger('click')
    await targetTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[2]
      .find('.ix-checkbox')
      .find('input')
      .trigger('click')
    await removeTrigger.trigger('click')
    expect(onChange).toBeCalledWith([1, 3, 4], [0, 1, 2, 3, 4])
  })

  test('table immediate work', async () => {
    const wrapper = ProTableTransferMount({ props: { mode: 'immediate' } })
    const [sourceTable] = wrapper.findAll('.ix-table')

    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[0]
      .find('.ix-checkbox')
      .find('input')
      .trigger('click')
    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[1]
      .find('.ix-checkbox')
      .find('input')
      .trigger('click')
    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[2]
      .find('.ix-checkbox')
      .find('input')
      .trigger('click')
    await sourceTable
      .find('tbody')
      .findAll('tr:not(.ix-table-measure-row)')[3]
      .find('.ix-checkbox')
      .find('input')
      .trigger('click')

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

    expect(targetTable.find('tbody').findAll('tr:not(.ix-table-measure-row)').length).toBe(1)
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
