/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DescComponent, DescItemComponent } from './src/types'

import Desc from './src/Desc'
import DescItem from './src/DescItem'

const IxDesc = Desc as unknown as DescComponent
const IxDescItem = DescItem as unknown as DescItemComponent

export { IxDesc, IxDescItem }

export type {
  DescInstance,
  DescComponent,
  DescPublicProps as DescProps,
  DescItemInstance,
  DescItemComponent,
  DescItemPublicProps as DescItemProps,
  DescLabelAlign,
  DescLayout,
  DescSize,
} from './src/types'
