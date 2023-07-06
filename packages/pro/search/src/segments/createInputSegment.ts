/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InputSearchField, Segment } from '../types'

export function createInputSegment(
  prefixCls: string,
  config: InputSearchField['fieldConfig'],
): Segment<string | undefined> {
  const { trim } = config ?? {}

  return {
    name: 'input',
    inputClassName: [`${prefixCls}-input-segment-input`],
    parse: input => (input ? (trim ? input.trim() : input) : undefined),
    format: value => (trim ? value?.trim() : value) ?? '',
  }
}
