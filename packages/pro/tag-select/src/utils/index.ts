/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Deferred<V = any> {
  wait: () => Promise<V>
  resolve: (value: V) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createDeferred<V = any>(): Deferred<V> {
  let resolve: (value: V) => void
  const promise = new Promise<V>(_resolve => {
    resolve = _resolve
  })

  return {
    wait: () => promise,
    resolve: value => resolve(value),
  }
}
