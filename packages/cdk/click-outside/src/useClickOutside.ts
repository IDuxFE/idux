import type { ObjectDirective, Ref } from 'vue'

import { isFunction, isObject, noop, on } from '@idux/cdk/utils'

interface ClickOutsideOptions {
  exclude: Ref<HTMLElement>[]
  handler: ClickOutsideHandler
}

type ClickOutsideHandler = (event: Event) => void

export type ClickOutsideBinding = ClickOutsideHandler | ClickOutsideOptions

interface DocumentHandlerOptions {
  exclude: HTMLElement[]
  handler: ClickOutsideHandler
}

const documentHandlerMap = new Map<HTMLElement, DocumentHandlerOptions>()

on(document, 'click', event => {
  documentHandlerMap.forEach(({ exclude, handler }, el) => {
    const target = event.target as Node
    const isContain = el.contains(target)
    const isTargetExclude =
      exclude.length && (exclude.some(item => item.contains(target)) || exclude.includes(target as HTMLElement))
    const isSelf = target === el
    if (isContain || isTargetExclude || isSelf) {
      return
    }
    handler(event)
  })
})

function createHandler(el: HTMLElement, binding: ClickOutsideBinding): void {
  const exclude: HTMLElement[] = [el]
  let handler: ClickOutsideHandler = noop

  if (isFunction(binding)) {
    handler = binding as ClickOutsideHandler
  } else if (isObject<ClickOutsideOptions>(binding)) {
    exclude.push(...binding.exclude.map(el => el.value))
    handler = binding.handler
  }

  documentHandlerMap.set(el, { exclude, handler })
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
