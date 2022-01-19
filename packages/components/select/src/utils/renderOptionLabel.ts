/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SelectOptionProps } from '../types'
import type { Slots, VNodeChild } from 'vue'

import { isString } from 'lodash-es'

export function renderOptionLabel(slots: Slots, rawOption: SelectOptionProps, label?: string): VNodeChild {
  const labelRender = rawOption.customLabel ?? 'optionLabel'
  const labelSlot = isString(labelRender) ? slots[labelRender] : labelRender

  return labelSlot?.(rawOption) ?? label
}
