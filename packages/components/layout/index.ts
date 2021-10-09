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
} from './src/types'

import Layout from './src/Layout'
import LayoutContent from './src/LayoutContent'
import LayoutFooter from './src/LayoutFooter'
import LayoutHeader from './src/LayoutHeader'
import LayoutSider from './src/LayoutSider'

const IxLayout = Layout as unknown as LayoutComponent
const IxLayoutHeader = LayoutHeader as unknown as LayoutHeaderComponent
const IxLayoutSider = LayoutSider as unknown as LayoutSiderComponent
const IxLayoutContent = LayoutContent as unknown as LayoutContentComponent
const IxLayoutFooter = LayoutFooter as unknown as LayoutFooterComponent

export { IxLayout, IxLayoutHeader, IxLayoutSider, IxLayoutContent, IxLayoutFooter }

export type {
  LayoutInstance,
  LayoutPublicProps as LayoutProps,
  LayoutHeaderInstance,
  LayoutPublicProps as LayoutHeaderProps,
  LayoutSiderInstance,
  LayoutSiderPublicProps as LayoutSiderProps,
  LayoutContentInstance,
  LayoutContentPublicProps as LayoutContentProps,
  LayoutFooterInstance,
  LayoutFooterPublicProps as LayoutFooterProps,
} from './src/types'
