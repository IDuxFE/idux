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
