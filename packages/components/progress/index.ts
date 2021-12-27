/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProgressComponent } from './src/types'

import Progress from './src/Progress'

const IxProgress = Progress as unknown as ProgressComponent

export { IxProgress }

export type {
  ProgressInstance,
  ProgressComponent,
  ProgressPublicProps as ProgressProps,
  ProgressSize,
  ProgressFormat,
  ProgressType,
  ProgressIcons,
  ProgressGapPositionType,
  ProgressStatus,
  ProgressGradient,
  ProgressStrokeLinecap,
} from './src/types'
