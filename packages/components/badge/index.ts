import type { App } from 'vue'

import IxBadge from './src/Badge.vue'

IxBadge.install = (app: App): void => {
  app.component(IxBadge.name, IxBadge)
}

export { IxBadge }

export type { BadgeInstance, BadgeProps } from './src/types'
