/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TabsComponent } from './src/types'

import Tabs from './src/Tabs'
import { Tab } from './src/tab'

const IxTabs = Tabs as unknown as TabsComponent
const IxTab = Tab

export { IxTabs, IxTab }

export type {
  TabsPublicProps as TabsProps,
  TabsComponent,
  TabsInstance,
  TabProps,
  TabComponent,
  TabsMode,
  TabsPlacement,
  TabsSize,
  TabsType,
  TabsData,
} from './src/types'

export { getThemeTokens as getTabsThemeTokens } from './theme'

export type { TabsThemeTokens } from './theme'
