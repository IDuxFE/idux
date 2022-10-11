/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperPlacement } from '../types'
import type { Middleware } from '@floating-ui/dom'

import { camelCase } from 'lodash-es'

export function updatePlacement(updatePlacement: (value: PopperPlacement) => void): Middleware {
  return {
    name: 'IDUX_updatePlacement',
    fn(middlewareArguments) {
      const {
        placement,
        elements: { floating },
      } = middlewareArguments
      updatePlacement(camelCase(placement) as PopperPlacement)

      floating.setAttribute('data-popper-placement', placement)
      return middlewareArguments
    },
  }
}
