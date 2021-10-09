/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MaskComponent } from './src/types'

import Mask from './src/Mask'

const IxMask = Mask as unknown as MaskComponent

export { IxMask }

export type { MaskInstance, MaskPublicProps as MaskProps } from './src/types'
