import { isString } from '@idux/cdk/utils'
import { Logger } from '../logger'

export function getTarget(target: string | HTMLElement | Window | undefined): HTMLElement | Window {
  if (isString(target)) {
    const targetDom = document.querySelector<HTMLElement>(target)
    if (targetDom) {
      return targetDom
    } else {
      Logger.warn(`target does not exist: ${target}, default value are already used: window.`)
      return window
    }
  }

  return target || window
}
