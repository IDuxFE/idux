/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SearchField, SearchValue, SegmentState } from './types'
import type { VKey } from '@idux/cdk/utils'

import { type Ref, computed } from 'vue'

import { useDateConfig } from '@idux/components/config'
import { useGlobalConfig } from '@idux/pro/config'

import { useResolvedSearchFields } from './composables/useResolvedSearchFields'
import { generateSegmentStates } from './utils'

export interface ParseResult {
  key: VKey
  label?: string
  segments: SegmentState[]
}

export interface ParserContext {
  parse: (searchValues: SearchValue[]) => ParseResult[]
}

export function useParser(searchFields: Ref<SearchField[]> | SearchField[]): ParserContext {
  const dateConfig = useDateConfig()
  const locales = useGlobalConfig('locale')
  const { fieldKeyMap } = useResolvedSearchFields(
    computed(() => ('value' in searchFields ? searchFields.value : searchFields)),
    computed(() => '__pro-search-parser__'),
    dateConfig,
    locales.search,
  )

  const parse = (searchValues: SearchValue[]) => {
    return searchValues
      .map(value => {
        const field = fieldKeyMap.value.get(value.key)

        if (field) {
          return {
            key: value.key,
            label: field.label,
            segments: generateSegmentStates(field, value),
          }
        }

        return
      })
      .filter(Boolean) as ParseResult[]
  }

  return {
    parse,
  }
}
