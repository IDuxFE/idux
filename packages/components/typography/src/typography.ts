import type { Directive } from 'vue'
import type { TypographyConfig, TypographyOptions } from './types'

import { isNonNil, isObject } from '@idux/cdk/utils'
import { Logger } from '@idux/components/core/logger'

const typography: Directive<HTMLElement, TypographyConfig> = {
  created(el, binding) {
    const classNames: string[] = [el.className, 'ix-typography']
    const { value } = binding
    const options: TypographyOptions = isObject(value) ? value : { type: value }
    const { type, disabled } = options
    if (isLegality(type)) {
      classNames.push(`ix-typography-${type}`)
    }
    if (disabled) {
      classNames.push('ix-typography-disabled')
    }
    el.className = classNames.join(' ')
  },
  updated(el, binding) {
    const classNames = new Set([...Array.from(el.classList), 'ix-typography'])
    const { oldValue, value } = binding

    const { type: oldType, disabled: oldDisabled }: TypographyOptions = isObject(oldValue)
      ? oldValue
      : { type: oldValue ?? undefined }

    if (isLegality(oldType)) {
      classNames.delete(`ix-typography-${oldType}`)
    }
    if (isNonNil(oldDisabled)) {
      classNames.delete('ix-typography-disabled')
    }

    const { type, disabled }: TypographyOptions = isObject(value) ? value : { type: value }
    if (isLegality(type)) {
      classNames.add(`ix-typography-${type}`)
    }
    if (disabled) {
      classNames.add('ix-typography-disabled')
    }

    el.className = Array.from(classNames).join(' ')
  },
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
