/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CascaderComponent, CascaderPanelComponent } from './src/types'

import Cascader from './src/Cascader'
import CascaderPanel from './src/panel/Panel'

const IxCascader = Cascader as unknown as CascaderComponent
const IxCascaderPanel = CascaderPanel as unknown as CascaderPanelComponent

export { IxCascader, IxCascaderPanel }

export type {
  CascaderInstance,
  CascaderComponent,
  CascaderPublicProps as CascaderProps,
  CascaderPanelInstance,
  CascaderPanelComponent,
  CascaderPanelPublicProps as CascaderPanelProps,
  CascaderData,
  CascaderExpandTrigger,
  CascaderSearchFn,
  CascaderStrategy,
} from './src/types'

export { getThemeTokens as getCascaderThemeTokens } from './theme'
export type { CascaderThemeTokens } from './theme'
