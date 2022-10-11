/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BaseOptions } from './composables/useOptions'
import type { PopperPlacement } from './types'

import { kebabCase } from 'lodash-es'

import {
  type ComputePositionConfig,
  type Middleware,
  type Placement,
  flip,
  offset as offsetMiddleware,
} from '@floating-ui/dom'

import { arrow } from './middlewares/arrow'
import { referenceHidden } from './middlewares/refenceHidden'
import { updatePlacement } from './middlewares/updatePlacement'

export interface ExtraOptions {
  arrowElement: HTMLElement | undefined
  updatePlacement: (value: PopperPlacement) => void
}

export function convertOptions(baseOptions: BaseOptions, extraOptions: ExtraOptions): ComputePositionConfig {
  const { placement, strategy, middlewares, offset, autoAdjust } = baseOptions
  const { arrowElement, updatePlacement: _updatePlacement } = extraOptions

  return {
    placement: kebabCase(placement) as Placement,
    strategy,
    middleware: [
      !!arrowElement && arrow(arrowElement),
      offsetMiddleware({
        mainAxis: offset[1],
        crossAxis: offset[0],
      }),
      autoAdjust && flip({ padding: 4 }),
      ...middlewares,
      referenceHidden(),
      updatePlacement(_updatePlacement),
    ].filter(Boolean) as Middleware[],
  }
}
