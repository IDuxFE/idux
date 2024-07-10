/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'
import type { FunctionalComponent, HTMLAttributes } from 'vue'

export interface DndBoxIndicatorProps {
  edge: Edge
  gap?: number | string
}
export type DndBoxIndicatorComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof DndBoxIndicatorProps> & DndBoxIndicatorProps
>
