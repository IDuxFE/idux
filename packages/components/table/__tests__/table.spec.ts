import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { IxEmpty } from '@idux/components/empty'
import { HeaderProps, IxHeader } from '@idux/components/header'
import { IxTag } from '@idux/components/tag'

import Table from '../src/Table'
import { TableColumn, TableProps } from '../src/types'

interface Data {
  key: number
  name: string
  age: number
  address: string
  tags: string[]
  description?: string
}

const columns: TableColumn<Data>[] = [
  {
    type: 'expandable',
    disabled: record => !record.description,
    customExpand: 'expand',
    customCell: 'name',
  },
  {
    type: 'selectable',
    disabled: record => !!record.description,
    multiple: true,
  },
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
  {
    title: 'Tags',
    dataKey: 'tags',
    customCell: ({ value }) =>
      value.map((tag: string) => {
        let color = tag.length > 5 ? 'warning' : 'success'
        if (tag === 'loser') {
          color = 'error'
        }
        return h(IxTag, { color }, { default: () => tag.toUpperCase() })
      }),
  },
  {
    title: 'Action',
    key: 'action',
    customCell: 'action',
  },
]

const dataSource: Data[] = []
for (let index = 0; index < 100; index++) {
  dataSource.push({
    key: index,
    name: `Edrward ${index}`,
    age: 18 + index,
    address: `London Park no. ${index}`,
    tags: ['nice', 'developer'],
    description:
      index % 3 === 0
        ? `My name is Edrward ${index}, I am ${18 + index} years old, living in London Park no. ${index}.`
        : '',
  })
}

interface CellOption {
  value: string
  record: Data
  rowIndex: number
}

const defaultSlots = {
  name: ({ value }: CellOption) => h('a', null, () => value),
  action: ({ record }: CellOption) => [
    h('a', { style: 'margin-right: 8px' }, () => `Invite ${record.name}`),
    h('a', null, () => 'Delete'),
  ],
  expand: ({ record }: CellOption) => h('span', null, () => record.description),
}

