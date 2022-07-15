/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { watch } from 'vue'

import { MaybeElementRef, convertElement } from '@idux/cdk/utils'

export function useAntiTamper(wrapperRef: MaybeElementRef, elRef: MaybeElementRef): void {
  const options: MutationObserverInit = {
    childList: true,
    subtree: true,
    attributeFilter: ['style', 'class'],
    attributeOldValue: true,
  }

  let observer: MutationObserver | null = null
  let el: HTMLElement | null | undefined = null

  watch(
    () => convertElement(wrapperRef)!,
    wrapper => {
      if (!el) {
        el = convertElement(elRef)
      }

      if (wrapper && !observer) {
        observer = new MutationObserver((records: MutationRecord[]) => {
          records
            .filter(record => record.target === el || record.target === wrapper)
            .forEach(record => {
              // avoid modifying data
              if (record.type === 'attributes') {
                reset(() => {
                  el!.setAttribute(record.attributeName!, record.oldValue!)
                })
              }
              // avoid deleted
              if (record.type === 'childList') {
                reset(() => {
                  wrapper!.appendChild(record.removedNodes[0])
                })
              }
            })
        })

        observer.observe(wrapper, options)

        const reset = (resume = () => {}) => {
          setTimeout(() => {
            observer?.disconnect()
            resume()
            observer?.observe(wrapper, options)
          }, 0)
        }
      }
    },
    {
      immediate: true,
    },
  )
}
