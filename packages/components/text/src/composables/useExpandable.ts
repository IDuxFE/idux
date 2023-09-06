/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TextExpandIconRenderer, TextProps } from '../types'
import type { TextConfig } from '@idux/components/config'

import { type ComputedRef, computed, h } from 'vue'

import { isArray, isBoolean, isFunction, isObject, isString } from 'lodash-es'

import { Logger, useControlledProp } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

export interface ExpandableContext {
  expandIconRenderer: ComputedRef<TextExpandIconRenderer | undefined>
  expanded: ComputedRef<boolean>
  expandable: ComputedRef<boolean>
  setExpanded: (expanded: boolean) => void
}

export function useExpandable(props: TextProps, config: TextConfig): ExpandableContext {
  const [expanded, setExpanded] = useControlledProp(props, 'expanded', false)

  const expandable = computed(() => {
    const _expandable = isObject(props.ellipsis) ? props.ellipsis.expandable : undefined

    if (isBoolean(_expandable)) {
      return _expandable
    }

    if (isBoolean(props.expandable)) {
      Logger.warn('components/text', 'The `expandable` prop is deprecated, use `ellipsis` instead')
      return props.expandable
    }

    return false
  })
  const expandIcon = computed(() => props.expandIcon ?? config.expandIcon)

  const expandIconRenderer = computed<TextExpandIconRenderer | undefined>(() => {
    if (!expandIcon.value) {
      return
    }

    return ({ expanded: _expanded }) => {
      if (isString(expandIcon.value)) {
        return h(IxIcon, { name: expandIcon.value })
      }

      if (isFunction(expandIcon.value)) {
        return expandIcon.value({ expanded: _expanded })
      }

      if (isArray(expandIcon.value)) {
        return h(IxIcon, { name: _expanded ? expandIcon.value[1] : expandIcon.value[0] })
      }
    }
  })

  return {
    expandIconRenderer,
    expanded,
    expandable,
    setExpanded,
  }
}
