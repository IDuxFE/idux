import { inject, shallowReactive, provide, readonly } from 'vue'
import type { DeepReadonly } from 'vue'
import type { BadgeConfig, ButtonConfig, GlobalConfig, GlobalConfigKey, IconConfig, DividerConfig } from './types'

const button = shallowReactive<ButtonConfig>({ mode: 'default', size: 'medium' })
const icon = shallowReactive<IconConfig>({})
const badge = shallowReactive<BadgeConfig>({ showZero: false, dot: false, overflowCount: 99 })
const divider = shallowReactive<DividerConfig>({
  dashed: false,
  plain: false,
  position: 'center',
  type: 'horizontal',
})

const defaultConfig: GlobalConfig = {
  button,
  icon,
  badge,
  divider,
}

const globalConfigToken: Record<GlobalConfigKey, symbol> = {
  button: Symbol(),
  icon: Symbol(),
  badge: Symbol(),
  divider: Symbol(),
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
