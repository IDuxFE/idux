/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ControlTriggerComponent, ControlTriggerOverlayComponent } from './src/types'

import ControlTrigger from './src/ControlTrigger'
import ControlTriggerOverlay from './src/ControlTriggerOverlay'

const IxControlTrigger = ControlTrigger as unknown as ControlTriggerComponent
const IxControlTriggerOverlay = ControlTriggerOverlay as unknown as ControlTriggerOverlayComponent

export { IxControlTrigger, IxControlTriggerOverlay }

export type {
  ControlTriggerInstance,
  ControlTriggerComponent,
  ControlTriggerPublicProps as ControlTriggerProps,
  ControlTriggerSlots,
  ControlTriggerOverlayInstance,
  ControlTriggerOverlayComponent,
  ControlTriggerOverlayPublicProps as ControlTriggerOverlayProps,
} from './src/types'
