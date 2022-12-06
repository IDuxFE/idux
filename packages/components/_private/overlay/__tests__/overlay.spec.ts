import type { OverlayProps } from '../src/types'
import type { MountingOptions } from '@vue/test-utils'

import { mount } from '@vue/test-utils'
import { h } from 'vue'

import { isElementVisible, renderWork } from '@tests'

import Overlay from '../src/Overlay'

describe('Overlay', () => {
  const OverlayMount = (options?: MountingOptions<Partial<OverlayProps>>) => {
    const { props, ...rest } = options || {}
    return mount(Overlay, {
      props: { container: () => '.ix-overlay-container', ...props },
      ...rest,
    } as MountingOptions<OverlayProps>)
  }

  const slots = {
    default: () => h('div', { id: 'trigger' }, 'trigger'),
    content: () => h('div', { id: 'content' }, 'content'),
  }

  afterEach(() => {
    document.querySelector('.ix-overlay-container')!.innerHTML = ''
  })

  renderWork<OverlayProps>(Overlay, { props: { container: () => '.ix-overlay-container', visible: true }, slots })

  test('visible work', async () => {
    const onUpdateVisible = vi.fn()
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

  test('container work', async () => {
    const wrapper = OverlayMount({
      props: { container: () => '.ix-test-container', visible: true },
      slots,
    })

    expect(document.querySelector('.ix-test-container')).not.toBeNull()

    const container = document.createElement('div')
    container.classList.add('.ix-test-container2')
    document.body.appendChild(container)

    await wrapper.setProps({ container: () => container })

    expect(container.querySelector('.ix-overlay')).not.toBeNull()
  })

  test('zIndex work', async () => {
    let zIndex = 1001
    const wrapper = OverlayMount({
      props: { container: () => '.ix-test-container', visible: true, zIndex },
      slots,
    })

    expect((document.querySelector('.ix-overlay') as HTMLElement).style.zIndex).toBe(`${zIndex}`)

    zIndex = 1002
    await wrapper.setProps({ zIndex })

    expect((document.querySelector('.ix-overlay') as HTMLElement).style.zIndex).toBe(`${zIndex}`)
  })

  test('no slots work', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    OverlayMount()
    expect(warn).toBeCalled()
  })
})
