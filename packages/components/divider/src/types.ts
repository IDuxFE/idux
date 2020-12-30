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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IxDividerComponent extends DividerProps {}
