/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableProps } from '../types'
import type { ComputedRef, VNodeTypes } from 'vue'

import { computed } from 'vue'

export function useTags(props: TableProps): TagsContext {
  return {
    tableTag: computed(() => props.tags?.table ?? 'table'),
    headTag: computed(() => props.tags?.head ?? 'thead'),
    headRowTag: computed(() => props.tags?.headRow ?? 'tr'),
    headColTag: computed(() => props.tags?.headCol ?? 'th'),
    bodyTag: computed(() => props.tags?.body ?? 'tbody'),
    bodyRowTag: computed(() => props.tags?.bodyRow ?? 'tr'),
    bodyColTag: computed(() => props.tags?.bodyCol ?? 'td'),
  }
}

export interface TagsContext {
  tableTag: ComputedRef<VNodeTypes>
  headTag: ComputedRef<VNodeTypes>
  headRowTag: ComputedRef<VNodeTypes>
  headColTag: ComputedRef<VNodeTypes>
  bodyTag: ComputedRef<VNodeTypes>
  bodyRowTag: ComputedRef<VNodeTypes>
  bodyColTag: ComputedRef<VNodeTypes>
}
