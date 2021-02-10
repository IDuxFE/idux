import type { Directive } from 'vue'
import type { TypographyConfig, TypographyOptions } from './types'

import { isObject, addClass, removeClass } from '@idux/cdk/utils'
import { Logger } from '@idux/components/core/logger'

const typography: Directive<HTMLElement, TypographyConfig> = (el, binding) => {
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

  Logger.error(`${type} is not includes in ${types}.`)
  return false
}
