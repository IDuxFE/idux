/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ActiveSegmentContext } from './composables/useActiveSegment'
import type { FocusStateContext } from './composables/useFocusedState'
import type { SearchStateWatcherContext } from './composables/useSearchStateWatcher'
import type { SearchStateContext } from './composables/useSearchStates'
import type { SearchTriggerContext } from './composables/useSearchTrigger'
import type { SegmentOverlayUpdateContext } from './composables/useSegmentOverlayUpdate'
import type { SegmentStatesContext } from './composables/useSegmentStates'
import type { ProSearchProps, ResolvedSearchField } from './types'
import type { ɵOverlayProps } from '@idux/components/_private/overlay'
import type { ProSearchLocale } from '@idux/pro/locales'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface ProSearchContext
  extends FocusStateContext,
    SearchStateContext,
    SearchStateWatcherContext,
    ActiveSegmentContext,
    SearchTriggerContext {
  elementRef: Ref<HTMLElement | undefined>
  tempSegmentInputRef: Ref<HTMLInputElement | undefined>
  props: ProSearchProps
  locale: ProSearchLocale
  mergedPrefixCls: ComputedRef<string>
  enableQuickSelect: ComputedRef<boolean>
  commonOverlayProps: ComputedRef<ɵOverlayProps>
  resolvedSearchFields: ComputedRef<ResolvedSearchField[]>
  focused: ComputedRef<boolean>
}

export interface SearchItemContext extends SegmentOverlayUpdateContext, SegmentStatesContext {}

export const proSearchContext: InjectionKey<ProSearchContext> = Symbol('proSearchContext')
export const searchItemContext: InjectionKey<SearchItemContext> = Symbol('searchItemContext')
