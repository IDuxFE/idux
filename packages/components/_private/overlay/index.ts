import type { OverlayComponent } from './src/types'

import Overlay from './src/Overlay'

const IxOverlay = Overlay as unknown as OverlayComponent

export { IxOverlay }
export { overlayPlacementDef, overlayTriggerDef } from './src/types'

export type { OverlayInstance, OverlayPublicProps as OverlayProps } from './src/types'
