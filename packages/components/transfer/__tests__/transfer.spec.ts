import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import CheckableListItem from '@idux/components/_private/checkable-list/src/CheckableListItem'
import { ɵInput } from '@idux/components/_private/input'
import { IxButton } from '@idux/components/button'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxSpin } from '@idux/components/spin'

import Transfer from '../src/Transfer'
import TransferOperations from '../src/TransferOperations'
import TransferList from '../src/list/TransferList'
import TransferListHeader from '../src/list/TransferListHeader'
import { TransferProps } from '../src/types'

const mockedDataSource = Array.from(new Array(20)).map((_, idx) => ({
  key: idx,
  value: idx,
  disabled: [1, 6, 12, 16].includes(idx),
}))

describe('Transfer', () => {
  const TransferMount = (options?: MountingOptions<Partial<TransferProps>>) =>
    mount(Transfer, { ...(options as MountingOptions<TransferProps>) })

  renderWork<TransferProps>(Transfer, {
    props: {
      dataSource: mockedDataSource,
    },
  })

  test('dataSource work', async () => {
    const wrapper = TransferMount({ props: { dataSource: mockedDataSource } })

    const [sourceList, targetList] = wrapper.findAllComponents(TransferList)
    expect(sourceList.findAllComponents(CheckableListItem).length).toBe(20)
    expect(targetList.findAllComponents(CheckableListItem).length).toBe(0)
  })

  test('v-model:value work', async () => {
    const wrapper = TransferMount({ props: { dataSource: mockedDataSource, value: [1] } })
    const [sourceList, targetList] = wrapper.findAllComponents(TransferList)
    expect(sourceList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === 1) > -1).toBeFalsy()
    expect(
      targetList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === 1) > -1,
    ).toBeTruthy()

    await wrapper.setProps({ value: [2] })
    expect(
      sourceList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === 1) > -1,
    ).toBeTruthy()
    expect(targetList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === 1) > -1).toBeFalsy()
    expect(sourceList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === 2) > -1).toBeFalsy()
    expect(
      targetList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === 2) > -1,
    ).toBeTruthy()
  })

  test('transfer work', async () => {
    const onChange = jest.fn()
    const wrapper = TransferMount({ props: { dataSource: mockedDataSource, onChange } })

    const [sourceList, targetList] = wrapper.findAllComponents(TransferList)
    const [appendTrigger, removeTrigger] = wrapper.findComponent(TransferOperations).findAllComponents(IxButton)
    await Promise.all(
      sourceList
        .findAllComponents(CheckableListItem)
        .filter(item => [1, 2, 3, 4, 5, 6].includes(item.props().value))
        .map(item => item.findComponent(IxCheckbox).find('input').setValue(true)),
    )
    await appendTrigger.trigger('click')

    expect(onChange).toBeCalledWith([2, 3, 4, 5], [])
    expect(
      [2, 3, 4, 5].some(
        value => sourceList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === value) > -1,
      ),
    ).toBeFalsy()
    expect(
      [2, 3, 4, 5].every(
        value => targetList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === value) > -1,
      ),
    ).toBeTruthy()
    expect(
      [1, 6].every(
        value => sourceList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === value) > -1,
      ),
    ).toBeTruthy()
    expect(
      [1, 6].some(
        value => targetList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === value) > -1,
      ),
    ).toBeFalsy()

    await Promise.all(
      targetList
        .findAllComponents(CheckableListItem)
        .filter(item => [3, 4].includes(item.props().value))
        .map(item => item.findComponent(IxCheckbox).find('input').setValue(true)),
    )
    await removeTrigger.trigger('click')

    expect(onChange).toBeCalledWith([2, 5], [2, 3, 4, 5])
    expect(
      [2, 5].some(
        value => sourceList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === value) > -1,
      ),
    ).toBeFalsy()
    expect(
      [1, 3, 4, 6].some(
        value => targetList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === value) > -1,
      ),
    ).toBeFalsy()
    expect(
      [2, 5].every(
        value => targetList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === value) > -1,
      ),
    ).toBeTruthy()
    expect(
      [1, 3, 4, 6].every(
        value => sourceList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === value) > -1,
      ),
    ).toBeTruthy()

    onChange.mockClear()
    await Promise.all(
      sourceList
        .findAllComponents(CheckableListItem)
        .filter(item => [13, 14].includes(item.props().value))
        .map(item => item.findComponent(IxCheckbox).find('input').setValue(true)),
    )
    await wrapper.setProps({ disabled: true })
    await appendTrigger.trigger('click')

    expect(onChange).not.toBeCalled()
    expect(
      [13, 14].every(
        value => sourceList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === value) > -1,
      ),
    ).toBeTruthy()
    expect(
      [13, 14].some(
        value => targetList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === value) > -1,
      ),
    ).toBeFalsy()

    onChange.mockClear()
    await wrapper.setProps({ disabled: false })
    await Promise.all(
      targetList
        .findAllComponents(CheckableListItem)
        .filter(item => [2, 5].includes(item.props().value))
        .map(item => item.findComponent(IxCheckbox).find('input').setValue(true)),
    )
    await wrapper.setProps({ disabled: true })
    await removeTrigger.trigger('click')

    expect(onChange).not.toBeCalled()
    expect(
      [2, 5].every(
        value => targetList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === value) > -1,
      ),
    ).toBeTruthy()
    expect(
      [2, 5].some(
        value => sourceList.findAllComponents(CheckableListItem).findIndex(item => item.props().value === value) > -1,
      ),
    ).toBeFalsy()
  })

  test('selectAll work', async () => {
    const onSelectAll = jest.fn()
    const wrapper = TransferMount({ props: { dataSource: mockedDataSource, onSelectAll } })

    const [sourceList, targetList] = wrapper.findAllComponents(TransferList)
    const sourceSelectAll = sourceList.findComponent(TransferListHeader).findComponent(IxCheckbox)
    const targetSelectAll = targetList.findComponent(TransferListHeader).findComponent(IxCheckbox)
    const [appendTrigger, removeTrigger] = wrapper.findComponent(TransferOperations).findAllComponents(IxButton)

    await wrapper.setProps({ disabled: true })

    await sourceSelectAll.find('input').setValue(true)
    await appendTrigger.trigger('click')

    expect(onSelectAll).not.toBeCalled()
    expect(targetList.findAllComponents(CheckableListItem).map(item => item.props().value)).toEqual([])

    await sourceSelectAll.find('input').setValue(false)
    await wrapper.setProps({ disabled: false })

    await sourceSelectAll.find('input').setValue(true)
    expect(onSelectAll).toBeCalledWith(true, true)
    await sourceSelectAll.find('input').setValue(false)
    expect(onSelectAll).toBeCalledWith(true, false)
    await sourceSelectAll.find('input').setValue(true)
    await appendTrigger.trigger('click')

    expect(sourceList.findAllComponents(CheckableListItem).map(item => item.props().value)).toEqual([1, 6, 12, 16])

    onSelectAll.mockClear()
    await wrapper.setProps({ disabled: true })

    await targetSelectAll.find('input').setValue(true)
    await removeTrigger.trigger('click')

    expect(onSelectAll).not.toBeCalled()
    expect(sourceList.findAllComponents(CheckableListItem).map(item => item.props().value)).toEqual([1, 6, 12, 16])

    await targetSelectAll.find('input').setValue(false)
    await wrapper.setProps({ disabled: false })

    await targetSelectAll.find('input').setValue(true)
    expect(onSelectAll).toBeCalledWith(false, true)
    await targetSelectAll.find('input').setValue(false)
    expect(onSelectAll).toBeCalledWith(false, false)
    await targetSelectAll.find('input').setValue(true)
    await removeTrigger.trigger('click')

    expect(targetList.findAllComponents(CheckableListItem).map(item => item.props().value)).toEqual([])
  })

  test('clear work', async () => {
    const onClear = jest.fn()
    const onChange = jest.fn()
    const wrapper = TransferMount({
      props: { dataSource: mockedDataSource, value: [2, 3, 4, 5], disabled: true, onClear, 'onUpdate:value': onChange },
    })
    const clearBtn = wrapper.find('.ix-transfer-list-header-clear-icon')

    await clearBtn.trigger('click')
    expect(onClear).not.toBeCalled()
    expect(onChange).not.toBeCalled()
    expect(clearBtn.classes()).toContain('ix-transfer-list-header-clear-icon-disabled')

    await wrapper.setProps({ disabled: false })
    await clearBtn.trigger('click')
    expect(onClear).toBeCalled()
    expect(onChange).toBeCalledWith([])
    expect(clearBtn.classes()).not.toContain('ix-transfer-list-header-clear-icon-disabled')
  })

  test('clearable work', async () => {
    const wrapper = TransferMount({
      props: { dataSource: mockedDataSource, clearable: false },
    })

    expect(wrapper.find('.ix-transfer-list-header-clear-icon').exists()).toBeFalsy()

    await wrapper.setProps({ clearable: true })

    expect(wrapper.find('.ix-transfer-list-header-clear-icon').exists()).toBeTruthy()
  })

  test('clearIcon work', async () => {
    const wrapper = TransferMount({
      props: { dataSource: mockedDataSource, clearIcon: 'up' },
    })

    expect(wrapper.find('.ix-transfer-list-header-clear-icon').find('.ix-icon-up').exists()).toBeTruthy()
  })

  test('pagination work', async () => {
    const onPageChange = jest.fn()
    const wrapper = TransferMount({
      props: {
        dataSource: Array.from(new Array(50)).map((_, idx) => ({
          key: idx,
          value: idx,
          disabled: [1, 6, 12, 16].includes(idx),
        })),
        value: Array.from(new Array(25)).map((_, idx) => idx),
        pagination: false,
      },
    })

    const [sourceList, targetList] = wrapper.findAllComponents(TransferList)

    expect(sourceList.findAllComponents(CheckableListItem).length).toBe(25)
    expect(targetList.findAllComponents(CheckableListItem).length).toBe(25)

    await wrapper.setProps({
      pagination: {
        pageIndex: [1, 1],
        pageSize: [10, 10],
      },
    })

    expect(sourceList.findAllComponents(CheckableListItem).length).toBe(10)
    expect(targetList.findAllComponents(CheckableListItem).length).toBe(10)

    await wrapper.setProps({
      pagination: {
        pageIndex: [3, 3],
        pageSize: [10, 10],
      },
    })

    expect(sourceList.findAllComponents(CheckableListItem).length).toBe(5)
    expect(targetList.findAllComponents(CheckableListItem).length).toBe(5)

    await wrapper.setProps({
      pagination: {
        pageIndex: [1, 1],
        pageSize: [20, 20],
      },
    })

    expect(sourceList.findAllComponents(CheckableListItem).length).toBe(20)
    expect(targetList.findAllComponents(CheckableListItem).length).toBe(20)

    await wrapper.setProps({
      pagination: {
        pageIndex: [1, 1],
        pageSize: [10, 10],
        onChange: onPageChange,
      },
    })

    const [sourcePrev, , sourceNext] = sourceList.findAll('.ix-pagination-item')
    const [targetPrev, , targetNext] = targetList.findAll('.ix-pagination-item')
    await sourceNext.trigger('click')
    expect(onPageChange).toBeCalledWith(true, 2, 10)

    await sourcePrev.trigger('click')
    expect(onPageChange).toBeCalledWith(true, 1, 10)

    await targetNext.trigger('click')
    expect(onPageChange).toBeCalledWith(false, 2, 10)

    await targetPrev.trigger('click')
    expect(onPageChange).toBeCalledWith(false, 1, 10)

    onPageChange.mockClear()
    await wrapper.setProps({
      pagination: {
        pageIndex: [1, 1],
        pageSize: [10, 10],
        onChange: onPageChange,
      },
      disabled: true,
    })

    await sourceNext.trigger('click')
    await sourcePrev.trigger('click')
    await targetNext.trigger('click')
    await targetPrev.trigger('click')
    expect(onPageChange).not.toBeCalled()
  })

  test('searchable work', async () => {
    const onSearch = jest.fn()
    const wrapper = TransferMount({
      props: {
        dataSource: mockedDataSource,
        value: [1, 2, 3, 4, 5],
        searchable: true,
        searchFn(isSource, item, searchValue) {
          return `${item.value}`.indexOf(searchValue) > -1
        },
        onSearch,
      },
    })

    const [sourceList, targetList] = wrapper.findAllComponents(TransferList)

    const sourceSearchInput = sourceList.findComponent(ɵInput).find('input')
    await sourceSearchInput.setValue('9')
    await sourceSearchInput.trigger('keydown.enter')
    expect(onSearch).toBeCalledWith(true, '9')
    expect(sourceList.findAllComponents(CheckableListItem).length).toBe(2)

    const targetSearchInput = targetList.findComponent(ɵInput).find('input')
    await targetSearchInput.setValue('2')
    await targetSearchInput.trigger('keydown.enter')
    expect(onSearch).toBeCalledWith(false, '2')
    expect(targetList.findAllComponents(CheckableListItem).length).toBe(1)
  })

  test('transferBySelect work', async () => {
    const onChange = jest.fn()
    const wrapper = TransferMount({
      props: { dataSource: mockedDataSource, mode: 'transferBySelect', 'onUpdate:value': onChange },
    })

    const [sourceList, targetList] = wrapper.findAllComponents(TransferList)
    const triggerSelect = (num: number, checked: boolean) =>
      sourceList
        .findAllComponents(CheckableListItem)
        .filter(item => item.props().value === num)[0]
        .findComponent(IxCheckbox)
        .find('input')
        .setValue(checked)

    await triggerSelect(1, true)
    expect(onChange).not.toBeCalled()

    await triggerSelect(2, true)
    expect(onChange).toBeCalledWith([2])

    await triggerSelect(3, true)
    expect(onChange).toBeCalledWith([2, 3])

    await triggerSelect(2, false)
    expect(onChange).toBeCalledWith([3])

    await targetList
      .findAllComponents(CheckableListItem)
      .filter(item => item.props().value === 3)[0]
      .find('.ix-checkable-list-item-close-icon')
      .trigger('click')
    expect(onChange).toBeCalledWith([])
  })

  test('spin work', async () => {
    const wrapper = TransferMount({ props: { spin: true } })
    const [sourceList, targetList] = wrapper.findAllComponents(TransferList)

    expect(sourceList.findComponent(IxSpin).exists()).toBeTruthy()
    expect(targetList.findComponent(IxSpin).exists()).toBeTruthy()

    await wrapper.setProps({ spin: { source: false, target: true } })

    expect(sourceList.findComponent(IxSpin).props().spinning).toBe(false)
    expect(targetList.findComponent(IxSpin).props().spinning).toBe(true)

    await wrapper.setProps({ spin: { source: false, target: false } })

    expect(sourceList.findComponent(IxSpin).props().spinning).toBe(false)
    expect(targetList.findComponent(IxSpin).props().spinning).toBe(false)
  })
})
