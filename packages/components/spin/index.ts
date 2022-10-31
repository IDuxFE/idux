/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SpinComponent, SpinProviderComponent } from './src/types'

import Spin from './src/Spin'
import SpinProvider from './src/SpinProvider'

const IxSpin = Spin as unknown as SpinComponent
const IxSpinProvider = SpinProvider as unknown as SpinProviderComponent

export { IxSpin, IxSpinProvider }

export { useSpin } from './src/useSpin'

export type {
  SpinInstance,
  SpinComponent,
  SpinPublicProps as SpinProps,
  SpinProviderInstance,
  SpinProviderComponent,
  SpinProviderPublicProps as SpinProviderProps,
  SpinProviderRef,
  SpinRef,
  SpinOptions,
  SpinRefUpdateOptions,
  SpinTipAlignType,
  SpinSize,
} from './src/types'
