/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OverlayComponent } from './src/types'

import Overlay from './src/Overlay'

const ɵOverlay = Overlay as unknown as OverlayComponent

export { ɵOverlay }
export {
  overlayPlacementDef as ɵOverlayPlacementDef,
  overlayTriggerDef as ɵOverlayTriggerDef,
  overlayDelayDef as ɵOverlayDelayDef,
} from './src/types'
export { useVisibility as ɵUseVisibility } from './src/useVisibility'

export type { OverlayInstance as ɵOverlayInstance, OverlayPublicProps as ɵOverlayProps } from './src/types'
