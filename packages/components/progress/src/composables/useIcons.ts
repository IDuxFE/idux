/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProgressIcons, ProgressProps } from '../types'
import type { ProgressConfig } from '@idux/components/config'

import { type ComputedRef, computed } from 'vue'

const defaultIcons: ProgressIcons = {
  success: 'check',
  exception: 'close',
}

export function useIcons(props: ProgressProps, config: ProgressConfig): ComputedRef<ProgressIcons> {
  return computed(() => ({
    success: props.icons?.success ?? config.icon?.success ?? defaultIcons.success,
    exception: props.icons?.exception ?? config.icon?.exception ?? defaultIcons.exception,
  }))
}
