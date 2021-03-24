import type { ObjectDirective, Ref } from 'vue'

import { isFunction, isObject, noop, on } from '@idux/cdk/utils'

interface ClickOutsideOptions {
  exclude: Ref<HTMLElement>[]
  handler: ClickOutsideHandler
}

type ClickOutsideHandler = () => void

export type ClickOutsideBinding = ClickOutsideHandler | ClickOutsideOptions

interface DocumentHandlerOptions {
  excludes: HTMLElement[]
  handler: ClickOutsideHandler
}

const documentHandlerMap = new Map<HTMLElement, DocumentHandlerOptions>()

on(document, 'click', event => {
  documentHandlerMap.forEach(({ excludes, handler }, el) => {
    const target = event.target as Node
    const isContain = el.contains(target)
    const isTargetExclude =
      excludes.length && (excludes.some(item => item.contains(target)) || excludes.includes(target as HTMLElement))
    const isSelf = target === el
    if (isContain || isTargetExclude || isSelf) {
      return
    }
    handler()
  })
})

function createHandler(el: HTMLElement, binding: ClickOutsideBinding): void {
  const excludes: HTMLElement[] = [el]
  let handler = noop

  if (isFunction(binding)) {
    handler = binding
  } else if (isObject<ClickOutsideOptions>(binding)) {
    excludes.push(...binding.exclude.map(el => el.value))
    handler = binding.handler
  }

  documentHandlerMap.set(el, { excludes, handler })
}

function useClickOutside(): ObjectDirective<HTMLElement, ClickOutsideBinding> {
  return {
    mounted(el, binding) {
      createHandler(el, binding.value)
    },
    updated(el, binding) {
      createHandler(el, binding.value)
    },
    unmounted(el) {
      documentHandlerMap.delete(el)
    },
  }
}

export const clickOutside = useClickOutside()
