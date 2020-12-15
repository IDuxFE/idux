/* eslint-disable @typescript-eslint/no-explicit-any */
import { isDevMode } from '../utils/isDevMode'

const prefix = '[@idux/components]:'

const logWrapper = (args: any[], log: (...args: any[]) => void) => {
  if (isDevMode) {
    log(prefix, ...args)
  }
}

const info = (...args: any[]): void => logWrapper(args, console.log)
const warn = (...args: any[]): void => logWrapper(args, console.warn)
const error = (...args: any[]): void => logWrapper(args, console.error)

export const Logger = { info, warn, error }
