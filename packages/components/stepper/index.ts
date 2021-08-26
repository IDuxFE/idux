import type { StepperComponent, StepperItemComponent } from './src/types'

import Stepper from './src/Stepper'
import StepperItem from './src/StepperItem'

const IxStepper = Stepper as unknown as StepperComponent
const IxStepperItem = StepperItem as unknown as StepperItemComponent

export { IxStepper, IxStepperItem }

export type {
  StepperInstance,
  StepperPublicProps as StepperProps,
  StepperItemInstance,
  StepperItemPublicProps as StepperItemProps,
  StepperSize,
  StepperStatus,
} from './src/types'
