import type { Directive } from 'vue'
import type { TypographyConfig, TypographyOptions } from './types'

import { isNil, isString } from '@idux/cdk/utils'
import { Logger } from '@idux/components/core/logger'

const typography: Directive<HTMLElement, TypographyConfig> = (el, binding) => {
  const classNames: string[] = [...Array.from(el.classList), 'ix-typography']
  const { value } = binding
  const options: TypographyOptions = isString(value) || isNil(value) ? { type: value } : value

  const { type, disabled } = options
  if (isLegality(type)) {
    classNames.push(`ix-typography-${type}`)
  }
  if (disabled) {
    classNames.push('ix-typography-disabled')
  }
  el.className = classNames.join(' ')
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
