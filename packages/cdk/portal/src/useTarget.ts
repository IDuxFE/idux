/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { isString } from 'lodash-es'

const targetHashmap: Record<string, HTMLElement> = {}

export function useTarget(target: string | HTMLElement): HTMLElement {
  if (!isString(target)) {
    return target
  }
  if (targetHashmap[target]) {
    return targetHashmap[target]
  }
  const Target = document.createElement('div')
  Target.classList.add(target)
  document.body.appendChild(Target)
  targetHashmap[target] = Target
  return Target
}
