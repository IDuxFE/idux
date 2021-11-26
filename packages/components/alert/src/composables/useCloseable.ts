/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AlertProps } from '../types'
import type { AlertConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { callEmit, useState } from '@idux/cdk/utils'

export interface CloseableContext {
  closeable: ComputedRef<boolean>
  visible: ComputedRef<boolean>
  handleClose: () => Promise<void>
}

export function useCloseable(props: AlertProps, config: AlertConfig): CloseableContext {
  const closeable = computed(() => props.closable ?? config.closable)
  const [visible, setVisible] = useState(true)

  const handleClose = async () => {
    const result = await callEmit(props.onBeforeClose)
    if (result === false) {
      return
    }
    setVisible(false)
    callEmit(props.onClose)
  }

  return { closeable, visible, handleClose }
}
