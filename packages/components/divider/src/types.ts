import type { DefineComponent } from 'vue'
import type { DividerPosition, DividerType } from '@idux/components/config'

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

export type DividerComponent = InstanceType<DefineComponent<DividerProps>>
