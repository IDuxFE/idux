export {}

declare global {
  const __DEV__: boolean
  const __VERSION_CDK__: string
  const __VERSION_COMPONENTS__: string
  const __VERSION_PRO__: string
  const __BASE_URL__: string
  function setInterval(handler: TimerHandler, timeout?: number, ...arguments: any[]): number
  function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number
  function clearInterval(handle?: number): void
  function clearTimeout(handle?: number): void
}
