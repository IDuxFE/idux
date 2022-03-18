import { MountingOptions, mount } from '@vue/test-utils'

import { merge } from 'lodash-es'

import { renderWork } from '@tests'

import Overflow from '../src/Overflow'
import { OverflowProps } from '../src/types'

interface OverflowData {
  value: number
  key: string
}

describe('Overflow', () => {
  const overfolwData: OverflowData[] = Array.from(Array(20)).map((_, idx) => ({ value: idx, key: `${idx}-key` }))
  const totalLen = overfolwData.length

  const OverflowMount = (options?: MountingOptions<Partial<OverflowProps>>) => {
    return mount(Overflow, {
      ...(merge(
        {
          props: {
            itemKey: 'key',
            prefixCls: 'ix-test',
            dataSource: overfolwData,
          },
          slots: { item: `<template #item="item">{{ item.value }}</template>` },
        },
        options,
      ) as MountingOptions<OverflowProps>),
    })
  }

  renderWork<OverflowProps>(Overflow, {
    props: { maxLabelCount: 4 },
  })

  renderWork<OverflowData>(Overflow, {
    props: { maxLabelCount: 'responsive' },
  })

  test('maxLabelCount work', async () => {
    const wrapper = OverflowMount()

    let items = wrapper.findAll('.ix-overflow-item')

    expect(items.length).toBe(totalLen)

    await wrapper.setProps({ maxLabelCount: 3 })

    // [0, 1, 2, + 17 ...]
    items = wrapper.findAll('.ix-overflow-item')

    expect(items.length).toBe(4)
    expect(items[3].text()).toBe('+ 17 ...')
  })
  test('maxLabelCount responsive work', async () => {
    const wrapper = OverflowMount()

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ maxLabelCount: 'responsive' })

    expect(wrapper.html()).toMatchSnapshot()
  })
  test('item slot work', async () => {
    const wrapper = OverflowMount({ props: { maxLabelCount: 2 } })

    const items = wrapper.findAll('.ix-overflow-item')

    expect(items[0].text()).toBe('0')
    expect(items[1].text()).toBe('1')
  })
  test('rest slot work', async () => {
    const wrapper = OverflowMount({
      props: { maxLabelCount: 2 },
      slots: { rest: `<template #rest="rest">+ {{ rest.length }} more</template>` },
    })

    const rest = wrapper.find('.ix-overflow-rest')

    expect(rest.text()).toBe('+ 18 more')
  })
  test('suffix slot work', async () => {
    const wrapper = OverflowMount({
      props: { maxLabelCount: 2 },
      slots: { suffix: `x` },
    })

    const suffix = wrapper.find('.ix-overflow-suffix')
    expect(suffix.text()).toBe('x')
  })
})
