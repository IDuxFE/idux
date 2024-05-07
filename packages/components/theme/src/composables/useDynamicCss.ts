/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DynamicCssOptions } from '../types'
import type { ComputedRef } from 'vue'

import { tryOnScopeDispose } from '@idux/cdk/utils'

import { findExistNode, getStyleRefCnt, removeCSS, setStyleRefCnt, updateCSS } from '../utils'

interface InjectedStyle {
  attachTo: DynamicCssOptions['attachTo']
  hashId: string
  refCnt: number
}

const injectedStyles: InjectedStyle[] = []

export function useDynamicCss(
  mergedAttachTo: ComputedRef<DynamicCssOptions['attachTo']>,
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
    attachTo: DynamicCssOptions['attachTo'],
  ): {
    index: number
    style: InjectedStyle | null
    styleElement: HTMLStyleElement | undefined
  } => {
    let index = injectedStyles.findIndex(style => style.hashId === hashId && style.attachTo === attachTo)
    let style = injectedStyles[index]
    const styleElement = findExistNode(hashId, { attachTo })

    if (styleElement) {
      const styleRefCnt = getStyleRefCnt(styleElement)

      if (!style) {
        style = {
          hashId,
          attachTo: mergedAttachTo.value,
          refCnt: styleRefCnt,
        }
        index = injectedStyles.length
        injectedStyles.push(style)
      } else {
        style.refCnt = styleRefCnt
      }
    }

    return {
      index,
      style,
      styleElement: styleElement,
    }
  }

  const setInjectedStyle = (injectedStyle: InjectedStyle, styleElement: HTMLStyleElement) => {
    injectedStyles.push(injectedStyle)
    setStyleRefCnt(styleElement, injectedStyle.refCnt)
  }

  const updateInjectedStyleRefCnt = (injectedStyle: InjectedStyle, styleElement: HTMLStyleElement, cnt: number) => {
    injectedStyle.refCnt = cnt
    setStyleRefCnt(styleElement, cnt)
  }

  const inject = (hashId: string, css: string) => {
    incrementCnt(hashId)
    const { style, styleElement } = findInjectedStyle(hashId, mergedAttachTo.value)

    if (style && styleElement) {
      updateInjectedStyleRefCnt(style, styleElement, style.refCnt + 1)
      style.refCnt++
    } else {
      const newInjectedStyleElement = updateCSS(css, hashId, { attachTo: mergedAttachTo.value })
      newInjectedStyleElement &&
        setInjectedStyle(
          {
            hashId,
            attachTo: mergedAttachTo.value,
            refCnt: 1,
          },
          newInjectedStyleElement,
        )
    }
  }

  const remove = (hashId: string) => {
    decrementCnt(hashId)
    const { index, style, styleElement } = findInjectedStyle(hashId, mergedAttachTo.value)

    if (!style || !styleElement) {
      return
    }

    updateInjectedStyleRefCnt(style, styleElement, style.refCnt - 1)

    if (style.refCnt <= 0) {
      injectedStyles.splice(index, 1)
      removeCSS(hashId, { attachTo: mergedAttachTo.value })
    }
  }

  const updateThemeStyle = (css: string, hashId: string, oldHashId?: string) => {
    if (oldHashId) {
      remove(oldHashId)
    }

    inject(hashId, css)
  }

  tryOnScopeDispose(() => {
    for (const [hashId, cnt] of localInjectedStyleCnts.entries()) {
      for (let i = 0; i < cnt; i++) {
        remove(hashId)
      }
    }
  })

  return updateThemeStyle
}
