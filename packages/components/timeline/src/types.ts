import type { DefineComponent } from 'vue'

interface TimelineOriginalProps {
  pending?: string | boolean
  pendingDot?: string
  reverse?: boolean
  position?: TimelinePosition
}

export type TimelineProps = Readonly<TimelineOriginalProps>

export type TimelineComponent = InstanceType<DefineComponent<TimelineProps>>

interface TimelineItemOriginalProps {
  color?: string
  dot?: string
  position?: TimelineItemPosition
}

export type TimelineItemProps = Readonly<TimelineItemOriginalProps>

export type TimelineItemComponent = InstanceType<DefineComponent<TimelineItemProps>>

export type TimelinePosition = 'left' | 'alternate' | 'right'

export type TimelineItemPosition = 'left' | 'right'
