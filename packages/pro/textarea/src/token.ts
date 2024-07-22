/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ErrorLinesContext } from './composables/useErrorLines'
import type { LineRenderContext } from './composables/useLineRender'
import type { ProTextareaProps } from './types'
import type { FormAccessor } from '@idux/cdk/forms'
import type { ɵBoxSizingData } from '@idux/components/textarea'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface ProTextareaContext extends ErrorLinesContext, LineRenderContext {
  props: ProTextareaProps
  accessor: FormAccessor
  boxSizingData: ComputedRef<ɵBoxSizingData>
  lineHeight: Ref<number>
  mergedPrefixCls: ComputedRef<string>
  rowCounts: ComputedRef<number[]>
  rowHeights: ComputedRef<number[]>
  textareaRef: Ref<HTMLTextAreaElement | undefined>
  handleInput: (evt: Event) => void
  handleCompositionStart: (evt: CompositionEvent) => void
  handleCompositionEnd: (evt: CompositionEvent) => void
}

export const proTextareaContext: InjectionKey<ProTextareaContext> = Symbol('proTextareaContext')
