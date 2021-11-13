/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { isBrowser } from '../platform'

let flexGapSupported: boolean | undefined

export function supportsFlexGap(): boolean {
  if (!isBrowser) {
    return false
  }

  if (flexGapSupported !== undefined) {
    return flexGapSupported
  }

  const flex = document.createElement('div')
  flex.style.display = 'flex'
  flex.style.flexDirection = 'column'
  flex.style.rowGap = '1px'

  flex.appendChild(document.createElement('div'))
  flex.appendChild(document.createElement('div'))

  document.body.appendChild(flex)
  flexGapSupported = flex.scrollHeight === 1
  document.body.removeChild(flex)

  return flexGapSupported
}
