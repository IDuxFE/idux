/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SelectData, SelectProps, SelectSearchFn } from '../types'
import type { SelectConfig } from '@idux/components/config'
import type { ComputedRef, Ref, Slots, VNode } from 'vue'

import { computed } from 'vue'

import { isFunction, isSymbol } from 'lodash-es'

import { Logger, VKey, flattenNode } from '@idux/cdk/utils'

import { optionGroupKey, optionKey } from '../option'
import { generateOption } from '../utils/generateOption'

export interface MergedOption {
  key: VKey
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any
  disabled?: boolean
  rawData: SelectData
  type?: 'group' | 'grouped'
  parentKey?: VKey
}

export interface OptionsContext {
  mergedOptions: ComputedRef<MergedOption[]>
  flattedOptions: ComputedRef<MergedOption[]>
}

export function useMergedOptions(props: SelectProps, slots: Slots, config: SelectConfig): ComputedRef<MergedOption[]> {
  return computed(() => {
    const dataSource = props.options ?? props.dataSource
    if (dataSource) {
      if (__DEV__ && props.options) {
        Logger.warn('components/select', '`options` was deprecated, please use `dataSource` instead')
      }
      return mergeOptions(props, config, dataSource)
    } else {
      return convertOptions(slots.default?.())
    }
  })
}

export function useFlattedOptions(
  props: SelectProps,
  mergedOptions: ComputedRef<MergedOption[]>,
  inputValue: Ref<string>,
): ComputedRef<MergedOption[]> {
  const searchFilter = useSearchFilter(props)

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

function mergeOptions(props: SelectProps, config: SelectConfig, originalOptions: SelectData[]) {
  const { childrenKey = config.childrenKey, labelKey = config.labelKey, valueKey = config.valueKey } = props

  const mergedOptions: MergedOption[] = []

  originalOptions.forEach((item, index) => {
    const { key } = item
    const label = item[labelKey]
    const children = item[childrenKey] as SelectData[]

    if (children && children.length > 0) {
      const groupKey = key ?? index
      mergedOptions.push({ key: groupKey, label, type: 'group', rawData: item })
      mergedOptions.push(
        ...children.map((option, index) => {
          const value = option[valueKey]
          return {
            key: option.key ?? `${isSymbol(groupKey) ? String(groupKey) : groupKey}-${value ?? index}`,
            label: option[labelKey],
            value: value,
            disabled: option.disabled,
            type: 'grouped',
            parentKey: groupKey,
            rawData: option,
          } as MergedOption
        }),
      )
    } else {
      const value = item[valueKey]
      mergedOptions.push({ key: key ?? index, disabled: item.disabled, label, value, rawData: item })
    }
  })

  return mergedOptions
}

const filterKeys = [optionKey, optionGroupKey]

function convertOptions(nodes: VNode[] | undefined, parentKey?: VKey, grouped?: boolean): MergedOption[] {
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
        key: key ?? `${isSymbol(parentKey) ? String(parentKey) : parentKey}-${value ?? index}`,
        label,
        value,
        disabled: _disabled,
        rawData,
        parentKey,
        type: grouped ? 'grouped' : undefined,
      }

      mergedOptions.push(option)
    } else {
      const { key, label, children, ...additional } = props
      const { label: customLabel, default: defaultSlot } = slots
      const _children = children ?? convertOptions(defaultSlot?.(), key, true)
      const rawData = { key, label, children: _children, additional, customLabel }
      mergedOptions.push({ key: key ?? index, label, type: 'group', rawData })
      mergedOptions.push(..._children)
    }
  })

  return mergedOptions
}

const getDefaultSearchFn = (props: SelectProps): SelectSearchFn => {
  return (option: SelectData, searchValue: string) => {
    const filterField = props.labelKey ?? 'label'
    return option[filterField]?.toLowerCase().includes(searchValue.toLowerCase()) ?? false
  }
}

function useSearchFilter(props: SelectProps) {
  return computed(() => {
    const searchFn = props.searchFilter ?? props.searchFn
    if (isFunction(searchFn)) {
      if (__DEV__ && props.searchFilter) {
        Logger.warn('components/select', '`searchFilter` was deprecated, please use `searchFn` instead')
      }
      return searchFn
    }
    // #750 配置了labelKey后过滤筛选不生效
    return searchFn ? getDefaultSearchFn(props) : false
  })
}
