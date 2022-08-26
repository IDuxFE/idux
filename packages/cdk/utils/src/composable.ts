/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComputedRef,
  type EffectScope,
  computed,
  effectScope,
  onScopeDispose,
  ref,
  shallowRef,
  toRaw,
  watch,
} from 'vue'

import { isFunction } from 'lodash-es'

import { callEmit } from './props'

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

export function useState<T>(defaultOrFactory: T | (() => T), shallow = true): [ComputedRef<T>, (value: T) => void] {
  const defaultValue = isFunction(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory

  const state = shallow ? shallowRef(defaultValue) : ref(defaultValue)

  const setState = (value: T) => {
    if (value !== toRaw(state.value)) {
      state.value = value
    }
  }

  return [computed(() => state.value) as ComputedRef<T>, setState]
}

export function useControlledProp<T, K extends keyof T>(props: T, key: K): [ComputedRef<T[K]>, (value: T[K]) => void]
export function useControlledProp<T, K extends keyof T>(
  props: T,
  key: K,
  defaultOrFactory: Exclude<T[K], undefined> | (() => Exclude<T[K], undefined>),
): [ComputedRef<Exclude<T[K], undefined>>, (value: Exclude<T[K], undefined>) => void]
export function useControlledProp<T, K extends keyof T>(
  props: T,
  key: K,
  defaultOrFactory?: Exclude<T[K], undefined> | (() => Exclude<T[K], undefined>),
): [ComputedRef<T[K]>, (value: T[K]) => void] {
  const defaultValue = (isFunction(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory)!
  const tempProp = shallowRef(props[key])

  watch(
    () => props[key],
    value => (tempProp.value = value),
  )

  const state = computed(() => props[key] ?? tempProp.value ?? defaultValue)

  const setState = (value: T[K]) => {
    if (value !== toRaw(state.value)) {
      tempProp.value = value
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callEmit((props as any)[`onUpdate:${key as string}`], value)
    }
  }

  return [state, setState]
}
