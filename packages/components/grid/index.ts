/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColComponent, RowComponent } from './src/types'

import Col from './src/Col'
import Row from './src/Row'

const IxRow = Row as unknown as RowComponent
const IxCol = Col as unknown as ColComponent

export { IxRow, IxCol }

export type {
  RowInstance,
  RowComponent,
  RowPublicProps as RowProps,
  ColInstance,
  ColComponent,
  ColPublicProps as ColProps,
  RowGutter,
  RowAlign,
  RowJustify,
} from './src/types'
