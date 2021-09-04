import type { CollapseComponent, CollapsePanelComponent } from './src/types'

import Collapse from './src/Collapse'
import CollapsePanel from './src/CollapsePanel'

const IxCollapse = Collapse as unknown as CollapseComponent
const IxCollapsePanel = CollapsePanel as unknown as CollapsePanelComponent

export { IxCollapse, IxCollapsePanel }

export type {
  CollapseInstance,
  CollapsePublicProps as CollapseProps,
  CollapsePanelProps,
  CollapsePanelPublicProps as CollapsePanelInstance,
} from './src/types'
