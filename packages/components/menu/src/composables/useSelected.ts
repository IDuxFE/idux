/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef } from 'vue'

import { type VKey, useControlledProp } from '@idux/cdk/utils'
import { type ɵDropdownContext } from '@idux/components/dropdown'

import { type MenuProps } from '../types'

export interface SelectedContext {
  selectedKeys: ComputedRef<VKey[]>
  handleSelected: (key: VKey) => void
}

export function useSelected(props: MenuProps, dropdownContext: ɵDropdownContext | null): SelectedContext {
  const [selectedKeys, setSelectedKeys] = useControlledProp(props, 'selectedKeys', () => [])

  const handleSelected = (key: VKey) => {
    if (dropdownContext) {
      const { hideOnClick, setVisibility } = dropdownContext
      hideOnClick.value && setVisibility(false)
    }

    if (!props.selectable) {
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
