/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { mount } from '@vue/test-utils'

export const wait = (timeout?: number): Promise<unknown> => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export const waitRAF = (): Promise<unknown> => {
  return new Promise(resolve => requestAnimationFrame(resolve))
}

export const resize = (width = window.innerWidth, height = window.innerHeight): Promise<unknown> => {
  ;(window as any).innerWidth = width
  ;(window as any).innerHeight = height
  window.dispatchEvent(new Event('resize'))
  return wait(100)
}

export const scroll = (y: number): Promise<unknown> => {
  ;(window as any).pageYOffset = y
  window.dispatchEvent(new Event('scroll'))
  return wait(100)
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
