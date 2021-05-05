import type { App } from 'vue'

import IxList from './src/List.vue'
import IxListItem from './src/ListItem.vue'

IxList.install = (app: App): void => {
  app.component(IxList.name, IxList)
}
IxListItem.install = (app: App): void => {
  app.component(IxListItem.name, IxListItem)
}

export { IxList, IxListItem }

export type { ListComponent, ListProps, ListItemComponent, ListItemProps } from './src/types'
