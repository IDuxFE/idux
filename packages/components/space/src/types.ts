import type { DefineComponent } from 'vue'
import type { SpaceSize } from '@idux/components/config'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

const spaceSizeProp = IxPropTypes.oneOf<SpaceSize>(['small', 'medium', 'large'])

export const spaceProps = {
  align: IxPropTypes.oneOf<SpaceAlign>(['start', 'center', 'end', 'baseline']).def('baseline'),
  direction: IxPropTypes.oneOf<SpaceDirection>(['vertical', 'horizontal']).def('horizontal'),
  size: IxPropTypes.oneOfType([spaceSizeProp, Number, IxPropTypes.array<SpaceSize>()]),
  split: IxPropTypes.string,
  wrap: IxPropTypes.bool,
}

export type SpaceProps = IxExtractPropTypes<typeof spaceProps>

export type SpaceInstance = InstanceType<DefineComponent<SpaceProps>>

export type SpaceAlign = 'start' | 'center' | 'end' | 'baseline'
export type SpaceDirection = 'vertical' | 'horizontal'
