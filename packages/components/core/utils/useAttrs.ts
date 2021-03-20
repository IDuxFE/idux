import type { Ref } from 'vue'

import { computed, getCurrentInstance } from 'vue'

const defaultExcludeKeys = ['class', 'style']
const listenersRegexp = /^on[A-Z]/

/**
 * Get attributes of current component
 *
 * @param excludeOptions
 * * `keys`: keys to be excluded
 * * `listeners`: listeners to be excluded
 */
export const useAttrs = (
  excludeOptions: { keys?: string[]; listeners?: boolean } = {},
): Ref<Record<string, unknown>> => {
  const { keys = [], listeners = false } = excludeOptions
  const excludeKeys = keys.concat(defaultExcludeKeys)
  const instance = getCurrentInstance()

  return computed(() => {
    const attrs = instance!.proxy!.$attrs
    return Object.keys(attrs).reduce((res, key) => {
      if (!excludeKeys.includes(key) && !(listeners && listenersRegexp.test(key))) {
        res[key] = attrs[key]
      }
      return res
    }, {} as Record<string, unknown>)
  })
}
