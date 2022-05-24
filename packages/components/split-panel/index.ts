/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SplitAreaComponent, SplitPanelComponent } from './src/types'

import SplitArea from './src/SplitArea'
import SplitPanel from './src/SplitPanel'

const IxSplitPanel = SplitPanel as unknown as SplitPanelComponent

const IxSplitArea = SplitArea as unknown as SplitAreaComponent

export { IxSplitPanel, IxSplitArea }

export type {
  SplitPanelInstance,
  SplitPanelComponent,
  SplitPanelPublicProps as SplitPanelProps,
  SplitAreaInstance,
  SplitAreaComponent,
  SplitAreaPublicProps as SplitAreaProps,
} from './src/types'
