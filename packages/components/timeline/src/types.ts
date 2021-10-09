/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

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
export type TimelineComponent = DefineComponent<Omit<HTMLAttributes, keyof TimelinePublicProps> & TimelinePublicProps>
export type TimelineInstance = InstanceType<DefineComponent<TimelineProps>>

export type TimelineItemPosition = 'left' | 'right'

export const timelineItemProps = {
  color: IxPropTypes.string.def('primary'),
  dot: IxPropTypes.string,
  position: IxPropTypes.oneOf<TimelineItemPosition>(['left', 'right']),
}

export type TimelineItemProps = IxInnerPropTypes<typeof timelineItemProps>
export type TimelineItemPublicProps = IxPublicPropTypes<typeof timelineItemProps>
export type TimelineItemComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TimelineItemPublicProps> & TimelineItemPublicProps
>
export type TimelineItemInstance = InstanceType<DefineComponent<TimelineItemProps>>
