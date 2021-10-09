/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CardComponent, CardGridComponent } from './src/types'

import Card from './src/Card'
import CardGrid from './src/CardGrid'

const IxCard = Card as unknown as CardComponent
const IxCardGrid = CardGrid as unknown as CardGridComponent

export { IxCard, IxCardGrid }

export type {
  CardInstance,
  CardPublicProps as CardProps,
  CardGridInstance,
  CardGridPublicProps as CardGridProps,
  CardSize,
  CardCover,
  CardButtonProps,
} from './src/types'
