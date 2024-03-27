/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TagColorContext } from './useTagColors'
import type { ProTagSelectProps, TagSelectColor, TagSelectData } from '../types'

import { type ComputedRef, computed } from 'vue'

import { isNil, isObject, toString } from 'lodash-es'

import { VKey, callEmit, useState } from '@idux/cdk/utils'

export interface MergedTagData extends TagSelectData {
  color: TagSelectColor
}

export interface TagDataContext {
  mergedData: ComputedRef<MergedTagData[]>
  filteredData: ComputedRef<MergedTagData[]>
  dataMaxExceeded: ComputedRef<boolean>
  inputValue: ComputedRef<string | undefined>
  inputFullyMatched: ComputedRef<boolean>
  setInputValue: (input: string | undefined) => void

  getTagDataByKey: (key: VKey) => MergedTagData | undefined
  addData: (data: TagSelectData) => void
  createData: (label: string) => MergedTagData
  removeData: (data: TagSelectData) => void
  modifyData: (data: TagSelectData) => void
}

export function useTagData(props: ProTagSelectProps, tagColorContext: TagColorContext): TagDataContext {
  const { getTagSelectColorByKey, getRandomColor } = tagColorContext
  const [inputValue, setInputValue] = useState<string | undefined>(undefined)

  const mergedData = computed<MergedTagData[]>(() => {
    return (
      props.dataSource?.map(data => {
        if (isObject(data.color)) {
          return data as MergedTagData
        }

        const color = getTagSelectColorByKey(data.color) ?? getRandomColor()

        return {
          ...data,
          color,
        }
      }) ?? []
    )
  })
  const mergedDataKeyMap = computed(() => new Map(mergedData.value.map(data => [data.key, data])))

  const dataMaxExceeded = computed(() => mergedData.value.length > props.tagDataLimit)

  const filteredData = computed(() => {
    if (!inputValue.value) {
      return mergedData.value
    }

    return mergedData.value.filter(data => {
      const label = data.label
      return matchRule(toString(label), inputValue.value!)
    })
  })

  const inputFullyMatched = computed(
    () => filteredData.value.length === 1 && filteredData.value[0].label === inputValue.value,
  )

  const getTagDataByKey = (key: VKey) => {
    return mergedDataKeyMap.value.get(key)
  }

  const addData = (data: TagSelectData) => {
    setInputValue(undefined)
    callEmit(props.onTagDataAdd, data)
  }
  const createData = (label: string) => {
    const randomColor = getRandomColor()
    const data = { key: label, label, color: randomColor }
    const modifiedData = props.createdTagDataModifier ? props.createdTagDataModifier(data) : data

    return {
      ...modifiedData,
      color: isObject(modifiedData.color)
        ? modifiedData.color
        : getTagSelectColorByKey(modifiedData.color) ?? randomColor,
    }
  }
  const removeData = (data: TagSelectData) => {
    callEmit(props.onTagDataRemove, data)
  }
  const modifyData = (data: TagSelectData) => {
    if (!getTagDataByKey(data.key)) {
      return
    }

    callEmit(props.onTagDataChange, data)
  }

  return {
    mergedData,
    filteredData,
    dataMaxExceeded,
    inputValue,
    inputFullyMatched,
    setInputValue,

    getTagDataByKey,
    addData,
    createData,
    removeData,
    modifyData,
  }
}

function matchRule(srcString: string | number | undefined, targetString: string) {
  return !isNil(srcString) && String(srcString).toLowerCase().includes(targetString.toLowerCase())
}
