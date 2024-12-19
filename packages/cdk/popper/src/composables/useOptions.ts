/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperOptions, ResolvedPopperOptions } from '../types'

import { type ComputedRef, type UnwrapRef, computed, isReactive, nextTick, reactive, unref, watch } from 'vue'

import { isEqual } from 'lodash-es'

export const defaultDelay = 0

export function usePopperOptions(options: PopperOptions): {
  resolvedOptions: ComputedRef<ResolvedPopperOptions>
  updateOptions: (options: PopperOptions) => void
} {
  const localOptions: PopperOptions = reactive({})
  const resolvedOptions = computed<ResolvedPopperOptions>(() => {
    return {
      allowEnter: unref(localOptions.allowEnter ?? options.allowEnter) ?? true,
      autoAdjust: unref(localOptions.autoAdjust ?? options.autoAdjust) ?? true,
      delay: unref(localOptions.delay ?? options.delay) ?? defaultDelay,
      disabled: unref(localOptions.disabled ?? options.disabled) ?? false,
      offset: unref(localOptions.offset ?? options.offset) ?? [0, 0],
      placement: unref(localOptions.placement ?? options.placement) ?? 'bottomStart',
      trigger: unref(localOptions.trigger ?? options.trigger) ?? 'hover',
      strategy: unref(localOptions.strategy ?? options.strategy) ?? 'absolute',
      middlewares: unref(localOptions.middlewares ?? options.middlewares) ?? [],
      visible: unref(localOptions.visible ?? options.visible),
      onVisibleChange: localOptions.onVisibleChange ?? options.onVisibleChange,
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
