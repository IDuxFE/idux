/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimelineComponent, TimelineItemComponent } from './src/types'

import Timeline from './src/Timeline.vue'
import TimelineItem from './src/TimelineItem.vue'

const IxTimeline = Timeline as unknown as TimelineComponent
const IxTimelineItem = TimelineItem as unknown as TimelineItemComponent

export { IxTimeline, IxTimelineItem }

export type {
  TimelineInstance,
  TimelineComponent,
  TimelinePublicProps as TimelineProps,
  TimelineItemInstance,
  TimelineItemComponent,
  TimelineItemPublicProps as TimelineItemProps,
  TimelineItemPosition,
} from './src/types'
