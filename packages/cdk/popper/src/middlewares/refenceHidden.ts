/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Middleware, type ReferenceElement, type Side, type SideObject, hide } from '@floating-ui/dom'

import { isVisibleElement } from '@idux/cdk/utils'

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
        elements: { floating, reference },
      } = middlewareArguments

      const res = (await hideFn(middlewareArguments)) as {
        data: ReferenceHiddenData
      }
      const {
        data: { referenceHidden, referenceHiddenOffsets },
      } = res

      const shouldHideReference =
        referenceHidden &&
        !(
          reference instanceof HTMLElement &&
          getComputedStyle(reference).display === 'none' &&
          sides.some(side => referenceHiddenOffsets[side] === 0) &&
          checkParentsVisible(reference)
        )

      if (shouldHideReference) {
        floating.setAttribute('data-popper-reference-hidden', '')
      } else {
        floating.removeAttribute('data-popper-reference-hidden')
      }

      return {
        ...res,
        data: {
          ...res.data,
          referenceHidden: shouldHideReference,
        },
      }
    },
  }
}

function checkParentsVisible(el: ReferenceElement): boolean {
  if (!(el instanceof HTMLElement)) {
    return true
  }

  let parent = el.parentElement
  while (parent) {
    if (getComputedStyle(parent).display !== 'contents' && !isVisibleElement(parent)) {
      return false
    }

    parent = parent.parentElement
  }

  return true
}
