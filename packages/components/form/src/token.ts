/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FormColType, FormLabelAlign, FormSize } from './types'
import type { AbstractControl } from '@idux/cdk/forms'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

import { inject, onBeforeUnmount } from 'vue'

import { useKey } from '@idux/components/utils'

export interface InnerFormContext {
  colonless: ComputedRef<boolean>
  controlCol: Ref<FormColType | undefined>
  hasFeedback: Ref<boolean>
  labelAlign: ComputedRef<FormLabelAlign>
  labelCol: Ref<FormColType | undefined>
}

export const formToken: InjectionKey<InnerFormContext> = Symbol('formToken')

// public token
export interface FormContext {
  size: Ref<FormSize>
}
export const FORM_TOKEN: InjectionKey<FormContext> = Symbol('FORM_TOKEN')

export interface FormItemContext {
  registerControl: (key: VKey, control: Ref<AbstractControl | undefined>) => void
  unregisterControl: (key: VKey) => void
}

// public token
export const FORM_ITEM_TOKEN: InjectionKey<FormItemContext> = Symbol('FORM_ITEM_TOKEN')

export function useFormItemRegister(control: Ref<AbstractControl | undefined>): void {
  const context = inject(FORM_ITEM_TOKEN, null)
  if (context) {
    const key = useKey()
    const { registerControl, unregisterControl } = context
    registerControl(key, control)
    onBeforeUnmount(() => unregisterControl(key))
  }
}
