/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TooltipComponent } from './src/types'

import Tooltip from './src/Tooltip'

const IxTooltip = Tooltip as unknown as TooltipComponent

export { IxTooltip }

export type { TooltipInstance, TooltipPublicProps as TooltipProps } from './src/types'

export { tooltipProps as ɵTooltipProps } from './src/types'
export { useConfigProps as ɵUseConfigProps } from './src/useConfigProps'
