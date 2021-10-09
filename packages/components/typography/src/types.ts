/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FunctionDirective } from 'vue'

export type TypographyType = 'success' | 'warning' | 'secondary' | 'error'

export interface TypographyOptions {
  type?: TypographyType
  disabled?: boolean
}

export type TypographyProps = TypographyType | TypographyOptions

export type TypographyInstance = FunctionDirective<HTMLElement, TypographyProps>
