/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableProps } from '../types'
import type { Slots, VNode } from 'vue'

import { isString } from 'lodash-es'

import { IxHeader } from '@idux/components/header'

export function renderHeader(props: TableProps, slots: Slots): VNode | VNode[] | null {
  if (slots.header) {
    return slots.header()
  }
  const { size, header } = props
  if (!header) {
    return null
  }

  const headerProps = isString(header) ? { title: header } : header
  return <IxHeader size={size} {...headerProps}></IxHeader>
}
