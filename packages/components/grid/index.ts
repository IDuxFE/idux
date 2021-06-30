import type { RowComponent, ColComponent } from './src/types'

import Row from './src/Row.vue'
import Col from './src/Col.vue'

const IxRow = Row as unknown as RowComponent
const IxCol = Col as unknown as ColComponent

export { IxRow, IxCol }

export type {
  RowInstance,
  RowPublicProps as RowProps,
  ColInstance,
  ColPublicProps as ColProps,
  RowGutter,
  RowAlign,
  RowJustify,
} from './src/types'
