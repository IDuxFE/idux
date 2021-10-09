/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SpinComponent } from './src/types'

import Spin from './src/Spin'

const IxSpin = Spin as unknown as SpinComponent

export { IxSpin }

export type { SpinInstance, SpinPublicProps as SpinProps, SpinTipAlignType, SpinSize } from './src/types'
