/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TabComponent, TabsComponent } from './src/types'

import Tab from './src/Tab'
import Tabs from './src/Tabs'

const IxTabs = Tabs as unknown as TabsComponent
const IxTab = Tab as unknown as TabComponent

export { IxTabs, IxTab }

export type {
  TabsInstance,
  TabsComponent,
  TabInstance,
  TabComponent,
  TabsPublicProps as TabsProps,
  TabPublicProps as TabProps,
  TabsPlacement,
  TabsSize,
} from './src/types'
