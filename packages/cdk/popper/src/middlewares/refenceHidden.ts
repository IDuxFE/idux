/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Middleware, hide } from '@floating-ui/dom'

export function referenceHidden(): Middleware {
  const { fn: hideFn, ...rest } = hide()

  return {
    ...rest,
    name: 'IDUX_referenceHidden',
    async fn(middlewareArguments) {
      const {
        elements: { floating },
      } = middlewareArguments

      const res = (await hideFn(middlewareArguments)) as { data: { referenceHidden: boolean } }
      const {
        data: { referenceHidden },
      } = res

      if (referenceHidden) {
        floating.setAttribute('data-popper-reference-hidden', '')
      } else {
        floating.removeAttribute('data-popper-reference-hidden')
      }

      return res
    },
  }
}
