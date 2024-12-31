/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperOptions, ResolvedPopperOptions } from '../types'

import { type ComputedRef, type UnwrapRef, computed, isReactive, isRef, nextTick, reactive, unref, watch } from 'vue'

import { isEqual } from 'lodash-es'

export const defaultDelay = 0

export function usePopperOptions(options: PopperOptions): {
  resolvedOptions: ComputedRef<ResolvedPopperOptions>
  updateOptions: (options: PopperOptions) => void
} {
  const localOptions: PopperOptions = reactive({})

  function getOptionValue<K extends keyof PopperOptions>(key: K): UnwrapRef<PopperOptions[K]>
  function getOptionValue<K extends keyof PopperOptions>(
    key: K,
    defaultValue: UnwrapRef<PopperOptions[K]>,
  ): Exclude<UnwrapRef<PopperOptions[K]>, undefined>
  function getOptionValue<K extends keyof PopperOptions>(
    key: K,
    defaultValue?: UnwrapRef<PopperOptions[K]>,
  ): UnwrapRef<PopperOptions[K]> | undefined {
    let value: UnwrapRef<PopperOptions[K]>
    if (isRef(options[key])) {
      value = unref(options[key]) as UnwrapRef<PopperOptions[K]>
    } else if (isRef(localOptions[key])) {
      value = unref(localOptions[key]) as UnwrapRef<PopperOptions[K]>
    } else {
      value = (localOptions[key] ?? options[key]) as UnwrapRef<PopperOptions[K]>
    }

    return value ?? defaultValue
  }

  const resolvedOptions = computed<ResolvedPopperOptions>(() => {
    return {
      allowEnter: getOptionValue('allowEnter', true),
      autoAdjust: getOptionValue('autoAdjust', true),
      delay: getOptionValue('delay', defaultDelay),
      disabled: getOptionValue('disabled', false),
      offset: getOptionValue('offset', [0, 0]),
      placement: getOptionValue('placement', 'bottomStart'),
      trigger: getOptionValue('trigger', 'hover'),
      strategy: getOptionValue('strategy', 'absolute'),
      middlewares: getOptionValue('middlewares', []),
      visible: getOptionValue('visible'),
      onVisibleChange: options.onVisibleChange ?? localOptions.onVisibleChange,
    }
  })

  const updateOptions = (options: PopperOptions) => {
    Object.entries(options).forEach(([key, value]) => {
      const _key = key as keyof PopperOptions
      if (value !== undefined && !isEqual(unref(value), resolvedOptions.value[_key])) {
        localOptions[_key] = value
      }
    })
  }

  if (isReactive(options)) {
    watch(options, _options => {
      nextTick(() => {
        updateOptions(_options)
      })
    })
  }

  return {
    resolvedOptions,
    updateOptions,
  }
}

export type BaseOptions = Pick<
  Required<UnwrapRef<PopperOptions>>,
  'placement' | 'strategy' | 'middlewares' | 'offset' | 'autoAdjust'
>

export function useBaseOptions(options: ComputedRef<ResolvedPopperOptions>): ComputedRef<BaseOptions> {
  return computed(() => {
    const { placement, strategy, middlewares, offset, autoAdjust } = options.value
    return { placement, strategy, middlewares, offset, autoAdjust }
  })
}
