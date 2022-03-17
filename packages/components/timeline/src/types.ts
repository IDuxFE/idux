/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type TimelinePlacement = 'start' | 'alternate' | 'end'
export type TimelineItemPlacement = 'start' | 'end'

export const timelineProps = {
  pending: IxPropTypes.oneOfType([String, Boolean]).def(false),
  pendingDot: IxPropTypes.string,
  reverse: IxPropTypes.bool.def(false),
  placement: IxPropTypes.oneOf<TimelinePlacement>(['start', 'alternate', 'end']).def('end'),
  both: IxPropTypes.bool.def(true),
}

export type TimelineProps = ExtractInnerPropTypes<typeof timelineProps>
export type TimelinePublicProps = ExtractPublicPropTypes<typeof timelineProps>
export type TimelineComponent = DefineComponent<Omit<HTMLAttributes, keyof TimelinePublicProps> & TimelinePublicProps>
export type TimelineInstance = InstanceType<DefineComponent<TimelineProps>>

export const timelineItemProps = {
  color: IxPropTypes.string.def('primary'),
  dot: IxPropTypes.string,
  label: IxPropTypes.string,
  placement: IxPropTypes.oneOf<TimelineItemPlacement>(['start', 'end']),
}

export type TimelineItemProps = ExtractInnerPropTypes<typeof timelineItemProps>
export type TimelineItemPublicProps = ExtractPublicPropTypes<typeof timelineItemProps>
export type TimelineItemComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TimelineItemPublicProps> & TimelineItemPublicProps
>
export type TimelineItemInstance = InstanceType<DefineComponent<TimelineItemProps>>
