/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TypographyOptions, TypographyProps } from './types'
import type { FunctionDirective } from 'vue'

import { isObject } from 'lodash-es'

import { Logger, addClass, removeClass } from '@idux/cdk/utils'

/**
 * @deprecated
 */
const typography: FunctionDirective<HTMLElement, TypographyProps> = (el, binding) => {
  if (__DEV__) {
    Logger.warn('components/typography', 'the directive was deprecated.')
  }
  const className: string[] = ['ix-typography']
  const { value, oldValue } = binding

  const oldOptions: TypographyOptions = isObject(oldValue) ? oldValue : { type: oldValue ?? undefined }
  const newOptions: TypographyOptions = isObject(value) ? value : { type: value }

  if (isLegality(oldOptions.type)) {
    removeClass(el, `ix-typography-${oldOptions.type}`)
  }
  if (oldOptions.disabled) {
    removeClass(el, 'ix-typography-disabled')
  }

  if (isLegality(newOptions.type)) {
    className.push(`ix-typography-${newOptions.type}`)
  }
  if (newOptions.disabled) {
    className.push('ix-typography-disabled')
  }

  addClass(el, className)
}

export default typography

function isLegality(type?: string): boolean {
  const types: string[] = ['success', 'warning', 'error', 'secondary']

  if (!type) {
    return false
  }

  if (types.includes(type)) {
    return true
  }

  __DEV__ && Logger.warn('components/typography', `${type} is not includes in ${types}.`)
  return false
}
