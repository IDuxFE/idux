/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ɵDropdownContext } from '@idux/components/dropdown'
import type { ComputedRef } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

export interface SelectedContext {
  selectedKeys: ComputedRef<VKey[]>
  handleSelected: (key: VKey) => void
}

export function useSelected(props: MenuProps, dropdownContext: ɵDropdownContext | null): SelectedContext {
  const [selectedKeys, setSelectedKeys] = useControlledProp(props, 'selectedKeys', () => [])

  const handleSelected = (key: VKey) => {
    dropdownContext?.setVisibility?.(false)
    // dropdown 默认为 false, 其他情况默认为 true
    const selectable = props.selectable ?? !dropdownContext
    if (!selectable) {
      return
    }

    const index = selectedKeys.value.indexOf(key)
    if (index > -1) {
      if (props.multiple) {
        const tempKeys = [...selectedKeys.value]
        tempKeys.splice(index, 1)
        setSelectedKeys(tempKeys)
      }
    } else {
      setSelectedKeys(props.multiple ? [...selectedKeys.value, key] : [key])
    }
  }

  return { selectedKeys, handleSelected }
}
