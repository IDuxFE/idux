import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import Breadcrumb from '../src/Breadcrumb'
import BreadcrumbItem from '../src/BreadcrumbItem'
import { BreadcrumbProps } from '../src/types'

const defaultSlots = [
  h(BreadcrumbItem, null, { default: () => 'item1' }),
  h(BreadcrumbItem, null, { default: () => 'item2' }),
  h(BreadcrumbItem, null, { default: () => 'item3' }),
]

describe('Breadcrumb', () => {
  const BreadcrumbMount = (options?: MountingOptions<Partial<BreadcrumbProps>>) => {
    const { slots, ...rest } = options || {}
    const mergedOptions = {
      slots: { default: () => defaultSlots, ...slots },
      ...rest,
    } as MountingOptions<BreadcrumbProps>
    return mount(Breadcrumb, mergedOptions)
  }

  renderWork<BreadcrumbProps>(Breadcrumb)

  test('BreadcrumbItem not placed inside Breadcrumb', () => {
    const mockErrorLogger = jest.spyOn(console, 'error').mockImplementation()
    const wrapper = mount(BreadcrumbItem)

    expect(wrapper.isVisible()).toBe(false)
    expect(mockErrorLogger).toBeCalled()
  })

  test("should work with Breadcrumb's `separator` prop", async () => {
    const wrapper = BreadcrumbMount({
      props: {
        separator: '>',
      },
    })
    const separatorDomList = wrapper.findAll('.ix-breadcrumb-item-separator')
    expect(separatorDomList.every(i => i.text() === '>')).toBe(true)
  })

  test("should work with BreadcrumbItem's `separator` prop", async () => {
    const wrapper = BreadcrumbMount({
      slots: {
        default: () => [
          h(BreadcrumbItem, { separator: '>' }, { default: () => 'item1' }),
          h(BreadcrumbItem, null, { default: () => 'item2' }),
        ],
      },
    })
    const separatorDomList = wrapper.findAll('.ix-breadcrumb-item-separator')
    expect(separatorDomList[0].text()).toBe('>')
    expect(separatorDomList[1].text()).toBe('/')
  })

  test("should work with BreadcrumbItem's `separator` slot", async () => {
    const wrapper = BreadcrumbMount({
      slots: {
        default: () => [
          h(BreadcrumbItem, null, { default: () => 'item2' }),
          h(BreadcrumbItem, null, { default: () => 'item2', separator: () => '>' }),
        ],
      },
    })
    const separatorDomList = wrapper.findAll('.ix-breadcrumb-item-separator')
    expect(separatorDomList[0].text()).toBe('/')
    expect(separatorDomList[1].text()).toBe('>')
  })
})
