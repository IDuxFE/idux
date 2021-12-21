/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SliderComponent } from './src/types'

import Slider from './src/Slider'

const IxSlider = Slider as unknown as SliderComponent

export { IxSlider }

export type { SliderInstance, SliderComponent, SliderPublicProps as SliderProps } from './src/types'
