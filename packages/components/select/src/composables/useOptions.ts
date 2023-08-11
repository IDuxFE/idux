/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SelectData, SelectProps, SelectSearchFn } from '../types'
import type { ComputedRef, Ref, Slots, VNode } from 'vue'

import { computed } from 'vue'

import { isFunction, isNil } from 'lodash-es'

import { type VKey, flattenNode } from '@idux/cdk/utils'

import { optionGroupKey, optionKey } from '../option'
import { generateOption } from '../utils/generateOption'
import { GetKeyFn } from './useGetOptionKey'

export interface FlattenedOption {
  key: VKey
  label: string
  disabled?: boolean
  rawData: SelectData
  type: 'group' | 'item'
  parentKey?: VKey
}

export function useConvertedOptions(props: SelectProps, slots: Slots): ComputedRef<SelectData[]> {
  return computed(() => {
    return props.dataSource ?? convertOptions(slots.default?.())
  })
}

export function useOptionKeyMap(options: ComputedRef<FlattenedOption[]>): ComputedRef<Map<VKey, FlattenedOption>> {
  return computed(() => {
    const map = new Map<VKey, FlattenedOption>()

    options.value.forEach(option => {
      map.set(option.key, option)
    })

    return map
  })
}

export function useFlattenedOptions(
  options: ComputedRef<SelectData[] | undefined>,
  mergedChildrenKey: ComputedRef<string>,
  getKey: ComputedRef<GetKeyFn>,
  mergedLabelKey: ComputedRef<string>,
): ComputedRef<FlattenedOption[]> {
  return computed(() => flattenOptions(options.value, mergedChildrenKey.value, getKey.value, mergedLabelKey.value))
}

const filterKeys = [optionKey, optionGroupKey]

function convertOptions(nodes: VNode[] | undefined, parentKey?: VKey): SelectData[] {
  const convertedOptions: Array<SelectData> = []

  flattenNode(nodes, { key: filterKeys }).forEach((node, index) => {
    const type = node.type as any
    const slots = node.children ?? ({} as any)
    const props = node.props ?? ({} as any)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isOption = (type as any)[optionKey]
    if (isOption) {
      const { key, disabled, label, value } = props
      const { label: customLabel, default: customLabel2 } = slots
      const _disabled = disabled || disabled === ''
      const option: SelectData = {
        key: value ?? key,
        disabled: _disabled,
        label,
        value,
        parentKey,
        customLabel: customLabel ?? customLabel2,
      }

      convertedOptions.push(option)
    } else {
      const { key = index, label, children } = props
      const { label: customLabel, default: defaultSlot } = slots
      const _children = children ?? convertOptions(defaultSlot?.(), key)

      convertedOptions.push({ key, label, children: _children, customLabel })
    }
  })

  return convertedOptions
}

export function useFilteredOptions(
  props: SelectProps,
  options: ComputedRef<FlattenedOption[]>,
  inputValue: Ref<string>,
  mergedLabelKey: ComputedRef<string>,
): ComputedRef<FlattenedOption[]> {
  const searchFilter = useSearchFn(props, mergedLabelKey)

  return computed(() => {
    const _options = options.value
    const searchValue = inputValue.value
    if (!searchValue) {
      return _options
    }
    const filter = searchFilter.value
    const filteredOptions = filterOptions(_options, props.allowInput, searchValue, filter)

    return filteredOptions
  })
}

function filterOptions(
  flattenedOptions: FlattenedOption[],
  allowInput: boolean,
  searchValue: string,
  filter: false | SelectSearchFn,
): FlattenedOption[] {
  const filteredOptions = !filter
    ? flattenedOptions
    : flattenedOptions.filter(option => filter(option.rawData!, searchValue))

  if (allowInput) {
    const matchedOption = filteredOptions.find(option => option.label === searchValue)
    if (!matchedOption) {
      return [generateOption(searchValue), ...filteredOptions]
    }
  }
  return filteredOptions
}

function flattenOptions(options: SelectData[] | undefined, childrenKey: string, getKeyFn: GetKeyFn, labelKey: string) {
  const mergedOptions: FlattenedOption[] = []
  const appendOption = (item: SelectData, index: number | undefined, parentKey?: VKey) => {
    const parsedOption = parseOption(item, item => getKeyFn(item) ?? index, childrenKey, labelKey, parentKey)
    mergedOptions.push(parsedOption)

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

  return mergedOptions
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
    rawData: option,
  }
}

function useSearchFn(props: SelectProps, mergedLabelKey: ComputedRef<string>) {
  return computed(() => {
    const searchFn = props.searchFn
    if (isFunction(searchFn)) {
      return searchFn
    }
    return searchFn ? getDefaultSearchFn(mergedLabelKey.value) : false
  })
}

function getDefaultSearchFn(labelKey: string): SelectSearchFn {
  return (data: SelectData, searchValue: string) => {
    const label = data[labelKey] as string | undefined
    const { children } = data
    const hasChildrenMatch = children ? children.some((item: SelectData) => matchRule(item.label, searchValue)) : false

    return (matchRule(String(label), searchValue) && !children) || hasChildrenMatch
  }
}

function matchRule(srcString: string | number | undefined, targetString: string) {
  return !isNil(srcString) && String(srcString).toLowerCase().includes(targetString.toLowerCase())
}
