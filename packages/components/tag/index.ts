import type { App } from 'vue'
import IxTag from './src/Tag.vue'

IxTag.install = (app: App): void => {
  app.component(IxTag.name, IxTag)
}

export { IxTag }

export type { TagComponent, TagProps } from './src/types'
