/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { WaveComponent } from './src/types'

import Wave from './src/Wave'

const ɵWave = Wave as unknown as WaveComponent

export { ɵWave }

export type {
  WaveInstance as ɵWaveInstance,
  WaveComponent as ɵWaveComponent,
  WavePublicProps as ɵWaveProps,
} from './src/types'
