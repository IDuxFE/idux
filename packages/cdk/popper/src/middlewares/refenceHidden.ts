/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Middleware, type Side, type SideObject, hide } from '@floating-ui/dom'

export const referenceHiddenMiddlewareName = 'IDUX_referenceHidden'
export interface ReferenceHiddenData {
  referenceHidden: boolean
  referenceHiddenOffsets: SideObject
}

const sides: Side[] = ['top', 'bottom', 'left', 'right']

export function referenceHidden(): Middleware {
  const { fn: hideFn, ...rest } = hide({ elementContext: 'reference' })

  return {
    ...rest,
    name: referenceHiddenMiddlewareName,
    async fn(middlewareArguments) {
      const {
        elements: { floating },
      } = middlewareArguments

      const res = (await hideFn(middlewareArguments)) as {
        data: ReferenceHiddenData
      }
      const {
        data: { referenceHiddenOffsets },
      } = res

      const referenceHidden = sides.some(side => referenceHiddenOffsets[side] > 0)

      if (sides.some(side => referenceHiddenOffsets[side] > 0)) {
        floating.setAttribute('data-popper-reference-hidden', '')
      } else {
        floating.removeAttribute('data-popper-reference-hidden')
      }

      return {
        ...res,
        data: {
          ...res.data,
          referenceHidden,
        },
      }
    },
  }
}
