import type {
  LayoutComponent,
  LayoutHeaderComponent,
  LayoutSiderComponent,
  LayoutContentComponent,
  LayoutFooterComponent,
} from './src/types'

import Layout from './src/Layout'
import LayoutHeader from './src/LayoutHeader'
import LayoutContent from './src/LayoutContent'
import LayoutSider from './src/LayoutSider'
import LayoutFooter from './src/LayoutFooter'

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
