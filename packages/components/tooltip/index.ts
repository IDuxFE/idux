import type { TooltipComponent } from './src/types'

import Tooltip from './src/Tooltip'

const IxTooltip = Tooltip as unknown as TooltipComponent

export { IxTooltip }

export type { TooltipInstance, TooltipPublicProps as TooltipProps } from './src/types'
