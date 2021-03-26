import type { App } from 'vue'

import IxTooltip from './src/tooltip'

IxTooltip.install = (app: App): void => {
  app.component(IxTooltip.name, IxTooltip)
}

export { IxTooltip }

export type { TooltipComponent, TooltipProps } from './src/types'
