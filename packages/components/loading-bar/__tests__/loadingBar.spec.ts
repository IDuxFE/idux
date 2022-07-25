/* eslint-disable vue/one-component-per-file */
import { MountingOptions, VueWrapper, flushPromises, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import IxLoadingBarProvider from '../src/LoadingBarProvider'
import { LoadingBarProviderInstance, LoadingBarProviderProps } from '../src/types'

describe('LoadingBarProvider', () => {
  const sleepMs = (ms = 1000) => new Promise<void>(r => setTimeout(() => r(), ms))
  const LoadingBarMount = (options?: MountingOptions<Partial<LoadingBarProviderProps>>) =>
    mount(IxLoadingBarProvider, { ...options }) as VueWrapper<LoadingBarProviderInstance>

  renderWork<LoadingBarProviderProps>(IxLoadingBarProvider, {
    props: {},
    slots: { default: () => `<button>ok</button>` },
  })

  test('render', async () => {
    LoadingBarMount({ props: {}, slots: { default: () => `<button>ok</button>` } })
    await flushPromises()

    const containerEl = document.querySelector('.ix-loading-bar-container') as HTMLElement
    expect(containerEl).not.toBeNull()

    const loadingBarEl = document.querySelector('.ix-loading-bar') as HTMLElement
    expect(loadingBarEl).not.toBeNull()
    expect(window.getComputedStyle(loadingBarEl).display).toBe('none')

    const maskEl = document.querySelector('.ix-loading-bar-mask') as HTMLElement
    expect(maskEl).not.toBeNull()
  })

  test('start', async () => {
    const wrapper = LoadingBarMount()
    await flushPromises()
    const loadingBarEl = document.querySelector('.ix-loading-bar') as HTMLElement
    expect(loadingBarEl).not.toBeNull()
    wrapper.vm.start()

    await sleepMs(300)
    expect(window.parseInt(window.getComputedStyle(loadingBarEl).maxWidth)).toBeLessThanOrEqual(80)
    expect(document.querySelector('.ix-loading-bar--loading')).not.toBeNull()
    wrapper.vm.finish()

    await sleepMs(500)
    expect(window.parseInt(window.getComputedStyle(loadingBarEl).maxWidth)).toBeLessThanOrEqual(100)
  })

  test('error', async () => {
    const wrapper = LoadingBarMount()
    await flushPromises()
    const loadingBarEl = document.querySelector('.ix-loading-bar') as HTMLElement
    expect(loadingBarEl).not.toBeNull()
    wrapper.vm.error()
    await sleepMs(100)
    expect(document.querySelector('.ix-loading-bar--error')).not.toBeNull()
    await sleepMs()
    expect(window.parseInt(window.getComputedStyle(loadingBarEl).maxWidth)).toBeLessThanOrEqual(100)
  })
})
