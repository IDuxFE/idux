import type { EmptyProps } from '../src/types'
import type { MountingOptions } from '@vue/test-utils'

import { mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { IxEmpty } from '@idux/components/empty'

import Empty from '../src/Empty'

describe('Empty', () => {
  const EmptyMount = (options?: MountingOptions<Partial<EmptyProps>>) =>
    mount(Empty, { ...options } as MountingOptions<EmptyProps>)

  renderWork<EmptyProps>(Empty, { props: { empty: 'Empty content' } })

  test('empty work', async () => {
    let empty = 'empty 1'
    const wrapper = EmptyMount({ props: { empty } })

    expect(wrapper.find('.ix-empty-description').text()).toBe(empty)

    empty = 'empty 2'
    await wrapper.setProps({ empty: { description: empty } })

    expect(wrapper.find('.ix-empty-description').text()).toBe(empty)
  })

  test('empty slot work', () => {
    const wrapper = EmptyMount({
      props: { empty: 'empty 1' },
      slots: { empty: () => h(IxEmpty, { description: 'empty slot' }) },
    })

    expect(wrapper.find('.ix-empty-description').text()).toBe('empty slot')
  })
})
