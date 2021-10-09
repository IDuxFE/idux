/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { RadioComponent, RadioGroupComponent } from './src/types'

import Radio from './src/Radio'
import RadioGroup from './src/RadioGroup'

const IxRadio = Radio as unknown as RadioComponent
const IxRadioGroup = RadioGroup as unknown as RadioGroupComponent

export { IxRadio, IxRadioGroup }

export type {
  RadioInstance,
  RadioPublicProps as RadioProps,
  RadioGroupInstance,
  RadioGroupPublicProps as RadioGroupProps,
  RadioMode,
  RadioOptions,
} from './src/types'
