/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProgressProps } from '../types'
import type { ProgressConfig } from '@idux/components/config'

import { type ComputedRef, computed } from 'vue'

export function useProps(props: ProgressProps, config: ProgressConfig): ComputedRef<ProgressProps> {
  return computed(() => ({
    ...props,
    size: props.size ?? config.size,
    strokeWidth: props.strokeWidth ?? config.strokeWidth,
    strokeLinecap: props.strokeLinecap ?? config.strokeLinecap,
  }))
}
