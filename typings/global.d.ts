declare type IsNullable<T, K> = undefined extends T ? K : never

declare type OptionalKeys<T> = { [K in keyof T]-?: IsNullable<T[K], K> }[keyof T]

declare type RequiredKeys<T> = keyof Omit<T, OptionalKeys<T>>

declare type Nullable<T> = T | null

declare function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number
declare function clearTimeout(handle?: number): void

declare type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never

