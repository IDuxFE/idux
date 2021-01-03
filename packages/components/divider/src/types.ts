import type { DefineComponent } from 'vue'
import type { DividerPosition, DividerType } from '@idux/components/core/config'

export type { DividerPosition, DividerType }

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

export type DividerComponent = InstanceType<DefineComponent<DividerProps>>
