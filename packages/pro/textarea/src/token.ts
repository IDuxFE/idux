/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ErrorLinesContext } from './composables/useErrorLines'
import type { ProTextareaProps } from './types'
import type { ɵBoxSizingData } from '@idux/components/textarea'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface ProTextareaContext extends ErrorLinesContext {
  props: ProTextareaProps
  boxSizingData: ComputedRef<ɵBoxSizingData>
  lineHeight: ComputedRef<number>
  mergedPrefixCls: ComputedRef<string>
  rowCounts: ComputedRef<number[]>
  textareaRef: Ref<HTMLTextAreaElement | undefined>
  handleInput: (evt: Event) => void
  handleCompositionStart: (evt: CompositionEvent) => void
  handleCompositionEnd: (evt: CompositionEvent) => void
}

export const proTextareaContext: InjectionKey<ProTextareaContext> = Symbol('proTextareaContext')
