/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InputSearchField, Segment } from '../types'

export function createInputSegment(prefixCls: string, searchField: InputSearchField): Segment<string | undefined> {
  const {
    fieldConfig: { trim },
    inputClassName,
  } = searchField

  return {
    name: 'input',
    inputClassName: [inputClassName, `${prefixCls}-input-segment-input`],
    placeholder: searchField.placeholder,
    parse: input => (input ? input : undefined),
    format: value => (trim ? value?.trim() : value) ?? '',
  }
}
