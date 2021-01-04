import type { GlobalConfig, GlobalConfigKey } from './types'

import { inject, shallowReactive, provide } from 'vue'
import { defaultConfig } from './defaultConfig'

const tokens: [GlobalConfigKey, symbol][] = Object.keys(defaultConfig).map(key => [key as GlobalConfigKey, Symbol()])
const tokenMap = new Map<GlobalConfigKey, symbol>(tokens)

/**
 *
 * @param compName
 * @param config optional, overrides the default global configuration within the current component scope
 */
export function useGlobalConfig<T extends GlobalConfigKey>(
  compName: T,
  config?: Partial<GlobalConfig[T]>,
): GlobalConfig[T] {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const token = tokenMap.get(compName)!
  const parentConfig = inject(token, defaultConfig[compName])

  if (!config) {
    return parentConfig
  }

  const currConfig: GlobalConfig[T] = shallowReactive({ ...parentConfig, ...config })
  provide(token, currConfig)

  return currConfig
}
