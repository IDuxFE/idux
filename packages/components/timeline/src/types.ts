import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const timelineProps = {
  pending: IxPropTypes.oneOfType([String, Boolean]).def(false),
  pendingDot: IxPropTypes.string,
  reverse: IxPropTypes.bool.def(false),
  position: IxPropTypes.oneOf<TimelinePosition>(['left', 'alternate', 'right']).def('right'),
}

export type TimelineProps = IxExtractPropTypes<typeof timelineProps>

export type TimelineInstance = InstanceType<DefineComponent<TimelineProps>>

export type TimelineItemPosition = 'left' | 'right'

export const timelineItemProps = {
  color: IxPropTypes.string.def('primary'),
  dot: IxPropTypes.string,
  position: IxPropTypes.oneOf<TimelineItemPosition>(['left', 'right']),
}

export type TimelineItemProps = IxExtractPropTypes<typeof timelineItemProps>

export type TimelineItemInstance = InstanceType<DefineComponent<TimelineItemProps>>

export type TimelinePosition = 'left' | 'alternate' | 'right'
