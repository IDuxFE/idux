import type { StepsComponent, StepComponent } from './src/types'

import Steps from './src/Steps'
import Step from './src/Step'

const IxSteps = Steps as unknown as StepsComponent
const IxStep = Step as unknown as StepComponent

export { IxSteps, IxStep }

export type {
  StepsInstance,
  StepsPublicProps as StepsProps,
  StepInstance,
  StepPublicProps as StepProps,
  StepsSize,
  StepStatus,
} from './src/types'
