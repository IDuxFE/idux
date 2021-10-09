/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ListComponent, ListItemComponent } from './src/types'

import List from './src/List.vue'
import ListItem from './src/ListItem.vue'

const IxList = List as unknown as ListComponent
const IxListItem = ListItem as unknown as ListItemComponent

export { IxList, IxListItem }

export type {
  ListInstance,
  ListPublicProps as ListProps,
  ListItemInstance,
  ListItemPublicProps as ListItemProps,
  ListSize,
  ListLayout,
  ListGridProps,
} from './src/types'
