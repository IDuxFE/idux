import type { DefineComponent } from 'vue'
import type { SpaceSize } from '@idux/components/config'

export type SpaceAlign = 'start' | 'center' | 'end' | 'baseline'
export type SpaceDirection = 'vertical' | 'horizontal'

export interface SpaceProps {
  /* Alignment direction of container */
  align?: SpaceAlign
  /* Spacing direction of flex item */
  direction?: SpaceDirection
  /**
   * Spacing size.
   * You can also pass in an array to customize the size of each spacing。
   */
  size?: SpaceSize | SpaceSize[]
  /**
   * Delimiter.
   * You can also pass in a slot to customize the delimiter.
   */
  split?: string
  /* Whether to wrap */
  wrap?: boolean
}

export type SpaceComponent = InstanceType<DefineComponent<SpaceProps>>
