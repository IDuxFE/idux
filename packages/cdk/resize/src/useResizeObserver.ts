/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { onScopeDispose, watch } from 'vue'

import { type MaybeElementRef, convertElement } from '@idux/cdk/utils'

import { type ResizeListener, offResize, onResize } from './utils'

export function useResizeObserver(
  target: MaybeElementRef,
  listener: ResizeListener,
  options?: ResizeObserverOptions,
): () => void {
  const stopWatch = watch(
    () => convertElement(target),
    (currElement, prevElement) => {
      if (prevElement) {
        offResize(prevElement, listener)
      }

      if (currElement) {
        onResize(currElement, listener, options)
      }
    },
    { immediate: true, flush: 'post' },
  )

  const dispose = () => {
    offResize(convertElement(target), listener)
    stopWatch()
  }

  onScopeDispose(dispose)

  return dispose
}
