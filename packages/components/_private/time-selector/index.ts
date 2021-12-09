/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimeSelectorComponent } from './src/types'

import TimeSelector from './src/TimeSelector'

const ɵTimeSelector = TimeSelector as unknown as TimeSelectorComponent

export { ɵTimeSelector }

export type {
  TimeSelectorInstance as ɵTimeSelectorInstance,
  TimeSelectorPublicProps as ɵTimeSelectorProps,
  BaseTimeSelectorProps as ɵBaseTimeSelectorProps,
} from './src/types'

export { baseTimeSelectorProps as ɵbaseTimeSelectorProps } from './src/types'
