import type { TooltipProps } from '../src/types'
import type { MountingOptions } from '@vue/test-utils'

import { mount } from '@vue/test-utils'
import { h } from 'vue'

import { isElementVisible, renderWork, wait } from '@tests'

import IxTooltip from '../src/Tooltip'

describe('Tooltip', () => {
  const TooltipWrapper = (options?: MountingOptions<Partial<TooltipProps>>) => mount(IxTooltip, { ...options })
  const slots = { default: () => h('div', { id: 'trigger' }, 'trigger') }

  afterEach(() => {
    document.querySelector('.ix-tooltip-container')!.innerHTML = ''
  })

  renderWork<TooltipProps>(IxTooltip, {
    props: { title: 'Title', visible: true },
    slots,
  })

  test('visible work', async () => {
    const onUpdateVisible = jest.fn()
    const wrapper = TooltipWrapper({
      props: { visible: false, 'onUpdate:visible': onUpdateVisible, title: 'Title' },
      slots,
    })

    expect(isElementVisible(document.querySelector('.ix-tooltip'))).toBe(false)

    await wrapper.find('#trigger').trigger('mouseenter')
    await wait(100)

    expect(isElementVisible(document.querySelector('.ix-tooltip'))).toBe(true)
    expect(onUpdateVisible).toBeCalledWith(true)

    await wrapper.setProps({ visible: true })
    await wrapper.find('#trigger').trigger('mouseleave')
    await wait(100)

    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('title work', async () => {
    const wrapper = TooltipWrapper({
      props: { visible: true, title: 'Title' },
      slots,
    })

    expect(document.querySelector('.ix-tooltip-wrapper')!.textContent).toBe('Title')

    await wrapper.setProps({ title: 'Title 2' })

    expect(document.querySelector('.ix-tooltip-wrapper')!.textContent).toBe('Title 2')
  })

  test('title slot work', async () => {
    TooltipWrapper({
      props: { visible: true, title: 'Title' },
      slots: { ...slots, title: () => h('div', 'Title slot') },
    })

    expect(document.querySelector('.ix-tooltip-wrapper')!.textContent).toBe('Title slot')
  })

  test('empty content work', async () => {
    TooltipWrapper({
      props: { visible: true },
      slots,
    })

    expect(document.querySelector('.ix-tooltip')).toBeNull()
  })
})
