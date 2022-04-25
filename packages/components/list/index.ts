/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ListComponent, ListItemComponent } from './src/types'

import ListItem from './src/Item'
import List from './src/List'

const IxListItem = ListItem as unknown as ListItemComponent
const IxList = List as unknown as ListComponent

export { IxList, IxListItem }

export type {
  ListInstance,
  ListComponent,
  ListPublicProps as ListProps,
  ListItemInstance,
  ListItemComponent,
  ListItemPublicProps as ListItemProps,
  ListSize,
  ListGridProps,
} from './src/types'
