import type { App } from 'vue'
import IxStep from './src/Step.tsx'
import IxSteps from './src/Steps.tsx'

IxSteps.install = (app: App): void => {
  app.component(IxSteps.name, IxSteps)
}

IxStep.install = (app: App): void => {
  app.component(IxStep.name, IxStep)
}

export { IxSteps, IxStep }

export type { StepsProps, StepProps } from './src/types'
