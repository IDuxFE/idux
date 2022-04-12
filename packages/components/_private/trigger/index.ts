/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TriggerComponent } from './src/types'

import Trigger from './src/Trigger'

const ɵTrigger = Trigger as unknown as TriggerComponent

export { ɵTrigger }

export type {
  TriggerInstance as ɵTriggerInstance,
  TriggerComponent as ɵTriggerComponent,
  TriggerPublicProps as ɵTriggerProps,
} from './src/types'
