/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LayoutProComponent } from './src/types'
import type { MenuClickOptions } from '@idux/components/menu'

import LayoutPro from './src/Layout'
import LayoutSiderTrigger from './src/LayoutSiderTrigger'

const IxLayoutPro = LayoutPro as unknown as LayoutProComponent
const IxLayoutSiderTrigger = LayoutSiderTrigger

export type { MenuClickOptions }
export type {
  LayoutProPublicProps as LayoutProProps,
  LayoutSiderTriggerPublicProps as LayoutSiderTriggerProps,
  LayoutProInstance,
  LayoutSiderTriggerInstance,
  LayoutProThemes,
  LayoutProModeTypes,
  LayoutProMenuData,
  LayoutProMenuPath,
} from './src/types'
export { IxLayoutPro, IxLayoutSiderTrigger }
