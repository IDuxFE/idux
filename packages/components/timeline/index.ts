import type { TimelineComponent, TimelineItemComponent } from './src/types'

import Timeline from './src/Timeline.vue'
import TimelineItem from './src/TimelineItem.vue'

const IxTimeline = Timeline as unknown as TimelineComponent
const IxTimelineItem = TimelineItem as unknown as TimelineItemComponent

export { IxTimeline, IxTimelineItem }

export type {
  TimelineInstance,
  TimelinePublicProps as TimelineProps,
  TimelineItemInstance,
  TimelineItemPublicProps as TimelineItemProps,
  TimelineItemPosition,
} from './src/types'
