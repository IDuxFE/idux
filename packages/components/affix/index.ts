/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AffixComponent } from './src/types'

import Affix from './src/Affix'

const IxAffix = Affix as unknown as AffixComponent

export { IxAffix }

export type { AffixInstance, AffixPublicProps as AffixProps, AffixOffset, AffixDirection } from './src/types'
