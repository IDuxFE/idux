/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LoadingBarProviderComponent } from './src/types'

import LoadingBarProvider from './src/LoadingBarProvider'

const IxLoadingBarProvider = LoadingBarProvider as unknown as LoadingBarProviderComponent

export { IxLoadingBarProvider }

export { useLoadingBar } from './src/useLoadingBar'
export { LOADING_BAR_PROVIDER_TOKEN } from './src/token'

export type {
  LoadingBarOptions,
  LoadingBarAnimation,
  LoadingBarProviderInstance,
  LoadingBarProviderPublicProps as LoadingBarProviderProps,
  LoadingBarProviderComponent,
  LoadingBarProviderRef,
} from './src/types'
