import type { DefineComponent } from 'vue'
import type { DividerPosition, DividerType } from '@idux/components/core/types'

export interface DividerProps {
  /* dashed divider */
  dashed?: boolean
  /* common text style */
  plain?: boolean
  /* position of the text */
  position?: DividerPosition
  /* horizontal divider or vertical divider */
  type?: DividerType
}

export type IxDividerComponent = InstanceType<DefineComponent<DividerProps>>
