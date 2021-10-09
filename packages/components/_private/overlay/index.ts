/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OverlayComponent } from './src/types'

import Overlay from './src/Overlay'

const IxOverlay = Overlay as unknown as OverlayComponent

export { IxOverlay }
export { overlayPlacementDef, overlayTriggerDef, overlayDelayDef } from './src/types'
export { useVisibility as ɵUseVisibility } from './src/useVisibility'

export type { OverlayInstance, OverlayPublicProps as OverlayProps } from './src/types'
