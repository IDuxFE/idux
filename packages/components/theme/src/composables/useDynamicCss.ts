/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DynamicCssOptions } from '../types'

import { type ComputedRef, onUnmounted } from 'vue'

import { removeCSS, updateCSS } from '../utils'

interface InjectedStyle {
  attachTo: DynamicCssOptions['attachTo']
  hashId: string
  refCnt: number
}

const injectedStyles: InjectedStyle[] = []

export function useDynamicCss(
  mergedAttatchTo: ComputedRef<DynamicCssOptions['attachTo']>,
): (css: string, hashId: string, oldHashId?: string) => void {
  const localInjectedStyleCnts = new Map<string, number>()

  const incrementCnt = (hashId: string) => {
    if (!localInjectedStyleCnts.has(hashId)) {
      localInjectedStyleCnts.set(hashId, 1)
    } else {
      localInjectedStyleCnts.set(hashId, localInjectedStyleCnts.get(hashId)! + 1)
    }
  }
  const decrementCnt = (hashId: string) => {
    if (!localInjectedStyleCnts.has(hashId)) {
      return
    }

    const currentCnt = localInjectedStyleCnts.get(hashId)! - 1

    if (currentCnt <= 0) {
      localInjectedStyleCnts.delete(hashId)
    } else {
      localInjectedStyleCnts.set(hashId, currentCnt)
    }
  }

  const findInjectedStyle = (
    hashId: string,
    attatchTo: DynamicCssOptions['attachTo'],
  ): {
    index: number
    style: InjectedStyle | null
  } => {
    const index = injectedStyles.findIndex(style => style.hashId === hashId && style.attachTo === attatchTo)

    return {
      index,
      style: injectedStyles[index],
    }
  }

  const inject = (hashId: string, css: string) => {
    incrementCnt(hashId)
    const { style } = findInjectedStyle(hashId, mergedAttatchTo.value)

    if (style) {
      style.refCnt++
    } else {
      injectedStyles.push({
        hashId,
        attachTo: mergedAttatchTo.value,
        refCnt: 1,
      })

      updateCSS(css, hashId, { attachTo: mergedAttatchTo.value })
    }
  }

  const remove = (hashId: string) => {
    decrementCnt(hashId)
    const { index, style } = findInjectedStyle(hashId, mergedAttatchTo.value)

    if (!style) {
      return
    }

    style.refCnt--

    if (style.refCnt <= 0) {
      injectedStyles.splice(index, 1)
      removeCSS(hashId, { attachTo: mergedAttatchTo.value })
    }
  }

  const updateThemeStyle = (css: string, hashId: string, oldHashId?: string) => {
    if (oldHashId) {
      remove(oldHashId)
    }

    inject(hashId, css)
  }

  onUnmounted(() => {
    for (const [hashId, cnt] of localInjectedStyleCnts.entries()) {
      for (let i = 0; i < cnt; i++) {
        remove(hashId)
      }
    }
  })

  return updateThemeStyle
}
