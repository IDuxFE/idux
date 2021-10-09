import type { PopoverProps } from '../src/types'
import type { MountingOptions } from '@vue/test-utils'

import { mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import IxPopover from '../src/Popover'

describe('Popover', () => {
  const PopoverWrapper = (options?: MountingOptions<Partial<PopoverProps>>) => mount(IxPopover, { ...options })
  const slots = { default: () => h('div', { id: 'trigger' }, 'trigger') }

  afterEach(() => {
    document.querySelector('.ix-popover-container')!.innerHTML = ''
  })

  renderWork<PopoverProps>(IxPopover, {
    props: { visible: true, title: 'Title', content: 'Content' },
    slots,
  })

  test('title work', async () => {
    const wrapper = PopoverWrapper({
      props: { visible: true, title: 'Title' },
      slots,
    })

    expect(document.querySelector('.ix-popover-title')!.textContent).toBe('Title')

    await wrapper.setProps({ title: 'Title 2' })

    expect(document.querySelector('.ix-popover-title')!.textContent).toBe('Title 2')
  })

  test('title slot work', async () => {
    PopoverWrapper({
      props: { visible: true, title: 'Title' },
      slots: { ...slots, title: () => h('div', 'Title slot') },
    })

    expect(document.querySelector('.ix-popover-title')!.textContent).toBe('Title slot')
  })

  test('content work', async () => {
    const wrapper = PopoverWrapper({
      props: { visible: true, content: 'Content' },
      slots,
    })

    expect(document.querySelector('.ix-popover-content')!.textContent).toBe('Content')

    await wrapper.setProps({ content: 'Content 2' })

    expect(document.querySelector('.ix-popover-content')!.textContent).toBe('Content 2')
  })

  test('title slot work', async () => {
    PopoverWrapper({
      props: { visible: true, content: 'Content' },
      slots: { ...slots, content: () => h('div', 'Content slot') },
    })

    expect(document.querySelector('.ix-popover-content')!.textContent).toBe('Content slot')
  })

  test('empty content work', async () => {
    PopoverWrapper({
      props: { visible: true },
      slots,
    })

    expect(document.querySelector('.ix-popover')).toBeNull()
  })
})
