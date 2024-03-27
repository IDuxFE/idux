/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTagSelectProps, TagSelectColor } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ProTagSelectLocale } from '@idux/pro/locales'

import { type ComputedRef, computed } from 'vue'

export interface TagColorContext {
  mergedTagSelectColors: ComputedRef<TagSelectColor[]>
  getTagSelectColorByKey: (key: VKey) => TagSelectColor | undefined
  getRandomColor: () => TagSelectColor
}

export function useTagColors(props: ProTagSelectProps, locale: ProTagSelectLocale): TagColorContext {
  const defaultColors: TagSelectColor[] = [
    {
      key: 'grey',
      name: locale.colors.grey,
      labelColor: 'var(--ix-pro-tag-select-preset-color-grey-label)',
      backgroundColor: 'var(--ix-pro-tag-select-preset-color-grey-bg)',
    },
    {
      key: 'green',
      name: locale.colors.green,
      labelColor: 'var(--ix-pro-tag-select-preset-color-green-label)',
      backgroundColor: 'var(--ix-pro-tag-select-preset-color-green-bg)',
    },
    {
      key: 'blue',
      name: locale.colors.blue,
      labelColor: 'var(--ix-pro-tag-select-preset-color-blue-label)',
      backgroundColor: 'var(--ix-pro-tag-select-preset-color-blue-bg)',
    },
    {
      key: 'yellow',
      name: locale.colors.yellow,
      labelColor: 'var(--ix-pro-tag-select-preset-color-yellow-label)',
      backgroundColor: 'var(--ix-pro-tag-select-preset-color-yellow-bg)',
    },
    {
      key: 'red',
      name: locale.colors.red,
      labelColor: 'var(--ix-pro-tag-select-preset-color-red-label)',
      backgroundColor: 'var(--ix-pro-tag-select-preset-color-red-bg)',
    },
    {
      key: 'orange',
      name: locale.colors.orange,
      labelColor: 'var(--ix-pro-tag-select-preset-color-orange-label)',
      backgroundColor: 'var(--ix-pro-tag-select-preset-color-orange-bg)',
    },
  ]

  const mergedTagSelectColors = computed(() => (props.colors?.length ? props.colors : defaultColors))
  const colorKeyMap = computed(() => new Map(mergedTagSelectColors.value.map(color => [color.key, color])))

  const getTagSelectColorByKey = (key: VKey) => {
    return colorKeyMap.value.get(key)
  }

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * mergedTagSelectColors.value.length)

    return mergedTagSelectColors.value[randomIndex]
  }

  return {
    mergedTagSelectColors,
    getTagSelectColorByKey,
    getRandomColor,
  }
}
