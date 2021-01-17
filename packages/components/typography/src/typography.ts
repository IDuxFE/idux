import type { Directive } from 'vue'
import type { TypographyConfig } from './types'

import { isNonNil } from '@idux/cdk/utils'

const typography: Directive<HTMLElement, TypographyConfig> = (el, binding) => {
  const classNames: string[] = ['ix-typography']
  const options = binding.value
  if (typeof options === 'string') {
    classNames.push(`ix-typography-${options}`)
  } else if (isNonNil(options)) {
    const { type, disabled } = options
    if (isNonNil(type)) {
      classNames.push(`ix-typography-${type}`)
    }
    if (disabled) {
      classNames.push('ix-typography-disabled')
    }
  }
  el.className = classNames.join(' ')
}

export default typography
