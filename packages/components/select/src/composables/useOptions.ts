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

import { Logger, VKey, flattenNode } from '@idux/cdk/utils'

import { optionGroupKey, optionKey } from '../option'
import { generateOption } from '../utils/generateOption'
import { GetKeyFn } from './useGetOptionKey'

export interface MergedOption {
  key: VKey
  label?: string
  disabled?: boolean
  rawData: SelectData
  type?: 'group'
  parentKey?: VKey
}

export interface OptionsContext {
  mergedOptions: ComputedRef<MergedOption[]>
  flattedOptions: ComputedRef<MergedOption[]>
}

export function useMergedOptions(
  props: SelectProps,
  slots: Slots,
  mergedChildrenKey: ComputedRef<string>,
  mergedGetKey: ComputedRef<GetKeyFn>,
  mergedLabelKey: ComputedRef<string>,
): ComputedRef<MergedOption[]> {
  return computed(() => {
    const dataSource = props.options ?? props.dataSource
    if (dataSource) {
      if (__DEV__ && props.options) {
        Logger.warn('components/select', '`options` was deprecated, please use `dataSource` instead')
      }
      return mergeOptions(dataSource, mergedChildrenKey.value, mergedGetKey.value, mergedLabelKey.value)
    } else {
      return convertOptions(slots.default?.())
    }
  })
}

export function useFlattedOptions(
  props: SelectProps,
  mergedOptions: ComputedRef<MergedOption[]>,
  inputValue: Ref<string>,
  mergedLabelKey: ComputedRef<string>,
): ComputedRef<MergedOption[]> {
  const searchFilter = useSearchFn(props, mergedLabelKey)

  return computed(() => {
    const options = mergedOptions.value
    const searchValue = inputValue.value
    if (!searchValue) {
      return options
    }
    const filter = searchFilter.value
    const filteredOptions = !filter ? options : options.filter(option => filter(option.rawData!, searchValue))

    const { allowInput } = props
    if (allowInput) {
      const matchedOption = filteredOptions.find(option => option.label === searchValue)
      if (!matchedOption) {
        return [generateOption(searchValue), ...filteredOptions]
      }
    }
    return filteredOptions
  })
}

function mergeOptions(originalOptions: SelectData[], childrenKey: string, getKeyFn: GetKeyFn, labelKey: string) {
  const mergedOptions: MergedOption[] = []

  originalOptions.forEach((item, index) => {
    const label = item[labelKey]
    const children = item[childrenKey] as SelectData[]

    if (children && children.length > 0) {
      const groupKey = getKeyFn(item) ?? item.key ?? index
      mergedOptions.push({ key: groupKey, label, type: 'group', rawData: item })

      children.forEach(child => {
        mergedOptions.push({
          key: getKeyFn(child),
          label: child[labelKey],
          disabled: child.disabled,
          parentKey: groupKey,
          rawData: child,
        })
      })
    } else {
      mergedOptions.push({ key: getKeyFn(item), disabled: item.disabled, label, rawData: item })
    }
  })

  return mergedOptions
}

const filterKeys = [optionKey, optionGroupKey]

function convertOptions(nodes: VNode[] | undefined, parentKey?: VKey): MergedOption[] {
  const mergedOptions: Array<MergedOption> = []

  flattenNode(nodes, { key: filterKeys }).forEach((node, index) => {
    const type = node.type as any
    const slots = node.children ?? ({} as any)
    const props = node.props ?? ({} as any)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isOption = (type as any)[optionKey]
    if (isOption) {
      const { key, disabled, label, value, ...additional } = props
      const { label: customLabel, default: customLabel2 } = slots
      // <IxSelectOption disabled /> => disabled = ''
      const _disabled = disabled || disabled === ''
      const rawData = { key, disabled: _disabled, label, value, additional, customLabel: customLabel ?? customLabel2 }
      const option: MergedOption = {
        key: value ?? key,
        label,
        disabled: _disabled,
        rawData,
        parentKey,
      }

      mergedOptions.push(option)
    } else {
      const { key = index, label, children, ...additional } = props
      const { label: customLabel, default: defaultSlot } = slots
      const _children = children ?? convertOptions(defaultSlot?.(), key)
      const rawData = { key, label, children: _children, additional, customLabel }
      mergedOptions.push({ key, label, type: 'group', rawData })
      mergedOptions.push(..._children)
    }
  })

  return mergedOptions
}

function useSearchFn(props: SelectProps, mergedLabelKey: ComputedRef<string>) {
  return computed(() => {
    const searchFn = props.searchFilter ?? props.searchFn
    if (isFunction(searchFn)) {
      if (__DEV__ && props.searchFilter) {
        Logger.warn('components/select', '`searchFilter` was deprecated, please use `searchFn` instead')
      }
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
