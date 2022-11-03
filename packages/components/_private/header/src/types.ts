/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { HeaderProps as IxHeaderProps } from '@idux/components/header'
import type { VNode } from 'vue'

export interface HeaderProps {
  closable?: boolean
  closeIcon?: string | VNode
  header?: string | IxHeaderProps
  size?: 'lg' | 'md' | 'sm'
  onClose?: (evt: Event) => void
}
