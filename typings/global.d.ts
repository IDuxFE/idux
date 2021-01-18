declare type IsNullable<T, K> = undefined extends T ? K : never

declare type OptionalKeys<T> = { [K in keyof T]-?: IsNullable<T[K], K> }[keyof T]

declare type RequiredKeys<T> = keyof Omit<T, OptionalKeys<T>>
