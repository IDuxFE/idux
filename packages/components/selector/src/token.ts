/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SelectorProps } from './types'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface SelectorContext {
  props: SelectorProps
  mergedPrefixCls: ComputedRef<string>
  mergedSearchable: ComputedRef<boolean>
  mirrorRef: Ref<HTMLSpanElement | undefined>
  inputRef: Ref<HTMLInputElement | undefined>
  inputValue: Ref<string>
  isComposing: Ref<boolean>
  mergedFocused: ComputedRef<boolean>
  handleCompositionStart: (evt: CompositionEvent) => void
  handleCompositionEnd: (evt: CompositionEvent) => void
  handleInput: (evt: Event) => void
  handleEnterDown: (evt: KeyboardEvent) => void
}

export const selectorToken: InjectionKey<SelectorContext> = Symbol('selectorToken')
