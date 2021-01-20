export interface Observer<T> {
  (value: T): void
}

export interface Subscription {
  unsubscribe: () => void
}
