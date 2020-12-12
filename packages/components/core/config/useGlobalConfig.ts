import { inject, shallowReactive, provide, readonly } from 'vue'
import type { DeepReadonly } from 'vue'
import type { ButtonConfig, GlobalConfig, GlobalConfigKey } from './types'

const button: ButtonConfig = shallowReactive({ mode: 'default', size: 'medium' })

const defaultConfig: GlobalConfig = {
  button,
}

const globalConfigToken: Record<GlobalConfigKey, symbol> = {
  button: Symbol(),
}

/**
 *
 * @param compName
 * @param config optional, overrides the default global configuration within the current component scope
 */
export function useGlobalConfig<T extends GlobalConfigKey>(
  compName: T,
  config: Partial<GlobalConfig[T]>,
): GlobalConfig[T]
export function useGlobalConfig<T extends GlobalConfigKey>(compName: T): DeepReadonly<GlobalConfig[T]>
export function useGlobalConfig<T extends GlobalConfigKey>(
  compName: T,
  config?: Partial<GlobalConfig[T]>,
): GlobalConfig[T] | DeepReadonly<GlobalConfig[T]> {
  const token = globalConfigToken[compName]
  const parentConfig = inject(token, defaultConfig[compName])

  if (!config) {
    return readonly(parentConfig)
  }

  const currConfig: GlobalConfig[T] = shallowReactive({ ...parentConfig, ...config })
  provide(token, currConfig)

  return currConfig
}
