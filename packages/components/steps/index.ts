import type { App } from 'vue'

import IxSteps from './src/Steps'
import IxStep from './src/Step'

IxSteps.install = (app: App): void => {
  app.component(IxSteps.name, IxSteps)
}

IxStep.install = (app: App): void => {
  app.component(IxStep.name, IxStep)
}

export { IxSteps, IxStep }

export type { StepsInstance, StepsProps, StepInstance, StepProps } from './src/types'
