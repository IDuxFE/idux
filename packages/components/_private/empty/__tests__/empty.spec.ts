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
    let empty = 'default'
    const wrapper = EmptyMount({ props: { empty } })

    expect(wrapper.classes()).not.toContain('ix-empty-simple')

    empty = 'simple'
    await wrapper.setProps({ empty })

    expect(wrapper.classes()).toContain('ix-empty-simple')

    await wrapper.setProps({ empty: { description: empty } })

    expect(wrapper.find('.ix-empty-description').text()).toBe(empty)
  })

  test('empty slot work', () => {
    const wrapper = EmptyMount({
      slots: { empty: () => h(IxEmpty, { description: 'empty slot' }) },
    })

    expect(wrapper.find('.ix-empty-description').text()).toBe('empty slot')
  })
})
