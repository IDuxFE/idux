import type { App } from 'vue'

import IxTooltip from './src/Tooltip.vue'

IxTooltip.install = (app: App): void => {
  app.component(IxTooltip.name, IxTooltip)
}

export { IxTooltip }

export type { TooltipInstance, TooltipProps } from './src/types'
