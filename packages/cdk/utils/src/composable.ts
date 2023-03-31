/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type EffectScope, computed, effectScope, ref, shallowRef, toRaw, watch } from 'vue'

import { isFunction } from 'lodash-es'

import { callEmit } from './props'
import { tryOnScopeDispose } from './tryOnScopeDispose'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSharedComposable<T extends (...args: any[]) => ReturnType<T>>(
  composable: T,
): { useComposable: T; addSubscribers: () => void; delSubscribers: () => void } {
  let subscribers = 0
  let state: ReturnType<T> | undefined
  let scope: EffectScope | undefined

  const dispose = () => {
    subscribers -= 1

    if (scope && subscribers <= 0) {
      scope.stop()
      state = scope = undefined
    }
  }

  const addSubscribers = () => {
    subscribers++
  }

  const delSubscribers = () => {
    dispose()
  }

  const useComposable = ((...args) => {
    subscribers++

    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }
    tryOnScopeDispose(dispose)
    return state
  }) as T

  return { useComposable, addSubscribers, delSubscribers }
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

export function useControlledProp<T, K extends keyof T>(
  props: T,
  key: K,
): [ComputedRef<T[K]>, (value: T[K], ...args: unknown[]) => void]
export function useControlledProp<T, K extends keyof T>(
  props: T,
  key: K,
  defaultOrFactory: Exclude<T[K], undefined> | (() => Exclude<T[K], undefined>),
): [ComputedRef<Exclude<T[K], undefined>>, (value: Exclude<T[K], undefined>, ...args: unknown[]) => void]
export function useControlledProp<T, K extends keyof T>(
  props: T,
  key: K,
  defaultOrFactory?: Exclude<T[K], undefined> | (() => Exclude<T[K], undefined>),
): [ComputedRef<T[K]>, (value: T[K], ...args: unknown[]) => void] {
  const tempProp = shallowRef(props[key])

  watch(
    () => props[key],
    value => (tempProp.value = value),
  )

  const state = computed(
    () => props[key] ?? tempProp.value ?? (isFunction(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory)!,
  )

  const setState = (value: T[K], ...args: unknown[]) => {
    if (value !== toRaw(state.value)) {
      tempProp.value = value
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callEmit((props as any)[`onUpdate:${key as string}`], value, ...args)
    }
  }

  return [state, setState]
}
