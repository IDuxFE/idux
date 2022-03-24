/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type InjectionKey } from 'vue'

import { type TimelineProps } from './types'

export interface TimelineContext {
  props: TimelineProps
  mergedPrefixCls: ComputedRef<string>
}

export const timelineToken: InjectionKey<TimelineContext> = Symbol('timelineToken')

export const timelineItemKey = Symbol('IDUX_TIMELINE_ITEM_KEY')
