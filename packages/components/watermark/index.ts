/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { WatermarkComponent } from './src/types'

import Watermark from './src/Watermark'

const IxWatermark = Watermark as unknown as WatermarkComponent

export { IxWatermark }

export type {
  WatermarkType,
  WatermarkDensityType,
  WatermarkInstance,
  WatermarkComponent,
  WatermarkPublicProps as WatermarkProps,
} from './src/types'
