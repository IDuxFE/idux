import type { App } from 'vue'

import IxCard from './src/Card.vue'

IxCard.install = (app: App): void => {
  app.component(IxCard.name, IxCard)
}

export { IxCard }

export type { CardComponent, CardProps } from './src/types'

export type { CardSize } from '@idux/components/config'
