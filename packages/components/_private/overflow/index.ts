/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OverflowComponent } from './src/types'

import Overflow from './src/Overflow'

const IxOverflow = Overflow as unknown as OverflowComponent

export { IxOverflow }

export type { OverflowInstance, OverflowComponent, OverflowPublicProps as OverflowProps } from './src/types'
