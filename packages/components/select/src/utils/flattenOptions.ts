/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetKeyFn } from '../composables/useGetOptionKey'
import type { FlattenedOption, SelectData } from '../types'
import type { VKey } from '@idux/cdk/utils'

import { toRaw } from 'vue'

export function flattenOptions(
  options: SelectData[] | undefined,
  childrenKey: string,
  getKeyFn: GetKeyFn,
  labelKey: string,
): FlattenedOption[] {
  const flattenedOptions: FlattenedOption[] = []
  const appendOption = (item: SelectData, index: number | undefined, parentKey?: VKey) => {
    const parsedOption = parseOption(item, item => getKeyFn(item) ?? index, childrenKey, labelKey, parentKey)
    flattenedOptions.push(parsedOption)

    return parsedOption.key
  }

  options?.forEach((item, index) => {
    const children = item[childrenKey] as SelectData[]

    const optionKey = appendOption(item, index)

    if (children && children.length > 0) {
      children.forEach(child => {
        appendOption(child, undefined, optionKey)
      })
    }
  })

  return flattenedOptions
}

export function unFlattenOptions(
  flattenedOptions: FlattenedOption[],
  childrenKey: string,
  getKeyFn: GetKeyFn,
): SelectData[] {
  const options: SelectData[] = []

  let currentGroupKeys: Set<VKey> | undefined
  flattenedOptions.forEach(option => {
    const data = option.rawData

    if (option.type === 'group') {
      options.push(data)
      currentGroupKeys = new Set(data[childrenKey].map((item: SelectData) => getKeyFn(item)))
    } else if (!currentGroupKeys?.has(option.key)) {
      options.push(data)
    }
  })

  return options
}

function parseOption(
  option: SelectData,
  getKey: GetKeyFn,
  childrenKey: string,
  labelKey: string,
  parentKey?: VKey,
): FlattenedOption {
  const children = option[childrenKey] as SelectData[] | undefined
  return {
    key: getKey(option),
    parentKey,
    label: option[labelKey],
    disabled: !!option.disabled,
    type: children && children.length > 0 ? 'group' : 'item',
    rawData: toRaw(option),
  }
}
