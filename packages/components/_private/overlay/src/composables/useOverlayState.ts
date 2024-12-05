/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperEvents, PopperTriggerEvents } from '@idux/cdk/popper'
import type { ComputedRef } from 'vue'

import { useState } from '@idux/cdk/utils'

export interface OveralyStateContext {
  isHovered: ComputedRef<boolean>
  isFocused: ComputedRef<boolean>
  stateTriggerEvents: PopperTriggerEvents
  statePopperEvents: PopperEvents
}

export function useOverlayStates(): OveralyStateContext {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleMouseenter = () => setIsHovered(true)
  const handleMouseleave = () => setIsHovered(false)
  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const stateTriggerEvents = {
    onMouseenter: handleMouseenter,
    onMouseleave: handleMouseleave,
    onFocus: handleFocus,
    onBlur: handleBlur,
  }

  const statePopperEvents = {
    onMouseenter: handleMouseenter,
    onMouseleave: handleMouseleave,
  }

  return {
    isHovered,
    isFocused,
    stateTriggerEvents,
    statePopperEvents,
  }
}
