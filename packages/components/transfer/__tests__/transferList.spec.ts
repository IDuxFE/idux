import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import { CdkVirtualScroll } from '@idux/cdk/scroll'
import { IxCheckbox } from '@idux/components/checkbox'

import TransferList from '../src/list/List'
import TransferListItem from '../src/list/ListItem'
import { TransferListProps } from '../src/types'

const mockedDataSource = Array.from(new Array(20)).map((_, idx) => ({
  key: idx,
  label: `Option-${idx}`,
}))

describe('CheckableList', () => {
  const CheckableListMount = (options?: MountingOptions<Partial<TransferListProps>>) =>
    mount(TransferList, { ...(options as MountingOptions<TransferListProps>) })

  renderWork<TransferListProps>(TransferList, {
    props: { dataSource: mockedDataSource },
  })

  test('checked work', async () => {
    const wrapper = CheckableListMount({
      props: { dataSource: mockedDataSource, checked: item => [1, 2, 3, 4].includes(item.key as number) },
    })

    expect(
      wrapper
        .findAllComponents(TransferListItem)
        .filter(item => [1, 2, 3, 4].includes(item.props().value))
        .every(item => item.props().checked === true),
    ).toBeTruthy()
    expect(
      wrapper
        .findAllComponents(TransferListItem)
        .filter(item => ![1, 2, 3, 4].includes(item.props().value))
        .every(item => item.props().checked === false),
    ).toBeTruthy()
  })

  test('disabled work', async () => {
    const wrapper = CheckableListMount({
      props: { dataSource: mockedDataSource, disabled: item => [1, 2, 3, 4].includes(item.key as number) },
    })

    expect(
      wrapper
        .findAllComponents(TransferListItem)
        .filter(item => [1, 2, 3, 4].includes(item.props().value))
        .every(item => item.props().disabled === true),
    ).toBeTruthy()
    expect(
      wrapper
        .findAllComponents(TransferListItem)
        .filter(item => ![1, 2, 3, 4].includes(item.props().value))
        .every(item => item.props().disabled === false),
    ).toBeTruthy()
  })

  test('virtual work', async () => {
    const wrapper = CheckableListMount({
      props: { dataSource: mockedDataSource, virtual: true, scroll: { height: 100, fullHeight: true } },
    })

    expect(wrapper.classes()).toContain('ix-transfer-list-virtual')
    expect(wrapper.findComponent(CdkVirtualScroll).exists()).toBeTruthy()
  })

  test('onCheckChange work', async () => {
    const onCheckChange = vi.fn()
    const wrapper = CheckableListMount({
      props: { dataSource: mockedDataSource, onCheckChange, checkable: true },
    })

    await wrapper
      .findAllComponents(TransferListItem)
      .find(item => item.props().value === 3)
      ?.findComponent(IxCheckbox)
      .find('input')
      .setValue(true)
    expect(onCheckChange).toBeCalledWith({ key: 3, label: 'Option-3' }, true)
  })

  test('onRemove work', async () => {
    const onRemove = vi.fn()
    const wrapper = CheckableListMount({
      props: { dataSource: mockedDataSource, onRemove, removable: true },
    })

    await wrapper
      .findAllComponents(TransferListItem)
      .find(item => item.props().value === 3)
      ?.find('.ix-transfer-list-item-close-icon')
      .trigger('click')
    expect(onRemove).toBeCalledWith({ key: 3, label: 'Option-3' })
  })
})
