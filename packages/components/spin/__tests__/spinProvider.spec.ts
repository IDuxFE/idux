import { MountingOptions, VueWrapper, flushPromises, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import SpinProvider from '../src/SpinProvider'
import { SpinProviderInstance, SpinProviderProps } from '../src/types'

describe('SpinProvider', () => {
  const SpinProviderMount = (options?: MountingOptions<SpinProviderProps>) => {
    return mount(SpinProvider, { ...options }) as VueWrapper<SpinProviderInstance>
  }

  const tip = 'This is a tip'

  const newTip = 'This is a newTip'

  describe('basic', () => {
    renderWork(SpinProvider, { slots: { default: 'content' } })

    test('update and destroy and destroyAll work', async () => {
      const wrapper = SpinProviderMount()

      document.body.innerHTML = '<div class="target">This is a content</div>'

      wrapper.vm.open({ tip, target: '.target' })
      await flushPromises()

      expect(document.querySelectorAll('.ix-spin').length).toBe(1)

      expect(document.querySelector('.target')?.classList.contains('ix-spin-target-container')).toBe(true)

      expect(document.querySelector('.ix-spin-spinner-tip')!.textContent).toBe(tip)

      wrapper.vm.update({
        tip: newTip,
        target: '.target',
      })

      await flushPromises()

      expect(document.querySelector('.ix-spin-spinner-tip')!.textContent).toBe(newTip)

      wrapper.vm.open({ tip })
      await flushPromises()

      expect(document.querySelectorAll('.ix-spin').length).toBe(2)

      wrapper.vm.destroy()

      await flushPromises()

      expect(document.querySelectorAll('.ix-spin').length).toBe(1)

      // // will not generate spins repeatedly
      wrapper.vm.open({ tip, target: '.target' })

      await flushPromises()

      expect(document.querySelectorAll('.ix-spin').length).toBe(1)

      wrapper.vm.destroyAll()

      await flushPromises()

      expect(document.querySelectorAll('.ix-spin').length).toBe(0)
    })
  })

  describe('spinRef', () => {
    test.skip('update and destroy work', async () => {
      const wrapper = SpinProviderMount()
      const spinProviderRef = wrapper.vm.open({ tip })
      await flushPromises()

      expect(document.body.classList.contains('ix-spin-target-container')).toBe(true)

      expect(document.querySelectorAll('.ix-spin').length).toBe(1)

      expect(document.querySelectorAll('.ix-spin')[0].style.zIndex).toBe('2000')

      expect(document.querySelector('.ix-spin-spinner-tip')!.textContent).toBe(tip)

      spinProviderRef.update({
        tip: 'new text',
        zIndex: 3000,
      })

      await flushPromises()

      expect(document.querySelector('.ix-spin-spinner-tip')!.textContent).toBe('new text')

      expect(document.querySelectorAll('.ix-spin')[0].style.zIndex).toBe('3000')

      spinProviderRef.destroy()

      await flushPromises()

      expect(document.querySelectorAll('.ix-spin').length).toBe(0)
    })
  })
})
