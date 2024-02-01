/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProLayoutComponent } from './src/types'

import { IxLayoutSiderTrigger } from '@idux/components/layout'

import ProLayout from './src/Layout'

const IxProLayout = ProLayout as unknown as ProLayoutComponent
/**
 * @deprecated please use `IxLayoutSiderTrigger` instead'
 */
const IxProLayoutSiderTrigger = IxLayoutSiderTrigger

export { IxProLayout, IxProLayoutSiderTrigger }

export type {
  ProLayoutInstance,
  ProLayoutComponent,
  ProLayoutPublicProps as ProLayoutProps,
  ProLayoutLogo,
  ProLayoutTheme,
  ProLayoutType,
} from './src/types'

export { getThemeTokens as getProLayoutThemeTokens } from './theme'

export type { ProLayoutThemeTokens } from './theme'
