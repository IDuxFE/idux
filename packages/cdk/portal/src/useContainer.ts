/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { isString } from 'lodash-es'

const containerHashmap: Record<string, HTMLElement> = {}

export function useContainer(target: string | HTMLElement): HTMLElement {
  if (!isString(target)) {
    return target
  }
  if (containerHashmap[target]) {
    return containerHashmap[target]
  }
  const container = document.createElement('div')
  container.classList.add(target)
  document.body.appendChild(container)
  containerHashmap[target] = container
  return container
}
