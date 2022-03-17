/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimelineComponent, TimelineItemComponent } from './src/types'

import Timeline from './src/Timeline'
import TimelineItem from './src/TimelineItem'

const IxTimeline = Timeline as unknown as TimelineComponent
const IxTimelineItem = TimelineItem as unknown as TimelineItemComponent

export { IxTimeline, IxTimelineItem }

export type {
  TimelineInstance,
  TimelineComponent,
  TimelinePlacement,
  TimelinePublicProps as TimelineProps,
  TimelineItemInstance,
  TimelineItemComponent,
  TimelineItemPlacement,
  TimelineItemPublicProps as TimelineItemProps,
} from './src/types'
