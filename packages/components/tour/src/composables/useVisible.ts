/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TourProps } from '../types'
import type { ComputedRef } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

export interface VisibleContext {
  visible: ComputedRef<boolean>
  setVisible: (visible: boolean) => void
}

export function useVisible(props: TourProps): VisibleContext {
  const [visible, setVisible] = useControlledProp(props, 'visible', false)

  return {
    visible,
    setVisible,
  }
}
