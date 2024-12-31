/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { kebabCase } from 'lodash-es'

import {
  type ComputePositionConfig,
  type Middleware,
  type Placement,
  flip,
  offset as offsetMiddleware,
  shift,
} from '@floating-ui/dom'

import { type BaseOptions } from './composables/useOptions'
import { arrow } from './middlewares/arrow'
import { referenceHidden } from './middlewares/refenceHidden'
import { updatePlacement } from './middlewares/updatePlacement'
import { type PopperPlacement } from './types'

export interface ExtraOptions {
  arrowElement: HTMLElement | undefined
  updatePlacement: (value: PopperPlacement) => void
}

export function convertOptions(baseOptions: BaseOptions, extraOptions: ExtraOptions): ComputePositionConfig {
  const { placement, strategy, middlewares, offset, autoAdjust } = baseOptions
  const { arrowElement, updatePlacement: _updatePlacement } = extraOptions

  console.log(baseOptions)

  const { width } = arrowElement?.getBoundingClientRect() ?? {}
  const arrowSize = width ? width / 2 : 0

  return {
    placement: kebabCase(placement) as Placement,
    strategy,
    middleware: [
      autoAdjust && flip({ padding: 2 + arrowSize, crossAxis: false }),
      autoAdjust && shift(),
      !!arrowElement && arrow(arrowElement),
      offsetMiddleware({
        mainAxis: offset[1],
        crossAxis: offset[0],
      }),
      referenceHidden(),
      updatePlacement(_updatePlacement),
      ...middlewares,
    ].filter(Boolean) as Middleware[],
  }
}
