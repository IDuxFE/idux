/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

const logWrapper = (location: string, args: any[], log: (...args: any[]) => void) => {
  log(`[@idux/${location}]:`, ...args)
}

const info = (location: string, ...args: any[]): void => logWrapper(location, args, console.log)
const warn = (location: string, ...args: any[]): void => logWrapper(location, args, console.warn)
const error = (location: string, ...args: any[]): void => logWrapper(location, args, console.error)

export const Logger = { info, warn, error }

export const throwError = (location: string, message: string): never => {
  throw new Error(`[@idux/${location}]: ${message}`)
}
