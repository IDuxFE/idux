import type { DefineComponent } from 'vue'
import type { DividerPosition, DividerType } from '@idux/components/core/types'

interface DividerOriginalProps {
  /* dashed divider */
  dashed?: boolean
  /* common text style */
  plain?: boolean
  /* position of the text */
  position?: DividerPosition
  /* horizontal divider or vertical divider */
  type?: DividerType
}

export type DividerProps = Readonly<DividerOriginalProps>

export type IxDividerComponent = InstanceType<DefineComponent<DividerProps>>
