import type { CardComponent } from './src/types'

import Card from './src/Card.vue'

const IxCard = Card as unknown as CardComponent

export { IxCard }

export type { CardInstance, CardPublicProps as CardProps, CardSize } from './src/types'
