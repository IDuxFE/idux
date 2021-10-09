/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AnchorLinkProps } from './types'
import type { InjectionKey, Ref } from 'vue'

export interface AnchorContext {
  registerLink: (link: string) => void
  unregisterLink: (link: string) => void
  activeLink: Ref<string | undefined>
  handleLinkClick: (evt: MouseEvent, link: AnchorLinkProps) => void
}

export const anchorToken: InjectionKey<AnchorContext> = Symbol('anchorToken')
