import type { DefineComponent } from 'vue'

export type TimelinePosition = 'left' | 'alternate' | 'right'
export interface TimelineProps {
  pending?: string | boolean
  pendingDot?: string
  reverse?: boolean
  position?: TimelinePosition
}

export type TimelineComponent = InstanceType<DefineComponent<TimelineProps>>

export type TimelineItemPosition = 'left' | 'right'
export interface TimelineItemProps {
  color?: string
  dot?: string
  position?: TimelineItemPosition
}

export type TimelineItemComponent = InstanceType<DefineComponent<TimelineItemProps>>
