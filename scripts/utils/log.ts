import { bold } from 'chalk'

export const Log = {
  info: (msg?: string, ...args: unknown[]): void => console.log(bold(msg), ...args),
  success: (msg?: string, ...args: unknown[]): void => console.log(bold.green(msg), ...args),
  warn: (msg?: string, ...args: unknown[]): void => console.log(bold.yellow(msg), ...args),
  error: (msg?: string, ...args: unknown[]): void => console.log(bold.red(msg), ...args),
}
