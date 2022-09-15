import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import Transfer from '../src/Transfer'
import TransferContent from '../src/content/Content'
import TransferListItem from '../src/list/ListItem'
import { TransferListSlotParams, TransferOperationsSlotParams, TransferProps } from '../src/types'

const mockedDataSource = Array.from(new Array(20)).map((_, idx) => ({
  key: idx,
  value: idx,
  disabled: [1, 6, 12, 16].includes(idx),
}))

describe('Transfer', () => {
  const TransferMount = (options?: MountingOptions<Partial<TransferProps>>) =>
    mount(Transfer, { ...(options as MountingOptions<TransferProps>) })

  const testSlot = async (slot: string) => {
    const getCls = (isSource: boolean, cls: string) => `${isSource ? 'source' : 'target'}-${cls}`
    const selectAll = true
    let selectedKeys: number[] = []
    let searchValue = ''
    const wrapper = TransferMount({
      props: {
        dataSource: mockedDataSource,
        searchable: true,
        searchFn(isSource, item, searchValue) {
          return `${item.value}`.indexOf(searchValue) > -1
        },
      },
      slots: {
        [slot]: (params: TransferListSlotParams) =>
          h('div', [
            h('span', { class: getCls(params.isSource, 'data') }, params.data.length),
            h('span', { class: getCls(params.isSource, 'filteredData') }, params.filteredData.length),
            h('span', { class: getCls(params.isSource, 'paginatedData') }, params.paginatedData.length),
            h('span', { class: getCls(params.isSource, 'dataSource') }, params.dataSource.length),
            h('span', { class: getCls(params.isSource, 'dataKeyMap') }, params.dataKeyMap.size),
            h('span', { class: getCls(params.isSource, 'filteredDataSource') }, params.filteredDataSource.length),
            h('span', { class: getCls(params.isSource, 'paginatedDataSource') }, params.paginatedDataSource.length),
            h('span', { class: getCls(params.isSource, 'targetKeySet') }, params.targetKeySet.size),
            h('span', { class: getCls(params.isSource, 'selectedKeys') }, params.selectedKeys.length),
            h('span', { class: getCls(params.isSource, 'selectedKeySet') }, params.selectedKeySet.size),
            h('span', { class: getCls(params.isSource, 'disabledKeys') }, params.disabledKeys.size),
            h('span', { class: getCls(params.isSource, 'selectAllDisabled') }, params.selectAllDisabled),
            h(
              'span',
              { class: getCls(params.isSource, 'selectAllStatus') },
              `${params.selectAllStatus.checked}-${params.selectAllStatus.indeterminate}`,
            ),
            h('span', { class: getCls(params.isSource, 'showSelectAll') }, params.showSelectAll),
            h('span', { class: getCls(params.isSource, 'searchable') }, params.searchable),
            h('span', {
              class: getCls(params.isSource, 'handleSelectChange'),
              onClick: () => params.handleSelectChange(selectedKeys),
            }),
            h('span', { class: getCls(params.isSource, 'selectAll'), onClick: () => params.selectAll(selectAll) }),
            h('span', { class: getCls(params.isSource, 'searchValue') }, params.searchValue),
            h('span', {
              class: getCls(params.isSource, 'handleSearchChange'),
              onClick: () => params.handleSearchChange(searchValue),
            }),
          ]),
        operations: (params: TransferOperationsSlotParams) =>
          h('div', [
            h('span', { class: 'triggerAppend', onClick: () => params.triggerAppend() }),
            h('span', { class: 'triggerRemove', onClick: () => params.triggerRemove() }),
            h('span', {
              class: 'triggerAppendAll',
              onClick: () => params.triggerAppendAll(),
            }),
            h('span', { class: 'triggerClear', onClick: () => params.triggerClear() }),
          ]),
      },
    })

    expect(wrapper.element).toMatchSnapshot()

    expect(wrapper.find('.source-data').text()).toBe('20')
    expect(wrapper.find('.source-filteredData').text()).toBe('20')
    expect(wrapper.find('.source-paginatedData').text()).toBe('20')
    expect(wrapper.find('.source-dataSource').text()).toBe('20')
    expect(wrapper.find('.source-dataKeyMap').text()).toBe('20')
    expect(wrapper.find('.source-filteredDataSource').text()).toBe('20')
    expect(wrapper.find('.source-paginatedDataSource').text()).toBe('20')
    expect(wrapper.find('.source-targetKeySet').text()).toBe('0')
    expect(wrapper.find('.source-selectedKeys').text()).toBe('0')
    expect(wrapper.find('.source-selectedKeySet').text()).toBe('0')
    expect(wrapper.find('.source-disabledKeys').text()).toBe('4')
    expect(wrapper.find('.source-selectAllDisabled').text()).toBe('false')
    expect(wrapper.find('.source-selectAllStatus').text()).toBe('false-false')
    expect(wrapper.find('.source-showSelectAll').text()).toBe('true')
    expect(wrapper.find('.source-searchable').text()).toBe('true')
    expect(wrapper.find('.source-searchValue').text()).toBe('')

    expect(wrapper.find('.target-data').text()).toBe('0')
    expect(wrapper.find('.target-filteredData').text()).toBe('0')
    expect(wrapper.find('.target-paginatedData').text()).toBe('0')
    expect(wrapper.find('.target-dataSource').text()).toBe('20')
    expect(wrapper.find('.target-dataKeyMap').text()).toBe('20')
    expect(wrapper.find('.target-filteredDataSource').text()).toBe('20')
    expect(wrapper.find('.target-paginatedDataSource').text()).toBe('20')
    expect(wrapper.find('.target-targetKeySet').text()).toBe('0')
    expect(wrapper.find('.target-selectedKeys').text()).toBe('0')
    expect(wrapper.find('.target-selectedKeySet').text()).toBe('0')
    expect(wrapper.find('.target-disabledKeys').text()).toBe('0')
    expect(wrapper.find('.target-selectAllDisabled').text()).toBe('true')
    expect(wrapper.find('.target-selectAllStatus').text()).toBe('false-false')
    expect(wrapper.find('.target-showSelectAll').text()).toBe('true')
    expect(wrapper.find('.target-searchable').text()).toBe('true')
    expect(wrapper.find('.target-searchValue').text()).toBe('')

    await wrapper.find('.source-selectAll').trigger('click')
    expect(wrapper.find('.source-selectedKeys').text()).toBe('16')
    expect(wrapper.find('.source-selectedKeySet').text()).toBe('16')

    selectedKeys = [7, 8, 9, 10, 11, 12]
    await wrapper.find('.source-handleSelectChange').trigger('click')
    expect(wrapper.find('.source-selectedKeys').text()).toBe('6')
    expect(wrapper.find('.source-selectedKeySet').text()).toBe('6')

    await wrapper.find('.triggerAppend').trigger('click')
    expect(wrapper.find('.source-selectedKeys').text()).toBe('0')
    expect(wrapper.find('.source-selectedKeySet').text()).toBe('0')
    expect(wrapper.find('.source-data').text()).toBe('15')
    expect(wrapper.find('.target-data').text()).toBe('5')

    await wrapper.find('.triggerAppendAll').trigger('click')
    expect(wrapper.find('.source-data').text()).toBe('4')
    expect(wrapper.find('.target-data').text()).toBe('16')

    searchValue = '9'
    await wrapper.find('.target-handleSearchChange').trigger('click')
    expect(wrapper.find('.target-searchValue').text()).toBe('9')
    expect(wrapper.find('.target-filteredData').text()).toBe('2')

    await wrapper.find('.target-selectAll').trigger('click')
    expect(wrapper.find('.target-selectedKeys').text()).toBe('16')
    expect(wrapper.find('.target-selectedKeySet').text()).toBe('16')

    selectedKeys = [7, 8, 9, 10, 11]
    await wrapper.find('.target-handleSelectChange').trigger('click')
    expect(wrapper.find('.target-selectedKeys').text()).toBe('5')
    expect(wrapper.find('.target-selectedKeySet').text()).toBe('5')

    await wrapper.find('.triggerRemove').trigger('click')
    expect(wrapper.find('.target-selectedKeys').text()).toBe('0')
    expect(wrapper.find('.target-selectedKeySet').text()).toBe('0')
    expect(wrapper.find('.source-data').text()).toBe('9')
    expect(wrapper.find('.target-data').text()).toBe('11')

    await wrapper.find('.triggerClear').trigger('click')
    expect(wrapper.find('.source-data').text()).toBe('20')
    expect(wrapper.find('.target-data').text()).toBe('0')

    searchValue = '9'
    await wrapper.find('.source-handleSearchChange').trigger('click')
    expect(wrapper.find('.source-searchValue').text()).toBe('9')
    expect(wrapper.find('.source-filteredData').text()).toBe('2')
  }

  test('default slot work', async () => {
    await testSlot('default')
  })

  test('footer slot work', async () => {
    await testSlot('footer')
  })

  test('label slot work', async () => {
    const wrapper = TransferMount({
      props: { dataSource: mockedDataSource },
      slots: {
        label: () => h('div', { class: 'custom-label-slot-test' }),
      },
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(
      wrapper.findAllComponents(TransferListItem).every(item => item.find('.custom-label-slot-test').exists()),
    ).toBeTruthy()
  })

  test('headerLabel slot work', async () => {
    const wrapper = TransferMount({
      props: { dataSource: mockedDataSource },
      slots: {
        headerLabel: ({ data, isSource }) =>
          h('div', { class: `custom-header-label-slot-test-${isSource ? 'source' : 'target'}` }, data.length),
      },
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('.custom-header-label-slot-test-source').text()).toBe('20')
    expect(wrapper.find('.custom-header-label-slot-test-target').text()).toBe('0')
  })

  test('headerSuffix slot work', async () => {
    const wrapper = TransferMount({
      props: { dataSource: mockedDataSource },
      slots: {
        headerSuffix: ({ isSource }) =>
          h('div', { class: `custom-header-suffix-slot-test-${isSource ? 'source' : 'target'}` }),
      },
    })

    expect(wrapper.find('.custom-header-suffix-slot-test-source').exists()).toBeTruthy()
    expect(wrapper.find('.custom-header-suffix-slot-test-target').exists()).toBeTruthy()
  })

  test('empty slot work', async () => {
    const wrapper = TransferMount({
      props: { dataSource: mockedDataSource },
      slots: {
        empty: () => h('div', { class: 'custom-empty-slot-test' }),
      },
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.findAllComponents(TransferContent)[1].find('.custom-empty-slot-test').exists()).toBeTruthy()
  })

  test('clearIcon slot work', async () => {
    const wrapper = TransferMount({
      props: { dataSource: mockedDataSource },
      slots: {
        clearIcon: () => h('div', { class: 'custom-clear-icon-slot-test' }),
      },
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.findAllComponents(TransferContent)[1].find('.custom-clear-icon-slot-test').exists()).toBeTruthy()
  })
})
