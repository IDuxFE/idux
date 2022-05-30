/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type App, type Plugin, inject, provide, reactive } from 'vue'

import { cloneDeep, merge } from 'lodash-es'

import { defaultConfig } from './defaultConfig'
import { type ProGlobalConfig, type ProGlobalConfigKey } from './types'

const tokens: [ProGlobalConfigKey, symbol][] = Object.keys(defaultConfig).map(key => [
  key as ProGlobalConfigKey,
  Symbol(key),
])
const tokenMap = new Map<ProGlobalConfigKey, symbol>(tokens)

export type DeepPartialGlobalConfig = {
  [K in ProGlobalConfigKey]?: Partial<ProGlobalConfig[K]>
}

/**
 * Create a global configuration plugin
 *
 * @param config overrides the default global configuration
 */
export const createGlobalConfig = (config: DeepPartialGlobalConfig): Plugin => {
  const install = (app: App): void => {
    const compNames = Object.keys(config) as ProGlobalConfigKey[]
    compNames.forEach(compName => {
      const token = tokenMap.get(compName)!
      const currConfig = defaultConfig[compName]
      merge(currConfig, config[compName])
      app.provide(token, currConfig)
    })
  }

  return { install }
}

export function useGlobalConfig<T extends ProGlobalConfigKey>(compName: T): Readonly<ProGlobalConfig[T]>
export function useGlobalConfig<T extends ProGlobalConfigKey>(
  compName: T,
  config: Partial<ProGlobalConfig[T]>,
): [Readonly<ProGlobalConfig[T]>, (config: Partial<ProGlobalConfig[T]>) => void]
export function useGlobalConfig<T extends ProGlobalConfigKey>(
  compName: T,
  config?: Partial<ProGlobalConfig[T]>,
): Readonly<ProGlobalConfig[T]> | [Readonly<ProGlobalConfig[T]>, (config: Partial<ProGlobalConfig[T]>) => void] {
  const token = tokenMap.get(compName)!
  const currConfig = inject<ProGlobalConfig[T]>(token, defaultConfig[compName])

  if (!config) {
    return currConfig as Readonly<ProGlobalConfig[T]>
  }

  const cloneConfig = reactive(merge(cloneDeep(currConfig), config)) as ProGlobalConfig[T]

  provide(token, cloneConfig)

  return [cloneConfig, (config: Partial<ProGlobalConfig[T]>) => merge(cloneConfig, config)]
}
