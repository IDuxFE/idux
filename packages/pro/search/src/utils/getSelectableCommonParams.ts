/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PanelRenderContext } from '../types'

import { convertArray } from '@idux/cdk/utils'

export interface SearchablePanelParams<V> {
  panelValue: V[] | undefined
  searchInput: string
  handleChange: (v: V[] | undefined) => void
}

export function getSelectableCommonParams<T>(
  context: PanelRenderContext<T | undefined | Array<T | undefined>>,
  multiple: boolean,
  separator?: string,
): SearchablePanelParams<T>
export function getSelectableCommonParams<T>(
  context: PanelRenderContext<T | T[] | undefined>,
  multiple: boolean,
  separator?: string,
): SearchablePanelParams<T>
export function getSelectableCommonParams<T>(
  context: PanelRenderContext<T | T[] | undefined>,
  multiple: boolean,
  separator?: string,
): SearchablePanelParams<T> {
  const { value, input, setValue, ok } = context
  const panelValue = convertArray(value)
  const trimedInput = input.trim()
  let searchInput

  if (!separator) {
    searchInput = trimedInput
  } else {
    const inputParts = trimedInput.split(separator)
    searchInput = inputParts.length > panelValue.length ? inputParts.pop()?.trim() ?? '' : ''
  }

  const handleChange = (v: T[] | undefined) => {
    if (!multiple) {
      setValue(v?.[0])
      ok()
    } else {
      setValue(v && v.length > 0 ? v : undefined)
    }
  }

  return {
    panelValue,
    searchInput,
    handleChange,
  }
}
