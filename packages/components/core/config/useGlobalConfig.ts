import { inject, shallowReactive, provide, readonly } from 'vue'
import type { DeepReadonly } from 'vue'
import type { ButtonConfig, GlobalConfig, GlobalConfigKey, IconConfig } from './types'

const button: ButtonConfig = shallowReactive({ mode: 'default', size: 'medium' })
const icon: IconConfig = shallowReactive({})

const defaultConfig: GlobalConfig = {
  button,
  icon,
}

const globalConfigToken: Record<GlobalConfigKey, symbol> = {
  button: Symbol(),
  icon: Symbol(),
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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useGlobalConfig<T extends GlobalConfigKey>(compName: T, config?: Partial<GlobalConfig[T]>) {
  const token = globalConfigToken[compName]
  const parentConfig = inject(token, defaultConfig[compName])

  if (!config) {
    return readonly(parentConfig)
  }

  const currConfig: GlobalConfig[T] = shallowReactive({ ...parentConfig, ...config })
  provide(token, currConfig)

  return currConfig
}
