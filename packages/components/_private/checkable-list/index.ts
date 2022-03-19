/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CheckableListComponent } from './src/types'

import CheckableList from './src/CheckableList'

const ɵCheckableList = CheckableList as unknown as CheckableListComponent

export { ɵCheckableList }

export type {
  CheckableListData as ɵCheckableListData,
  CheckableListScroll as ɵCheckableListScroll,
  CheckableListInstance as ɵCheckableListInstance,
  CheckableListComponent as ɵCheckableListComponent,
  CheckableListPublicProps as ɵCheckableListProps,
} from './src/types'
