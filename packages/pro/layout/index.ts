/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProLayoutComponent, ProLayoutSiderTriggerComponent } from './src/types'

import ProLayout from './src/Layout'
import ProLayoutSiderTrigger from './src/LayoutSiderTrigger'

const IxProLayout = ProLayout as unknown as ProLayoutComponent
/**
 * @deprecated please use `IxLayoutSiderTrigger` instead'
 */
const IxProLayoutSiderTrigger = ProLayoutSiderTrigger as unknown as ProLayoutSiderTriggerComponent

export { IxProLayout, IxProLayoutSiderTrigger }

export type {
  ProLayoutInstance,
  ProLayoutComponent,
  ProLayoutPublicProps as ProLayoutProps,
  ProLayoutSiderTriggerInstance,
  ProLayoutSiderTriggerComponent,
  ProLayoutSiderTriggerPublicProps as ProLayoutSiderTriggerProps,
  ProLayoutLogo,
  ProLayoutTheme,
  ProLayoutType,
} from './src/types'
