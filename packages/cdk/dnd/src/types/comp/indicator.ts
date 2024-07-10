/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ListInstruction, TreeInstruction } from '../sortable'
import type { FunctionalComponent, HTMLAttributes, HtmlHTMLAttributes } from 'vue'

export interface DndBoxIndicatorProps {
  edge: ListInstruction['edge']
  gap?: number | string
  isFirst?: boolean
  isLast?: boolean
}
export type DndBoxIndicatorComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof DndBoxIndicatorProps> & DndBoxIndicatorProps
>

export type TreeIndicatorInstruction =
  | TreeInstruction
  | { type: 'mark-parent'; currentLevel: number; indentPerLevel: number }

export interface DndTreeIndicatorProps {
  instruction: TreeIndicatorInstruction
  isFirst?: boolean
  isLast?: boolean
}
export type DndTreeIndicatorComponent = FunctionalComponent<
  Omit<HtmlHTMLAttributes, keyof DndTreeIndicatorProps> & DndTreeIndicatorProps
>
