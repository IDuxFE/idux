// @ts-nocheck

import { Window } from 'happy-dom'

import { KEYS } from './domKeys'

export function createDomEnv(): { window: Window; destroy: () => void } {
  const window = (global.window = new Window())
  const globalKeys = KEYS.concat(Object.getOwnPropertyNames(window))
    .filter(k => !k.startsWith('_'))
    .filter(k => !(k in global))

  for (const key of globalKeys) {
    global[key] = window[key]
  }

  function destroy() {
    globalKeys.forEach(key => delete global[key])
    globalKeys.length = 0
    window.happyDOM.cancelAsync()

    delete global.window
  }

  return {
    window,
    destroy,
  }
}
