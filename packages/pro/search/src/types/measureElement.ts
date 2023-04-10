/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MaybeArray } from '@idux/cdk/utils'
import type { PropType } from 'vue'

export const measureElementProps = {
  onWidthChange: [Function, Array] as PropType<MaybeArray<(width: number) => void>>,
} as const
