/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TourComponent } from './src/types'

import Tour from './src/Tour'

const IxTour = Tour as unknown as TourComponent

export { IxTour }

export type {
  TourInstance,
  TourComponent,
  TourPublicProps as TourProps,
  TargetGap,
  TourMaskOptions,
  TourStep,
} from './src/types'

export { getThemeTokens as getTourThemeTokens } from './theme'

export type { TourThemeTokens } from './theme'
