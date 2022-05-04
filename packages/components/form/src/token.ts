/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type InjectionKey, type Ref } from 'vue'

import { type AbstractControl } from '@idux/cdk/forms'
import { type VKey } from '@idux/cdk/utils'
import { type FormConfig } from '@idux/components/config'

import { type FormProps, type FormSize } from './types'

export interface InnerFormContext {
  props: FormProps
  config: FormConfig
}

export const formToken: InjectionKey<InnerFormContext> = Symbol('formToken')

export interface FormContext {
  size: Ref<FormSize>
}
// public token
export const FORM_TOKEN: InjectionKey<FormContext> = Symbol('FORM_TOKEN')

export interface FormItemContext {
  registerControl: (key: VKey, control: Ref<AbstractControl | undefined>) => void
  unregisterControl: (key: VKey) => void
}

// public token
export const FORM_ITEM_TOKEN: InjectionKey<FormItemContext> = Symbol('FORM_ITEM_TOKEN')
