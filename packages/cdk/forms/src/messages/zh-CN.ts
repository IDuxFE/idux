/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { AbstractControl } from '../controls'
import type { ValidateError } from '../types'

const defaultName = '此项'

export const zhCNMessages = {
  default: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name
    return `${name || ''}验证失败`
  },
  required: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name}必填`
  },
  requiredTrue: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name}必须为 'true'`
  },
  email: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name}不是一个有效的邮箱地址`
  },
  min: (err: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name}不能小于 ${err.min}`
  },
  max: (err: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name}不能大于 ${err.max}`
  },
  minLength: (err: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name}的长度不能小于 ${err.minLength}, 当前长度为 ${err.actual}`
  },
  maxLength: (err: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name}的长度不能小于 ${err.maxLength}, 当前长度为 ${err.actual}`
  },
  pattern: (err: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const name = control.name || defaultName
    return `${name}不能匹配 '${err.pattern}'`
  },
}
