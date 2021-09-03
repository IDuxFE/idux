import type { CollapseTransitionComponent } from './src/types'

import CollapseTransition from './src/CollapseTransition'

const IxCollapseTransition = CollapseTransition as unknown as CollapseTransitionComponent

export { IxCollapseTransition }

export type {
  CollapseTransitionInstance,
  CollapseTransitionPublicProps as CollapseTransitionProps,
  CollapseTransitionMode,
} from './src/types'
