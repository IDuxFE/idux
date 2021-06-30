import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type TimelinePosition = 'left' | 'alternate' | 'right'

export const timelineProps = {
  pending: IxPropTypes.oneOfType([String, Boolean]).def(false),
  pendingDot: IxPropTypes.string,
  reverse: IxPropTypes.bool.def(false),
  position: IxPropTypes.oneOf<TimelinePosition>(['left', 'alternate', 'right']).def('right'),
}

export type TimelineProps = IxInnerPropTypes<typeof timelineProps>
export type TimelinePublicProps = IxPublicPropTypes<typeof timelineProps>
export type TimelineComponent = DefineComponent<HTMLAttributes & typeof timelineProps>
export type TimelineInstance = InstanceType<DefineComponent<TimelineProps>>

export type TimelineItemPosition = 'left' | 'right'

export const timelineItemProps = {
  color: IxPropTypes.string.def('primary'),
  dot: IxPropTypes.string,
  position: IxPropTypes.oneOf<TimelineItemPosition>(['left', 'right']),
}

export type TimelineItemProps = IxInnerPropTypes<typeof timelineItemProps>
export type TimelineItemPublicProps = IxPublicPropTypes<typeof timelineItemProps>
export type TimelineItemComponent = DefineComponent<HTMLAttributes & typeof timelineItemProps>
export type TimelineItemInstance = InstanceType<DefineComponent<TimelineItemProps>>
