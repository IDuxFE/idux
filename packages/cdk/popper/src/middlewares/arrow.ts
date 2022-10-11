/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Middleware, arrow as _arrow } from '@floating-ui/dom'

export function arrow(arrowElement: HTMLElement): Middleware {
  const { fn: arrowFn, ...rest } = _arrow({ element: arrowElement, padding: 4 })

  return {
    ...rest,
    name: 'IDUX_arrow',
    async fn(middlewareArguments) {
      const res = (await arrowFn(middlewareArguments)) as { data: { x: number; y: number; centerOffset: number } }
      const {
        data: { x, y },
      } = res

      Object.assign(arrowElement.style, {
        left: x != null ? `${x}px` : '',
        top: y != null ? `${y}px` : '',
      })

      return res
    },
  }
}
