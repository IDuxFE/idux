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
