/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DeepReadonly, EffectScope, Ref } from 'vue'

import { effectScope, onScopeDispose, readonly, shallowRef } from 'vue'

import { isFunction } from 'lodash-es'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSharedComposable<T extends (...args: any[]) => ReturnType<T>>(composable: T): T {
  let subscribers = 0
  let state: ReturnType<T> | undefined
  let scope: EffectScope | undefined

  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop()
      state = scope = undefined
    }
  }

  return ((...args) => {
    subscribers++
    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }
    onScopeDispose(dispose)
    return state
  }) as T
}

export function useState<T>(init: T | (() => T)): [Ref<DeepReadonly<T>>, (value: T) => void] {
  const value = isFunction(init) ? init() : init
  const state = shallowRef(value)
  const changeState = (value: T) => {
    state.value = value
  }
  return [readonly(state), changeState]
}
