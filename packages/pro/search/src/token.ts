/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ActiveSegmentContext } from './composables/useActiveSegment'
import type { CacheDataContext } from './composables/useCacheData'
import type { FocusStateContext } from './composables/useFocusedState'
import type { ResolvedSearchFieldsContext } from './composables/useResolvedSearchFields'
import type { SearchStateContext } from './composables/useSearchStates'
import type { SegmentOverlayUpdateContext } from './composables/useSegmentOverlayUpdate'
import type { SegmentStatesContext } from './composables/useSegmentStates'
import type { ProSearchProps } from './types'
import type { ɵOverlayProps } from '@idux/components/_private/overlay'
import type { ProSearchLocale } from '@idux/pro/locales'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface ProSearchContext
  extends FocusStateContext, SearchStateContext, ResolvedSearchFieldsContext, ActiveSegmentContext, CacheDataContext {
  elementRef: Ref<HTMLElement | undefined>
  tempSegmentInputRef: Ref<HTMLInputElement | undefined>
  props: ProSearchProps
  locale: ProSearchLocale
  mergedPrefixCls: ComputedRef<string>
  enableQuickSelect: ComputedRef<boolean>
  commonOverlayProps: ComputedRef<ɵOverlayProps>
  focused: ComputedRef<boolean>
}

export interface SearchItemContext extends SegmentOverlayUpdateContext, SegmentStatesContext {}

export const proSearchContext: InjectionKey<ProSearchContext> = Symbol('proSearchContext')
export const searchItemContext: InjectionKey<SearchItemContext> = Symbol('searchItemContext')
