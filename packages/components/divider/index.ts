import type { App } from 'vue'

import IxDivider from './src/Divider.vue'

IxDivider.install = (app: App): void => {
  app.component(IxDivider.name, IxDivider)
}

export { IxDivider }

export type { DividerComponent, DividerProps } from './src/types'

export type { DividerPosition, DividerType } from '@idux/components/config'
