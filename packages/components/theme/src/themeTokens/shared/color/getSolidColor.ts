/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { TinyColor } from '@ctrl/tinycolor'

export function getSolidColor(baseColor: string, brightness: number): string {
  const instance = new TinyColor(baseColor)
  return instance.darken(brightness).toHexString()
}
