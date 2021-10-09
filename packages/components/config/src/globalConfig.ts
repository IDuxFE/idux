/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GlobalConfig, GlobalConfigKey } from './types'
import type { App, Plugin } from 'vue'

import { inject, provide, shallowReactive, shallowReadonly } from 'vue'

import { defaultConfig } from './defaultConfig'

const tokens: [GlobalConfigKey, symbol][] = Object.keys(defaultConfig).map(key => [key as GlobalConfigKey, Symbol(key)])
const tokenMap = new Map<GlobalConfigKey, symbol>(tokens)

export type DeepPartialGlobalConfig = {
  [K in GlobalConfigKey]?: Partial<GlobalConfig[K]>
}

/**
 * Create a global configuration plugin
 *
 * @param config overrides the default global configuration
 */
export const createGlobalConfig = (config: DeepPartialGlobalConfig): Plugin => {
  const install = (app: App): void => {
    const compNames = Object.keys(config) as GlobalConfigKey[]
    compNames.forEach(compName => {
      const token = tokenMap.get(compName)!
      const currConfig = defaultConfig[compName]
      Object.assign(currConfig, config[compName])

      app.provide(token, currConfig)
    })
  }

  return { install }
}

export interface UseGlobalConfig<T extends GlobalConfigKey> {
  /**
   * The global configuration of some component
   */
  config: Readonly<GlobalConfig[T]>
  /**
   * Change the global configuration of the some component
   */
  changeConfig: (config: Partial<GlobalConfig[T]>) => void
}

/**
 *
 * @param compName component name
 * @param config optional, overrides the parent configuration within the current component scope
 */
export function useGlobalConfig<T extends GlobalConfigKey>(compName: T): Readonly<GlobalConfig[T]>
export function useGlobalConfig<T extends GlobalConfigKey>(
  compName: T,
  config: Partial<GlobalConfig[T]>,
): UseGlobalConfig<T>
export function useGlobalConfig<T extends GlobalConfigKey>(
  compName: T,
  config?: Partial<GlobalConfig[T]>,
): Readonly<GlobalConfig[T]> | UseGlobalConfig<T> {
  const token = tokenMap.get(compName)!
  let currConfig = inject<GlobalConfig[T]>(token, defaultConfig[compName])

  if (!config) {
    return shallowReadonly(currConfig) as Readonly<GlobalConfig[T]>
  }

  currConfig = shallowReactive({ ...currConfig, ...config })
  provide(token, currConfig)

  const changeConfig = (options: Partial<GlobalConfig[T]>) => {
    Object.assign(currConfig, options)
  }

  return {
    config: shallowReadonly(currConfig) as Readonly<GlobalConfig[T]>,
    changeConfig,
  }
}
