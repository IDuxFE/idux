/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OverlayProps } from '../types'
import type { PopperTrigger } from '@idux/cdk/popper'

import { type ComputedRef, inject, nextTick, onMounted, watch } from 'vue'

import { useControlledProp, useState } from '@idux/cdk/utils'

import { OverlayVisibleLockToken } from '../token'

export function useVisible(
  props: OverlayProps,
  trigger: ComputedRef<PopperTrigger>,
  isHovered: ComputedRef<boolean>,
  isFocused: ComputedRef<boolean>,
): {
  visible: ComputedRef<boolean>
  visibleLocked: ComputedRef<boolean>
  updateVisible: (visible: boolean) => void
  lock: () => void
  unlock: () => void
} {
  const parentLockContext = inject(OverlayVisibleLockToken, null)

  const [visible, setVisible] = useControlledProp(props, 'visible', false)
  const [visibleLocked, setVisibleLocked] = useState(false)
  const lock = () => {
    setVisibleLocked(true)

    if (parentLockContext?.lock) {
      parentLockContext.lock()
    }
  }

  const unlock = () => {
    setVisibleLocked(false)

    if ((trigger.value === 'hover' && !isHovered.value) || (trigger.value === 'focus' && !isFocused.value)) {
      setVisible(false)
    }
  }

  const updateVisible = (v: boolean) => {
    if (visibleLocked.value) {
      return
    }

    setVisible(v)
  }

  onMounted(() => {
    watch(visible, v => {
      nextTick(() => {
        if (v) {
          parentLockContext?.lock()
        } else {
          parentLockContext?.unlock()
        }
      })
    })
    if (visible.value) {
      parentLockContext?.lock()
    }
  })

  return {
    visible,
    visibleLocked,
    updateVisible,
    lock,
    unlock,
  }
}
