/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CollapseComponent, CollapsePanelComponent } from './src/types'

import Collapse from './src/Collapse'
import CollapsePanel from './src/CollapsePanel'

const IxCollapse = Collapse as unknown as CollapseComponent
const IxCollapsePanel = CollapsePanel as unknown as CollapsePanelComponent

export { IxCollapse, IxCollapsePanel }

export type {
  CollapseInstance,
  CollapseComponent,
  CollapsePublicProps as CollapseProps,
  CollapsePanelProps,
  CollapsePanelComponent,
  CollapsePanelPublicProps as CollapsePanelInstance,
} from './src/types'
