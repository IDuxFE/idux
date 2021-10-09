/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProgressComponent } from './src/types'

import Progress from './src/Progress.vue'

const IxProgress = Progress as unknown as ProgressComponent

export { IxProgress }

export type {
  ProgressInstance,
  ProgressPublicProps as ProgressProps,
  ProgressSize,
  ProgressFormat,
  ProgressType,
  ProgressGapPositionType,
  ProgressStatus,
  ProgressStrokeLinecap,
} from './src/types'
