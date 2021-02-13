import type { DefineComponent } from 'vue'

interface TimelineOriginalProps {
  pending?: string | boolean
  pendingDot?: string
  reverse?: boolean
  mode?: TimelineMode
}

export type TimelineProps = Readonly<TimelineOriginalProps>

export type TimelineComponent = InstanceType<DefineComponent<TimelineProps>>

interface TimelineItemOriginalProps {
  color?: string
  dot?: string
  position?: TimelineItemMode
}

export type TimelineItemProps = Readonly<TimelineItemOriginalProps>

export type TimelineItemComponent = InstanceType<DefineComponent<TimelineItemProps>>

export type TimelineMode = 'left' | 'alternate' | 'right'

export type TimelineItemMode = 'left' | 'right'
