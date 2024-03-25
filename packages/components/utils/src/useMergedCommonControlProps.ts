/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FormSize } from '@idux/components/form'

import { type ComputedRef, computed } from 'vue'

import { useFormSize } from '@idux/components/form'

interface CommonControlProps {
  borderless: boolean
  clearIcon: string
  size: FormSize
  suffix: string
}

export function useMergedCommonControlProps(
  props: Partial<CommonControlProps>,
  config: CommonControlProps,
): ComputedRef<CommonControlProps> {
  const mergedSize = useFormSize(props, config)
  return computed(() => ({
    borderless: props.borderless ?? config.borderless,
    clearIcon: props.clearIcon ?? config.clearIcon,
    size: mergedSize.value,
    suffix: props.suffix ?? config.suffix,
  }))
}
