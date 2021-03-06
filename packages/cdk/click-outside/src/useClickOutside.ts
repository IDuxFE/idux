import type { Directive } from 'vue'

import { isFunction, noop, off, on, stopPropagation } from '@idux/cdk/utils'

const useClickOutside = (): Directive<HTMLElement, (...args: unknown[]) => void> => {
  const fnMap = new WeakMap<HTMLElement, () => void>()
  const selfMap = new WeakMap<HTMLElement, (e: MouseEvent) => void>()

  return {
    mounted(el, binding) {
      const fn = isFunction(binding.value) ? binding.value : noop
      on(window, 'click', fn)
      on(el, 'click', stopPropagation)
      fnMap.set(el, fn)
      selfMap.set(el, stopPropagation)
    },
    updated(el, binding) {
      const fn = isFunction(binding.value) ? binding.value : noop
      const oldFn = fnMap.get(el)!
      if (fn === oldFn) {
        return
      }
      off(window, 'click', oldFn)
      on(window, 'click', fn)
      fnMap.set(el, fn)
    },
    unmounted(el) {
      const fn = fnMap.get(el)!
      const stopPropagation = selfMap.get(el)!
      off(window, 'click', fn)
      off(el, 'click', stopPropagation)
      fnMap.delete(el)
      selfMap.delete(el)
    },
  }
}

export const clickOutside = useClickOutside()
