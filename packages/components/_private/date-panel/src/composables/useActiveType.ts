/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePanelProps, DatePanelType } from '../types'
import type { ComputedRef } from 'vue'

import { watch } from 'vue'

import { useState } from '@idux/cdk/utils'

export interface ActiveTypeContext {
  activeType: ComputedRef<DatePanelType>
  setActiveType: (type: DatePanelType) => void
}

export function useActiveType(props: DatePanelProps): ActiveTypeContext {
  const [activeType, setActiveType] = useState(props.type)

  watch(() => props.type, setActiveType)

  watch(
    () => props.visible,
    visible => visible && setActiveType(props.type),
  )

  return {
    activeType,
    setActiveType,
  }
}
