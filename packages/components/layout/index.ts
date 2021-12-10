/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  LayoutComponent,
  LayoutContentComponent,
  LayoutFooterComponent,
  LayoutHeaderComponent,
  LayoutSiderComponent,
  LayoutSiderTriggerComponent,
} from './src/types'

import Layout from './src/Layout'
import LayoutContent from './src/LayoutContent'
import LayoutFooter from './src/LayoutFooter'
import LayoutHeader from './src/LayoutHeader'
import LayoutSider from './src/LayoutSider'
import LayoutSiderTrigger from './src/LayoutSiderTrigger'

const IxLayout = Layout as unknown as LayoutComponent
const IxLayoutContent = LayoutContent as unknown as LayoutContentComponent
const IxLayoutFooter = LayoutFooter as unknown as LayoutFooterComponent
const IxLayoutHeader = LayoutHeader as unknown as LayoutHeaderComponent
const IxLayoutSider = LayoutSider as unknown as LayoutSiderComponent
const IxLayoutSiderTrigger = LayoutSiderTrigger as LayoutSiderTriggerComponent

export { IxLayout, IxLayoutContent, IxLayoutFooter, IxLayoutHeader, IxLayoutSider, IxLayoutSiderTrigger }

export type {
  LayoutInstance,
  LayoutComponent,
  LayoutPublicProps as LayoutProps,
  LayoutContentInstance,
  LayoutContentComponent,
  LayoutContentPublicProps as LayoutContentProps,
  LayoutFooterInstance,
  LayoutFooterComponent,
  LayoutFooterPublicProps as LayoutFooterProps,
  LayoutHeaderInstance,
  LayoutHeaderComponent,
  LayoutPublicProps as LayoutHeaderProps,
  LayoutSiderInstance,
  LayoutSiderComponent,
  LayoutSiderPublicProps as LayoutSiderProps,
  LayoutSiderTriggerInstance,
  LayoutSiderTriggerComponent,
  LayoutSiderTriggerPublicProps as LayoutSiderTriggerProps,
} from './src/types'
