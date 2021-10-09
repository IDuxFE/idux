import { MountingOptions, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { IxButton } from '@idux/components/button'

import IxPagination from '../src/Pagination'
import Sizes from '../src/Sizes'
import { PaginationItemRenderOptions, PaginationProps } from '../src/types'

describe.skip('Pagination', () => {
  const PaginationMount = (options?: MountingOptions<Partial<PaginationProps>>) => mount(IxPagination, { ...options })

  renderWork<PaginationProps>(IxPagination, { props: { total: 50 } })

  test('v-model:pageIndex work', async () => {
    const onUpdatePageIndex = jest.fn()
    const wrapper = PaginationMount({ props: { total: 50, pageIndex: 1, 'onUpdate:pageIndex': onUpdatePageIndex } })

    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('1')

    const items = wrapper.findAll('.ix-pagination-item')
    await items[4].trigger('click')

    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('4')
    expect(onUpdatePageIndex).toBeCalledWith(4)

    await wrapper.setProps({ pageIndex: 3 })

    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('3')

    // max index is: 50 / 10 = 5
    await wrapper.setProps({ pageIndex: 6 })

    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('5')
  })

  test('v-model:pageSize and showSizeChanger work', async () => {
    const onUpdatePageSize = jest.fn()
    const wrapper = PaginationMount({
      props: { total: 50, pageSize: 10, showSizeChanger: true, 'onUpdate:pageSize': onUpdatePageSize },
    })

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(7)

    await wrapper.setProps({ pageSize: 5 })

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(9)

    await wrapper.setProps({ pageSize: 20 })

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(5)

    wrapper.findComponent(Sizes).vm.onPageSizeChange(50)
    await flushPromises()

    expect(wrapper.findAll('.ix-pagination-item').length).toEqual(3)
    expect(onUpdatePageSize).toBeCalledWith(50)
  })

  test('disabled work', async () => {
    const wrapper = PaginationMount({
      props: { pageIndex: 3, total: 50, showQuickJumper: true, showSizeChanger: true, disabled: true },
    })

    wrapper.findAll('.ix-button').forEach(item => {
      expect(item.classes()).toContain('ix-button-disabled')
    })
    expect(wrapper.find('.ix-input').classes()).toContain('ix-input-disabled')
    expect(wrapper.find('.ix-select').classes()).toContain('ix-select-disabled')

    await wrapper.find('.ix-pagination-item').trigger('click')
    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('3')

    await wrapper.setProps({ disabled: false })

    wrapper.findAll('.ix-button').forEach(item => {
      expect(item.classes()).not.toContain('ix-button-disabled')
    })
    expect(wrapper.find('.ix-input').classes()).not.toContain('ix-input-disabled')
    expect(wrapper.find('.ix-select').classes()).not.toContain('ix-select-disabled')

    await wrapper.find('.ix-pagination-item').trigger('click')
    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('2')
  })

  test('showQuickJumper work', async () => {
    const wrapper = PaginationMount({ props: { total: 50, showQuickJumper: true } })

    expect(wrapper.find('.ix-pagination-jumper').exists()).toBeTruthy()
    expect(wrapper.find('.ix-pagination-item-active').text()).toEqual('1')

    await wrapper.find('.ix-input-inner').setValue('3')
    await wrapper.find('.ix-input-inner').trigger('keydown', { key: 'enter' })

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
    const onUpdatePageIndex = jest.fn()
    const wrapper = PaginationMount({ props: { total: 50, simple: true, 'onUpdate:pageIndex': onUpdatePageIndex } })

    expect(wrapper.find('.ix-pagination-item-slash').exists()).toBeTruthy()

    await wrapper.find('.ix-input-inner').setValue('3')
    await wrapper.find('.ix-input-inner').trigger('keydown', { key: 'enter' })

    expect(onUpdatePageIndex).toBeCalledWith(3)

    await wrapper.find('.ix-input-inner').setValue('6')
    await wrapper.find('.ix-input-inner').trigger('keydown', { key: 'enter' })

    expect(onUpdatePageIndex).toBeCalledWith(5)

    await wrapper.find('.ix-input-inner').setValue('asdasd')
    await wrapper.find('.ix-input-inner').trigger('keydown', { key: 'enter' })

    expect(onUpdatePageIndex).toBeCalledWith(5)

    const [prev, , next] = wrapper.findAll('.ix-pagination-item')
    await prev.trigger('click')

    expect(onUpdatePageIndex).toBeCalledWith(4)

    await next.trigger('click')

    expect(onUpdatePageIndex).toBeCalledWith(5)
  })

  test('size work', async () => {
    const wrapper = PaginationMount({ props: { total: 50, size: 'small' } })

    expect(wrapper.find('.ix-pagination-small').exists()).toBeTruthy()

    await wrapper.setProps({ size: undefined })

    expect(wrapper.find('.ix-pagination-medium').exists()).toBeTruthy()
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

  test('itemRender work', async () => {
    const itemRender = (options: PaginationItemRenderOptions) => {
      const { type, original } = options
      if (type === 'prev' || type === 'next') {
        const text = type === 'prev' ? 'Previous' : 'Next'
        return h(IxButton, { mode: 'text', size: 'small' }, { default: () => text })
      }
      return original
    }

    const wrapper = PaginationMount({ props: { total: 50, itemRender } })

    const items = wrapper.findAll('.ix-pagination-item')

    expect(items[0].text()).toEqual('Previous')
    expect(items[items.length - 1].text()).toEqual('Next')
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

  test('totalRender work', async () => {
    const totalRender = (options: { total: number; range: [number, number] }) => {
      const { total, range } = options
      return `${range[0]}-${range[1]} of ${total} items`
    }

    const wrapper = PaginationMount({ props: { total: 50, totalRender } })

    expect(wrapper.find('.ix-pagination-total').text()).toEqual('1-10 of 50 items')
  })

  test('item slot work', async () => {
    const wrapper = PaginationMount({
      props: { total: 50 },
      slots: {
        total: ({ total, range }) => `${range[0]}-${range[1]} of ${total} items`,
      },
    })

    expect(wrapper.find('.ix-pagination-total').text()).toEqual('1-10 of 50 items')
  })
})
