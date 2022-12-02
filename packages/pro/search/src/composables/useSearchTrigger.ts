/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface SearchTriggerContext {
  triggerSearch: () => Promise<void>
  onSearchTrigger: (cb: Handler, enforce?: HandlerEnforce) => void
}

type HandlerEnforce = 'pre' | 'post'
type Handler = () => void | Promise<void>

export function useSearchTrigger(): SearchTriggerContext {
  const preHandlers: Handler[] = []
  const handlers: Handler[] = []
  const postHandlers: Handler[] = []

  const onSearchTrigger = (cb: Handler, enforce?: HandlerEnforce) => {
    if (enforce === 'pre') {
      preHandlers.unshift(cb)
    } else if (enforce === 'post') {
      postHandlers.push(cb)
    } else {
      handlers.push(cb)
    }
  }

  const _invokeHandlers = async (handlers: Handler[]) => {
    for (const handler of handlers) {
      await handler()
    }
  }
  const triggerSearch = async () => {
    await _invokeHandlers(preHandlers)
    await _invokeHandlers(handlers)
    await _invokeHandlers(postHandlers)
  }

  return {
    triggerSearch,
    onSearchTrigger,
  }
}
