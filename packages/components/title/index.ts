import type { App } from 'vue'

import IxTitle from './src/Title'

IxTitle.install = (app: App): void => {
  app.component(IxTitle.name, IxTitle)
}

export { IxTitle }

export type { TitleInstance, TitleProps } from './src/types'
