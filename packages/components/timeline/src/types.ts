/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type TimelinePlacement = 'start' | 'alternate' | 'end'
export type TimelineItemPlacement = 'start' | 'end'

export const timelineProps = {
  pending: {
    type: [String, Boolean],
    default: false,
  },
  pendingDot: String,
  reverse: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String as PropType<TimelinePlacement>,
    default: 'end',
  },
  both: {
    type: Boolean,
    default: true,
  },
} as const

export type TimelineProps = ExtractInnerPropTypes<typeof timelineProps>
export type TimelinePublicProps = ExtractPublicPropTypes<typeof timelineProps>
export type TimelineComponent = DefineComponent<Omit<HTMLAttributes, keyof TimelinePublicProps> & TimelinePublicProps>
export type TimelineInstance = InstanceType<DefineComponent<TimelineProps>>

export const timelineItemProps = {
  color: {
    type: String,
    default: 'primary',
  },
  dot: String,
  label: String,
  placement: String as PropType<TimelineItemPlacement>,
} as const

export type TimelineItemProps = ExtractInnerPropTypes<typeof timelineItemProps>
export type TimelineItemPublicProps = ExtractPublicPropTypes<typeof timelineItemProps>
export type TimelineItemComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TimelineItemPublicProps> & TimelineItemPublicProps
>
export type TimelineItemInstance = InstanceType<DefineComponent<TimelineItemProps>>
