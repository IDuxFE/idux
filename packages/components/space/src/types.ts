import type { DefineComponent } from 'vue'
import type { SpaceSize } from '@idux/components/config'

import { PropTypes } from '@idux/cdk/utils'

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

const spaceSizePropType = PropTypes.oneOf(['small', 'medium', 'large'] as const)

export const spacePropsDef = {
  align: PropTypes.oneOf(['start', 'center', 'end', 'baseline'] as const).def('baseline'),
  direction: PropTypes.oneOf(['vertical', 'horizontal'] as const).def('horizontal'),
  size: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([spaceSizePropType, PropTypes.number])),
    PropTypes.oneOfType([spaceSizePropType, PropTypes.number]),
  ]),
  split: PropTypes.string,
  wrap: PropTypes.bool,
}

export type SpaceInstance = InstanceType<DefineComponent<SpaceProps>>
