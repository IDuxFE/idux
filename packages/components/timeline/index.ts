import type { App } from 'vue'

import IxTimeline from './src/Timeline.vue'
import IxTimelineItem from './src/TimelineItem.vue'

IxTimeline.install = (app: App): void => {
  app.component(IxTimeline.name, IxTimeline)
}

IxTimelineItem.install = (app: App): void => {
  app.component(IxTimelineItem.name, IxTimelineItem)
}

export { IxTimeline, IxTimelineItem }

export type {
  TimelineInstance,
  TimelineProps,
  TimelinePosition,
  TimelineItemInstance,
  TimelineItemProps,
  TimelineItemPosition,
} from './src/types'
