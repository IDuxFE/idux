/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GlobalConfig, GlobalConfigKey } from './types'
import type { App, Plugin } from 'vue'

import { inject, provide, reactive } from 'vue'

import { cloneDeep, merge } from 'lodash-es'

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
      merge(currConfig, config[compName])
      app.provide(token, currConfig)
    })
  }

  return { install }
}

export function useGlobalConfig<T extends GlobalConfigKey>(compName: T): Readonly<GlobalConfig[T]>
export function useGlobalConfig<T extends GlobalConfigKey>(
  compName: T,
  config: Partial<GlobalConfig[T]>,
): [Readonly<GlobalConfig[T]>, (config: Partial<GlobalConfig[T]>) => void]
export function useGlobalConfig<T extends GlobalConfigKey>(
  compName: T,
  config?: Partial<GlobalConfig[T]>,
): Readonly<GlobalConfig[T]> | [Readonly<GlobalConfig[T]>, (config: Partial<GlobalConfig[T]>) => void] {
  const token = tokenMap.get(compName)!
  const currConfig = inject<GlobalConfig[T]>(token, defaultConfig[compName])

  if (!config) {
    return currConfig as Readonly<GlobalConfig[T]>
  }

  const cloneConfig = reactive(merge(cloneDeep(currConfig), config)) as GlobalConfig[T]

  provide(token, cloneConfig)

  return [cloneConfig, (config: Partial<GlobalConfig[T]>) => merge(cloneConfig, config)]
}
