/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { StepperComponent, StepperItemComponent } from './src/types'

import Stepper from './src/Stepper'
import StepperItem from './src/StepperItem'

const IxStepper = Stepper as unknown as StepperComponent
const IxStepperItem = StepperItem as unknown as StepperItemComponent

export { IxStepper, IxStepperItem }

export type {
  StepperInstance,
  StepperComponent,
  StepperPublicProps as StepperProps,
  StepperItemInstance,
  StepperItemComponent,
  StepperItemPublicProps as StepperItemProps,
  StepperSize,
  StepperStatus,
} from './src/types'