describe('Table', () => {
  describe('basic work', () => {
    const TableMount = (options?: MountingOptions<Partial<TableProps>>) => {
      const { props, slots, ...rest } = options || {}
      const mergedOptions = {
        props: { columns, dataSource, ...props },
        slots: { ...defaultSlots, ...slots },
        ...rest,
      } as MountingOptions<TableProps>
      return mount(Table, mergedOptions)
    }

    renderWork<TableProps>(Table, { props: { columns, dataSource }, slots: defaultSlots })

    test('v-model:expandedRowKeys work', async () => {
      const onUpdateExpandedRowKeys = vi.fn()
      const wrapper = TableMount({
        props: {
          expandedRowKeys: [0],
          'onUpdate:expandedRowKeys': onUpdateExpandedRowKeys,
        },
      })

      expect(wrapper.find('tbody').findAll('tr')[0].classes()).toContain('ix-table-row-expanded')

      await wrapper.setProps({ expandedRowKeys: [3] })

      expect(wrapper.find('tbody').findAll('tr')[0].classes()).not.toContain('ix-table-row-expanded')
      expect(wrapper.find('tbody').findAll('tr')[3].classes()).toContain('ix-table-row-expanded')

      await wrapper.find('tbody').findAll('tr')[3].find('.ix-table-expandable-trigger').trigger('click')

      expect(onUpdateExpandedRowKeys).toBeCalledWith([])
      await wrapper.setProps({ expandedRowKeys: [] })

      await wrapper.find('tbody').findAll('tr')[3].find('.ix-table-expandable-trigger').trigger('click')

      expect(onUpdateExpandedRowKeys).toBeCalledWith([3])
    })

    test('v-model:selectedRowKeys work', async () => {
      const onUpdateSelectedRowKeys = vi.fn()
      const wrapper = TableMount({
        props: {
          selectedRowKeys: [1],
          'onUpdate:selectedRowKeys': onUpdateSelectedRowKeys,
        },
      })

      expect(wrapper.find('tbody').findAll('tr')[1].classes()).toContain('ix-table-row-selected')

      await wrapper.setProps({ selectedRowKeys: [2] })

      expect(wrapper.find('tbody').findAll('tr')[1].classes()).not.toContain('ix-table-row-selected')
      expect(wrapper.find('tbody').findAll('tr')[2].classes()).toContain('ix-table-row-selected')

      await wrapper.find('tbody').findAll('tr')[2].find('.ix-checkbox').find('input').setValue(false)

      expect(onUpdateSelectedRowKeys).toBeCalledWith([])
      await wrapper.setProps({ selectedRowKeys: [] })

      await wrapper.find('tbody').findAll('tr')[2].find('.ix-checkbox').find('input').setValue(true)

      expect(onUpdateSelectedRowKeys).toBeCalledWith([2])
    })

    test('autoHeight work', async () => {
      const wrapper = TableMount({ props: { autoHeight: true } })

      expect(wrapper.classes()).toContain('ix-table-auto-height')

      await wrapper.setProps({ autoHeight: false })

      expect(wrapper.classes()).not.toContain('ix-table-auto-height')
    })

    test('borderless work', async () => {
      const wrapper = TableMount({ props: { borderless: true } })

      expect(wrapper.classes()).toContain('ix-table-borderless')

      await wrapper.setProps({ borderless: false })

      expect(wrapper.classes()).not.toContain('ix-table-borderless')
    })

    test('ellipsis work', async () => {
      const wrapper = TableMount({ props: { ellipsis: true } })

      expect(wrapper.find('thead').find('th').classes()).toContain('ix-table-ellipsis')
      expect(wrapper.find('tbody').find('td').classes()).toContain('ix-table-ellipsis')

      await wrapper.setProps({ ellipsis: false })

      expect(wrapper.find('thead').find('th').classes()).not.toContain('ix-table-ellipsis')
      expect(wrapper.find('tbody').find('td').classes()).not.toContain('ix-table-ellipsis')
    })

    test('ellipsis with title work', async () => {
      const wrapper = TableMount({ props: { ellipsis: { title: false } } })

      expect(wrapper.find('thead').findAll('th')[2].classes()).toContain('ix-table-ellipsis')
      expect(wrapper.find('tbody').findAll('td')[2].classes()).toContain('ix-table-ellipsis')
      expect(wrapper.find('thead').findAll('th')[2].attributes('title')).toBe(undefined)
      expect(wrapper.find('tbody').findAll('td')[2].attributes('title')).toBe(undefined)

      await wrapper.setProps({ ellipsis: { title: true } })

      expect(wrapper.find('thead').findAll('th')[2].classes()).toContain('ix-table-ellipsis')
      expect(wrapper.find('tbody').findAll('td')[2].classes()).toContain('ix-table-ellipsis')
      expect(wrapper.find('thead').findAll('th')[2].attributes('title')).not.toBe(undefined)
      expect(wrapper.find('tbody').findAll('td')[2].attributes('title')).not.toBe(undefined)
    })

    test('ellipsis with columns work', async () => {
      const wrapper = TableMount({
        props: {
          ellipsis: true,
          columns: [
            { title: 'Name', dataKey: 'name', ellipsis: true },
            { title: 'Age', dataKey: 'age', ellipsis: false },
            { title: 'Address', dataKey: 'address' },
          ],
        },
      })

      const ths = wrapper.find('thead').find('tr').findAll('th')
      const tds = wrapper.find('tbody').find('tr').findAll('td')

      expect(ths[0].classes()).toContain('ix-table-ellipsis')
      expect(ths[1].classes()).not.toContain('ix-table-ellipsis')
      expect(ths[2].classes()).toContain('ix-table-ellipsis')
      expect(tds[0].classes()).toContain('ix-table-ellipsis')
      expect(tds[1].classes()).not.toContain('ix-table-ellipsis')
      expect(tds[2].classes()).toContain('ix-table-ellipsis')

      await wrapper.setProps({ ellipsis: false })

      expect(ths[0].classes()).toContain('ix-table-ellipsis')
      expect(ths[1].classes()).not.toContain('ix-table-ellipsis')
      expect(ths[2].classes()).not.toContain('ix-table-ellipsis')
      expect(tds[0].classes()).toContain('ix-table-ellipsis')
      expect(tds[1].classes()).not.toContain('ix-table-ellipsis')
      expect(tds[2].classes()).not.toContain('ix-table-ellipsis')
    })

    test('empty work', async () => {
      let emptyText = 'empty text'
      const wrapper = TableMount({ props: { empty: emptyText, dataSource: [] } })

      expect(wrapper.find('tbody').find('.ix-empty-description').text()).toBe(emptyText)

      emptyText = 'empty text 2'
      await wrapper.setProps({ empty: { description: emptyText } })

      expect(wrapper.find('tbody').find('.ix-empty-description').text()).toBe(emptyText)
    })

    test('empty slot work', async () => {
      const wrapper = TableMount({
        props: { empty: 'empty text', dataSource: [] },
        slots: { empty: () => h(IxEmpty, { description: 'empty slot' }) },
      })

      expect(wrapper.find('tbody').find('.ix-empty-description').text()).toBe('empty slot')
    })

    test('header work', async () => {
      let header: string | HeaderProps = 'This is header'
      const wrapper = TableMount({ props: { header } })

      expect(wrapper.find('.ix-header').text()).toBe(header)

      header = 'This is header2'
      await wrapper.setProps({ header })

      expect(wrapper.find('.ix-header').text()).toBe(header)
      expect(wrapper.find('.ix-header').classes()).toContain('ix-header-md')

      header = { title: 'This is header2', size: 'lg' }
      await wrapper.setProps({ header })

      expect(wrapper.find('.ix-header').text()).toBe('This is header2')
      expect(wrapper.find('.ix-header').classes()).toContain('ix-header-lg')
    })

    test('header slot work', async () => {
      const header = 'This is header'
      const wrapper = TableMount({
        props: { header },
        slots: {
          header: () => h(IxHeader, { title: 'this is header2' }),
        },
      })

      expect(wrapper.find('.ix-header').text()).toBe('this is header2')
    })

    test('headless work', async () => {
      const wrapper = TableMount({
        props: { headless: true },
      })

      expect(wrapper.find('thead').exists()).toBe(false)

      await wrapper.setProps({ headless: false })

      expect(wrapper.find('thead').exists()).toBe(true)
    })

    test('pagination work', async () => {
      const wrapper = TableMount({
        props: { pagination: false },
      })

      expect(wrapper.find('.ix-table-pagination').exists()).toBe(false)

      await wrapper.setProps({ pagination: true })

      expect(wrapper.find('.ix-table-pagination').exists()).toBe(true)
      expect(wrapper.find('tbody').findAll('tr').length).toBe(10)

      await wrapper.setProps({ pagination: { pageSize: 20 } })

      expect(wrapper.find('tbody').findAll('tr').length).toBe(20)
    })

    test('rowClassName work', async () => {
      const wrapper = TableMount({
        props: { rowClassName: (_, index) => `test-table-${index}` },
      })

      const trs = wrapper.find('tbody').findAll('tr')

      trs.forEach((tr, index) => {
        tr.classes()
        expect(tr.classes()).toContain(`test-table-${index}`)
      })
    })

    test('size work', async () => {
      const wrapper = TableMount({ props: { size: 'lg' } })

      expect(wrapper.classes()).toContain('ix-table-lg')

      await wrapper.setProps({ size: 'sm' })

      expect(wrapper.classes()).toContain('ix-table-sm')
    })

    test('spin work', async () => {
      const wrapper = TableMount({ props: { spin: true } })

      expect(wrapper.find('.ix-spin').exists()).toBe(true)

      await wrapper.setProps({ spin: false })

      expect(wrapper.find('.ix-spin').exists()).toBe(true)

      await wrapper.setProps({ spin: undefined })

      expect(wrapper.find('.ix-spin').exists()).toBe(false)
    })
  })
})
