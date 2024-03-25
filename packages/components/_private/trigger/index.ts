/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import Trigger from './src/Trigger'
import { type TriggerComponent, triggerProps } from './src/types'

const ɵTrigger = Trigger as unknown as TriggerComponent
const ɵTriggerPropsDefs = triggerProps

export { ɵTrigger, ɵTriggerPropsDefs }

export type {
  TriggerInstance as ɵTriggerInstance,
  TriggerComponent as ɵTriggerComponent,
  TriggerPublicProps as ɵTriggerProps,
  TriggerSlots as ɵTriggerSlots,
  TriggerDefaultSlotParams as ɵTriggerDefaultSlotParams,
} from './src/types'
