export {}

declare global {
  const __DEV__: boolean
  function setInterval(handler: TimerHandler, timeout?: number, ...arguments: any[]): number
  function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number
  function clearInterval(handle?: number): void
  function clearTimeout(handle?: number): void
}
