/* eslint-disable @typescript-eslint/no-explicit-any */

const logWrapper = (args: any[], log: (...args: any[]) => void) => {
  log('[@idux]', ...args)
}

const info = (...args: any[]): void => logWrapper(args, console.log)
const warn = (...args: any[]): void => logWrapper(args, console.warn)
const error = (...args: any[]): void => logWrapper(args, console.error)

export const Logger = { info, warn, error }
