/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ScrollbarComponent } from './types'

import Scrollbar from './Scrollbar'

const CdkScrollbar = Scrollbar as ScrollbarComponent

export { CdkScrollbar }

export type { ScrollbarComponent, ScrollBarInstance, ScrollbarPublicProps as ScrollbarProps } from './types'
