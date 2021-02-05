/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDUX_COMPONENTS_PREFIX } from '../constant'
import { isDevMode } from '../utils'

const logWrapper = (args: any[], log: (...args: any[]) => void) => {
  if (isDevMode) {
    log(IDUX_COMPONENTS_PREFIX, ...args)
  }
}

const info = (...args: any[]): void => logWrapper(args, console.log)
const warn = (...args: any[]): void => logWrapper(args, console.warn)
const error = (...args: any[]): void => logWrapper(args, console.error)

export const Logger = { info, warn, error }
