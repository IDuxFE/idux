import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import IxPagination from '../src/Pagination'
import { PaginationProps } from '../src/types'

describe('Pagination', () => {
  const PaginationMount = (options?: MountingOptions<Partial<PaginationProps>>) => mount(IxPagination, { ...options })

  renderWork<PaginationProps>(IxPagination, { props: { total: 50 } })

  renderWork<PaginationProps>(IxPagination, { props: { simple: true, total: 50 } })

  renderWork<PaginationProps>(IxPagination, { props: { total: 500, showQuickJumper: true, showSizeChanger: true } })

  test('v-model:pageIndex work', async () => {
    const onUpdatePageIndex = vi.fn()
    const wrapper = PaginationMount({ props: { total: 50, pageIndex: 1, 'onUpdate:pageIndex': onUpdatePageIndex } })

    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('1')

    const items = wrapper.findAll('.ix-pagination-item')
    await items[4].trigger('click')

    expect(onUpdatePageIndex).toBeCalledWith(4)

    await wrapper.setProps({ pageIndex: 3 })

    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('3')

    // max index is: 50 / 10 = 5
    await wrapper.setProps({ pageIndex: 6 })

    expect(onUpdatePageIndex).toBeCalledWith(5)
  })

  test('v-model:pageSize work', async () => {
    const onUpdatePageSize = vi.fn()
    const wrapper = PaginationMount({
      props: { total: 50, pageSize: 10, showSizeChanger: true, 'onUpdate:pageSize': onUpdatePageSize },
    })

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(7)

    await wrapper.setProps({ pageSize: 5 })

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(9)

    await wrapper.setProps({ pageSize: 20 })

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(5)

    // TODO: change size
    //  expect(onUpdatePageSize).toBeCalledWith(50)
  })

  test('disabled work', async () => {
    const wrapper = PaginationMount({
      props: { total: 50, showQuickJumper: true, showSizeChanger: true, disabled: true },
    })

    wrapper.findAll('.ix-button').forEach(item => {
      expect(item.classes()).toContain('ix-button-disabled')
    })
    expect(wrapper.find('.ix-input').classes()).toContain('ix-input-disabled')
    expect(wrapper.find('.ix-select').classes()).toContain('ix-selector-disabled')

    await wrapper.find('.ix-pagination-item').trigger('click')
    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('1')

    await wrapper.setProps({ disabled: false })

    wrapper.findAll('.ix-button').forEach((item, index) => {
      if (index !== 0) {
        expect(item.classes()).not.toContain('ix-button-disabled')
      }
    })
    expect(wrapper.find('.ix-input').classes()).not.toContain('ix-input-disabled')
    expect(wrapper.find('.ix-select').classes()).not.toContain('ix-select-disabled')

    await wrapper.findAll('.ix-pagination-item')[2].trigger('click')
    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('2')
  })

  test('showQuickJumper work', async () => {
    const wrapper = PaginationMount({ props: { total: 50, showQuickJumper: true } })

    expect(wrapper.find('.ix-pagination-jumper').exists()).toBeTruthy()
    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('1')

    await wrapper.find('.ix-input').setValue('3')
    await wrapper.find('.ix-input').trigger('keydown', { key: 'enter' })

    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('3')
  })

  test('showTitle work', async () => {
    const wrapper = PaginationMount({ props: { total: 50, showTitle: false } })

    wrapper.findAll('.ix-pagination-item').forEach(item => {
      expect(item.attributes('title')).toBeUndefined()
    })

    await wrapper.setProps({ showTitle: true })

    wrapper.findAll('.ix-pagination-item').forEach(item => {
      expect(item.attributes('title')).toBeDefined()
    })
  })

  test('showTotal work', async () => {
    const wrapper = PaginationMount({ props: { total: 50, showTotal: false } })

    expect(wrapper.find('.ix-pagination-total').exists()).toBeFalsy()

    await wrapper.setProps({ showTotal: true })

    expect(wrapper.find('.ix-pagination-total').exists()).toBeTruthy()
  })

  test('simple work', async () => {
    const onUpdatePageIndex = vi.fn()
    const wrapper = PaginationMount({
      props: { total: 50, simple: true, showQuickJumper: true, 'onUpdate:pageIndex': onUpdatePageIndex },
    })

    expect(wrapper.find('.ix-pagination-item-slash').exists()).toBeTruthy()

    await wrapper.find('.ix-input').setValue('3')
    await wrapper.find('.ix-input').trigger('keydown', { key: 'enter' })

    expect(onUpdatePageIndex).toBeCalledWith(3)

    await wrapper.find('.ix-input').setValue('6')
    await wrapper.find('.ix-input').trigger('keydown', { key: 'enter' })

    expect(onUpdatePageIndex).toBeCalledWith(5)

    await wrapper.find('.ix-input').setValue('asdasd')
    await wrapper.find('.ix-input').trigger('keydown', { key: 'enter' })

    expect(onUpdatePageIndex).toBeCalledWith(5)

    const [prev, , next] = wrapper.findAll('.ix-pagination-item')
    await prev.trigger('click')

    expect(onUpdatePageIndex).toBeCalledWith(4)

    await next.trigger('click')

    expect(onUpdatePageIndex).toBeCalledWith(5)

    await wrapper.setProps({ showQuickJumper: false })

    expect(wrapper.find('.ix-input').exists()).toBeFalsy()
  })

  test('size work', async () => {
    const wrapper = PaginationMount({ props: { total: 50, size: 'sm' } })

    expect(wrapper.find('.ix-pagination-sm').exists()).toBeTruthy()

    await wrapper.setProps({ size: 'md' })

    expect(wrapper.find('.ix-pagination-md').exists()).toBeTruthy()
  })

  test('total work', async () => {
    const wrapper = PaginationMount({ props: { total: 10 } })

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(3)

    await wrapper.setProps({ total: 30 })

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(5)

    await wrapper.setProps({ total: 50 })

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(7)

    await wrapper.setProps({ total: 500 })

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(9)

    await wrapper.setProps({ pageIndex: 6 })

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(11)

    await wrapper.setProps({ pageIndex: 50 })

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(9)
  })

  test('item slot work', async () => {
    const wrapper = PaginationMount({
      props: { total: 50 },
      slots: {
        item: ({ type, original }) => {
          if (type === 'prev') {
            return h('button', 'Previous')
          } else if (type === 'next') {
            return h('button', 'Next')
          } else {
            return original
          }
        },
      },
    })

    const items = wrapper.findAll('.ix-pagination-item')

    expect(items[0].text()).toEqual('Previous')
    expect(items[items.length - 1].text()).toEqual('Next')
  })

  test('total slot work', async () => {
    const wrapper = PaginationMount({
      props: { total: 50 },
      slots: {
        total: ({ total, range }) => `${range[0]}-${range[1]} of ${total} items`,
      },
    })

    expect(wrapper.find('.ix-pagination-total').text()).toEqual('1-10 of 50 items')
  })
})
