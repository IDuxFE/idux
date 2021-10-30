/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SelectFilterFn, SelectOption, SelectProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { SelectConfig } from '@idux/components/config'
import type { ComputedRef, Ref, Slots, VNode } from 'vue'

import { computed } from 'vue'

import { isFunction, isSymbol } from 'lodash-es'

import { flattenNode } from '@idux/cdk/utils'

import { optionGroupKey, optionKey } from '../option'
import { generateOption } from '../utils/generateOption'

export interface MergedOption {
  key: VKey
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any
  disabled?: boolean
  rawOption: SelectOption
  type?: 'group' | 'grouped'
  parentKey?: VKey
}

export interface OptionsContext {
  mergedOptions: ComputedRef<MergedOption[]>
  flattedOptions: ComputedRef<MergedOption[]>
}

export function useMergedOptions(props: SelectProps, slots: Slots, config: SelectConfig): ComputedRef<MergedOption[]> {
  return computed(() => {
    const { options } = props
    if (options) {
      return mergeOptions(props, config, options)
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
    const filteredOptions = !filter ? options : options.filter(option => filter(searchValue, option.rawOption!))
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

function mergeOptions(props: SelectProps, config: SelectConfig, originalOptions: SelectOption[]) {
  const { childrenKey = config.childrenKey, labelKey = config.labelKey, valueKey = config.valueKey } = props

  const mergedOptions: MergedOption[] = []

  originalOptions.forEach((item, index) => {
    const { key } = item
    const label = item[labelKey]
    const children = item[childrenKey] as SelectOption[]

    if (children && children.length > 0) {
      const groupKey = key ?? index
      mergedOptions.push({ key: groupKey, label, type: 'group', rawOption: item })
      mergedOptions.push(
        ...children.map((option, index) => {
          return {
            key: option.key ?? `${isSymbol(groupKey) ? String(groupKey) : groupKey}-${index}`,
            label: option[labelKey],
            value: option[valueKey],
            disabled: option.disabled,
            type: 'grouped',
            parentKey: groupKey,
            rawOption: option,
          } as MergedOption
        }),
      )
    } else {
      const value = item[valueKey]
      mergedOptions.push({ key: key ?? index, disabled: item.disabled, label, value, rawOption: item })
    }
  })

  return mergedOptions
}

const filterKeys = [optionKey, optionGroupKey]

function convertOptions(nodes: VNode[] | undefined, parentKey?: VKey, grouped?: boolean): MergedOption[] {
  const mergedOptions: Array<MergedOption> = []

  flattenNode(nodes, { key: filterKeys }).forEach((node, index) => {
    const { type, children: slots, props } = node as VNode & { children: Slots }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isOption = (type as any)[optionKey]
    if (isOption) {
      const { key, disabled, label, value, ...additional } = props!
      // <IxSelectOption disabled /> => disabled = ''
      const _disabled = disabled || disabled === ''
      const rawOption = { key, disabled: _disabled, label, value, additional, slots }
      const option: MergedOption = {
        key: key ?? `${isSymbol(parentKey) ? String(parentKey) : parentKey}-${index}`,
        label,
        value,
        disabled: _disabled,
        rawOption,
        parentKey,
        type: grouped ? 'grouped' : undefined,
      }

      mergedOptions.push(option)
    } else {
      const { key, label, ...additional } = props!
      const children = convertOptions(slots?.default?.(), key, true)
      const rawOption = { key, label, children, additional }
      mergedOptions.push({ key: key ?? index, label, type: 'group', rawOption })
      mergedOptions.push(...children)
    }
  })

  return mergedOptions
}

const defaultFilter: SelectFilterFn = (searchValue: string, option: SelectOption): boolean => {
  return option.label?.toLowerCase().includes(searchValue.toLowerCase()) ?? false
}

function useSearchFilter(props: SelectProps) {
  return computed(() => {
    const { searchFilter } = props
    if (isFunction(searchFilter)) {
      return searchFilter
    }
    return searchFilter ? defaultFilter : false
  })
}
