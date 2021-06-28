import type { App } from 'vue'

import IxRow from './src/Row.vue'
import IxCol from './src/Col.vue'

IxRow.install = (app: App): void => {
  app.component(IxRow.name, IxRow)
}

IxCol.install = (app: App): void => {
  app.component(IxCol.name, IxCol)
}

export { IxRow, IxCol }

export type { RowInstance, RowProps, RowGutter, RowAlign, RowJustify, ColInstance, ColProps } from './src/types'
