import { installComponent } from '@idux/components/core/utils'
import IxTimeline from './src/Timeline.vue'
import IxTimelineItem from './src/TimelineItem.vue'

IxTimeline.install = installComponent(IxTimeline)
IxTimelineItem.install = installComponent(IxTimelineItem)

export { IxTimeline, IxTimelineItem }

export type {
  TimelineComponent,
  TimelineProps,
  TimelinePosition,
  TimelineItemComponent,
  TimelineItemProps,
  TimelineItemPosition,
} from './src/types'
