/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperOptions } from '../types'

import { type ComputedRef, computed, reactive, watch } from 'vue'

import { isEqual } from 'lodash-es'

export const defaultDelay = 0

export function usePopperOptions(options: PopperOptions): {
  popperOptions: Required<PopperOptions>
  updateOptions: (options: PopperOptions) => void
} {
  const popperOptions = reactive<Required<PopperOptions>>({
    allowEnter: options.allowEnter ?? true,
    autoAdjust: options.autoAdjust ?? true,
    delay: options.delay ?? defaultDelay,
    disabled: options.disabled ?? false,
    offset: options.offset ?? [0, 0],
    placement: options.placement ?? 'top',
    trigger: options.trigger ?? 'hover',
    visible: options.visible ?? false,
    strategy: options.strategy ?? 'absolute',
    middlewares: options.middlewares ?? [],
  })
  const updateOptions = (options: PopperOptions) => {
    Object.entries(options).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (value !== undefined && !isEqual(value, (popperOptions as any)[key])) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(popperOptions as any)[key] = value
      }
    })
  }

  watch(options, _options => {
    updateOptions(_options)
  })

  return {
    popperOptions,
    updateOptions,
  }
}

export type BaseOptions = Pick<
  Required<PopperOptions>,
  'placement' | 'strategy' | 'middlewares' | 'offset' | 'autoAdjust'
>

export function useBaseOptions(options: Required<PopperOptions>): ComputedRef<BaseOptions> {
  return computed(() => {
    const { placement, strategy, middlewares, offset, autoAdjust } = options
    return { placement, strategy, middlewares, offset, autoAdjust }
  })
}
