/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OperationsContext } from './composables/useOperations'
import type { OverlayStateContext } from './composables/useOverlayState'
import type { PanelActiveStateContext } from './composables/usePanelActiveState'
import type { MergedTagData, TagDataContext } from './composables/useTagData'
import type { TagEditContext } from './composables/useTagEdit'
import type { ProTagSelectProps, TagSelectColor } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { SelectorInstance } from '@idux/components/selector'
import type { ProTagSelectLocale } from '@idux/pro/locales'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface ProTagSelectContext
  extends TagDataContext,
    TagEditContext,
    OperationsContext,
    OverlayStateContext,
    PanelActiveStateContext {
  triggerRef: Ref<SelectorInstance | undefined>
  props: ProTagSelectProps
  focused: ComputedRef<boolean>
  mergedTagSelectColors: ComputedRef<TagSelectColor[]>
  selectedValue: ComputedRef<VKey[] | undefined>
  mergedData: ComputedRef<MergedTagData[]>
  maxExceeded: ComputedRef<boolean>
  inputValue: ComputedRef<string | undefined>
  inputFullyMatched: ComputedRef<boolean>
  mergedPrefixCls: ComputedRef<string>
  locale: ProTagSelectLocale
}

export const proTagSelectContext: InjectionKey<ProTagSelectContext> = Symbol('proTagSelectContext')
