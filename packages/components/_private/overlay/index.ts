import type { OverlayComponent } from './src/types'

import Overlay from './src/Overlay'

const IxOverlay = Overlay as unknown as OverlayComponent

export { IxOverlay }

export type { OverlayInstance, OverlayPublicProps as OverlayProps } from './src/types'

export { overlayPlacementDef, overlayTriggerDef, overlayScrollStrategyDef } from './src/types'
