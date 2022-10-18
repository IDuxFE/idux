/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { AbstractControl } from '../models/abstractControl'
import type { ValidateError } from '../types'

const defaultName = '此项'

export const zhCNMessages = {
  default: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    return `${control.name ?? ''}验证失败`
  },
  required: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const { name = defaultName, example } = control
    return `请输入${name}${example ? ', 例: ' + example : ''}`
  },
  requiredTrue: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const { name = defaultName } = control
    return `${name}必须为 'true'`
  },
  email: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const { example } = control
    return `请输入正确的邮箱格式${example ? ', 例: ' + example : ''}`
  },
  min: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    return `请输入不小于 ${err.min} 的数字`
  },
  max: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    return `请输入不大于 ${err.max} 的数字`
  },
  range: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    return `请输入 ${err.min}-${err.max} 之间的数字`
  },
  minLength: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    const { minLength, isArray } = err
    return isArray ? `请至少选择 ${minLength} 项` : `请至少输入 ${minLength} 个字符`
  },
  maxLength: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    const { maxLength, isArray } = err
    return isArray ? `请至多选择 ${maxLength} 项` : `请至多输入 ${maxLength} 个字符`
  },
  rangeLength: (err: Omit<ValidateError, 'message'>, __: AbstractControl): string => {
    const { minLength, maxLength, isArray } = err
    return isArray ? `请选择 ${minLength}-${maxLength} 项` : `请输入 ${minLength}-${maxLength} 个字符`
  },
  pattern: (_: Omit<ValidateError, 'message'>, control: AbstractControl): string => {
    const { example } = control
    return `请输入正确的格式${example ? ', 例: ' + example : ''}`
  },
}
