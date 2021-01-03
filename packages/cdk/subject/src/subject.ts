import type { Observer, Subscription } from './type'

export class Subject<T = void> {
  private observers = new Map<symbol, Observer<T>>()

  dispatch(value: T): void {
    this.observers.forEach(observer => {
      observer(value)
    })
  }

  subscribe(observer: Observer<T>): Subscription {
    const id = Symbol()
    this.observers.set(id, observer)

    return this.subscription(id)
  }

  unsubscribeAll(): void {
    this.observers.clear()
  }

  private subscription(id: symbol): Subscription {
    return {
      unsubscribe: () => {
        this.observers.delete(id)
      },
    }
  }
}
