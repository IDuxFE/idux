import { isString } from 'lodash-es'
import { Logger } from '@idux/cdk/utils'

export function getTarget(target: string | HTMLElement | Window | undefined): HTMLElement | Window {
  if (isString(target)) {
    const targetDom = document.querySelector<HTMLElement>(target)
    if (targetDom) {
      return targetDom
    } else {
      __DEV__ &&
        Logger.warn('components/utils', `target does not exist: ${target}, default value are already used: window.`)
      return window
    }
  }

  return target || window
}
