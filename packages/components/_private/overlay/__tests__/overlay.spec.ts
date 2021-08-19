import type { MountingOptions } from '@vue/test-utils'
import type { OverlayProps } from '../src/types'

import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { isElementVisible, renderWork } from '@tests'
import Overlay from '../src/Overlay'

describe('Overlay', () => {
  const OverlayMount = (options?: MountingOptions<Partial<OverlayProps>>) =>
    mount(Overlay, { ...options } as MountingOptions<OverlayProps>)
  const slots = {
    default: () => h('div', { id: 'trigger' }, 'trigger'),
    content: () => h('div', { id: 'content' }, 'content'),
  }

  afterEach(() => {
    document.querySelector('.ix-overlay-container')!.innerHTML = ''
  })

  renderWork<OverlayProps>(Overlay, { props: { visible: true }, slots })

  test('visible work', async () => {
    const onUpdateVisible = jest.fn()
    const wrapper = OverlayMount({
      props: { visible: true, 'onUpdate:visible': onUpdateVisible },
      slots,
    })

    expect(isElementVisible(document.querySelector('#content'))).toBe(true)

    await wrapper.setProps({ visible: false })

    expect(isElementVisible(document.querySelector('#content'))).toBe(false)
    expect(onUpdateVisible).toBeCalledWith(false)
  })

  test('destroyOnHide work', async () => {
    const wrapper = OverlayMount({
      // TODO: I don't know why an error is reported when the arrow is displayed
      props: { visible: true, showArrow: false, destroyOnHide: true },
      slots,
    })

    expect(document.querySelector('#content')).not.toBeNull()

    await wrapper.setProps({ visible: false })

    expect(document.querySelector('#content')).toBeNull()

    // false
    await wrapper.setProps({ visible: true, destroyOnHide: false })

    expect(document.querySelector('#content')).not.toBeNull()

    await wrapper.setProps({ visible: false })

    expect(document.querySelector('#content')).not.toBeNull()
  })

  test('showArrow work', async () => {
    const wrapper = OverlayMount({
      props: { visible: true, showArrow: false },
      slots,
    })

    expect(document.querySelector('.ix-overlay-arrow')).toBeNull()

    await wrapper.setProps({ showArrow: true })

    expect(document.querySelector('.ix-overlay-arrow')).not.toBeNull()
  })

  test('target work', async () => {
    const wrapper = OverlayMount({
      props: { target: 'ix-test-container', visible: true },
      slots,
    })

    expect(document.querySelector('.ix-test-container')).not.toBeNull()

    const target = document.createElement('div')
    target.classList.add('.ix-test-container2')
    document.body.appendChild(target)

    await wrapper.setProps({ target })

    expect(target.querySelector('.ix-overlay')).not.toBeNull()
  })

  test('no slots work', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    OverlayMount()
    expect(warn).toBeCalled()
  })
})
