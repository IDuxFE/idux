/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BaseOptions } from './hooks'
import type { PopperPlacement } from './types'
import type { Options, Placement } from '@popperjs/core'

import { camelCase, kebabCase } from 'lodash-es'

export interface ExtraOptions {
  arrowElement: HTMLElement | undefined
  updatePlacement: (value: PopperPlacement) => void
}

export function convertOptions(baseOptions: BaseOptions, extraOptions: ExtraOptions): Options {
  const { placement, strategy, onFirstUpdate, modifiers, offset, autoAdjust } = baseOptions
  const { arrowElement, updatePlacement } = extraOptions
  return {
    placement: kebabCase(placement) as Placement,
    strategy,
    onFirstUpdate,
    modifiers: [
      { name: 'offset', options: { offset } },
      { name: 'flip', enabled: autoAdjust, options: { padding: 4 } },
      { name: 'arrow', enabled: !!arrowElement, options: { element: arrowElement, padding: 4 } },
      {
        name: 'IDUX_updatePlacement',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({ state }) => updatePlacement(camelCase(state.placement) as PopperPlacement),
      },
      ...modifiers,
    ],
  }
}
