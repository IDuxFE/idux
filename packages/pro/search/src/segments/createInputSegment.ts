/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InputSearchField, Segment } from '../types'

export function createInputSegment(prefixCls: string, searchField: InputSearchField): Segment<string> {
  const {
    fieldConfig: { trim },
    defaultValue,
    inputClassName,
  } = searchField

  return {
    name: 'input',
    inputClassName: [inputClassName, `${prefixCls}-input-segment-input`],
    defaultValue,
    parse: input => input,
    format: value => (trim ? value?.trim() : value) ?? '',
    panel: null,
  }
}
