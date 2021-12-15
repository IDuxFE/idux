/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePanelComponent } from './src/types'

import TimePanel from './src/TimePanel'

const ɵTimePanel = TimePanel as unknown as TimePanelComponent

export { ɵTimePanel }

export type {
  TimePanelInstance as ɵTimePanelInstance,
  TimePanelPublicProps as ɵTimePanelProps,
  BaseTimePanelProps as ɵBaseTimePanelProps,
} from './src/types'

export { baseTimePanelProps as ɵbaseTimePanelProps } from './src/types'
