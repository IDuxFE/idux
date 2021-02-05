/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { mount, DOMWrapper } from '@vue/test-utils'

export const wait = (timeout?: number): Promise<unknown> => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export const waitRAF = (): Promise<unknown> => {
  return new Promise(resolve => requestAnimationFrame(resolve))
}

export const resizeTarget = (
  width?: number,
  height?: number,
  target: Window | Element = window,
  timeout = 200,
): Promise<unknown> => {
  if (target === window) {
    ;(target as any).innerWidth = width || target.innerWidth
    ;(target as any).innerHeight = height || target.innerHeight
  } else {
    ;(target as any).clientWidth = width || (target as any).clientWidth
    ;(target as any).clientHeight = height || (target as any).clientHeight
  }
  target.dispatchEvent(new Event('resize'))
  return wait(timeout)
}

export const scrollTarget = (y: number, target: Window | Element = window, timeout = 200): Promise<unknown> => {
  if (target === window) {
    ;(target as any).pageYOffset = y
  } else {
    ;(target as any).scrollTop = y
  }
  target.dispatchEvent(new Event('scroll'))
  return wait(timeout)
}

export const renderWork = (component: any, options = {}): void => {
  test('render work', () => {
    const wrapper = mount(component, { ...options })
    expect(wrapper.html()).toMatchSnapshot()

    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.unmount()
    }).not.toThrow()
  })
}

export const isShow = (wrapper: DOMWrapper<Element>): boolean => {
  return window.getComputedStyle(wrapper.element).display !== 'none'
}
