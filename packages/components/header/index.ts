import type { App } from 'vue'

import IxHeader from './src/Header'

IxHeader.install = (app: App): void => {
  app.component(IxHeader.name, IxHeader)
}

export { IxHeader }

export type { HeaderInstance, HeaderProps } from './src/types'
