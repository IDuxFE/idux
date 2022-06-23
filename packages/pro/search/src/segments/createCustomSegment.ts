/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CustomSearchField, PanelRenderContext, Segment } from '../types'
import type { Slots, VNodeChild } from 'vue'

import { isFunction, isString } from 'lodash-es'

export function createCustomSegment(prefixCls: string, searchField: CustomSearchField, slots: Slots): Segment {
  const {
    fieldConfig: { parse, format, customPanel },
    defaultValue,
    inputClassName,
  } = searchField
  const panelRenderer = getPanelRenderer(customPanel, slots)

  /* eslint-disable indent */
  return {
    name: 'custom',
    inputClassName: [inputClassName, `${prefixCls}-custom-segment-input`],
    defaultValue,
    parse,
    format,
    panelRenderer,
  }
  /* eslint-enable indent */
}

function getPanelRenderer(
  customPanel: CustomSearchField['fieldConfig']['customPanel'],
  slots: Slots,
): ((context: PanelRenderContext) => VNodeChild) | undefined {
  if (isFunction(customPanel)) {
    return (context: PanelRenderContext) => customPanel(context)
  }

  if (isString(customPanel)) {
    return (context: PanelRenderContext) => slots[customPanel]?.(context)
  }

  return
}
