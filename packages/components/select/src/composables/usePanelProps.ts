/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SelectData, SelectPanelProps, SelectProps } from '../types'

import { type ComputedRef, computed } from 'vue'

import { type VKey, convertArray } from '@idux/cdk/utils'

export function usePanelProps(
  props: SelectProps,
  valueRef: ComputedRef<VKey | VKey[] | undefined>,
  activeValue: ComputedRef<VKey | undefined>,
  setActiveValue: (value: VKey | undefined) => void,
  onOptionClick: (option: SelectData, evt: Event) => void,
): ComputedRef<SelectPanelProps> {
  return computed(() => ({
    activeValue: activeValue.value,
    selectedKeys: convertArray(valueRef.value),
    childrenKey: props.childrenKey,
    customAdditional: props.customAdditional,
    empty: props.empty,
    getKey: props.getKey,
    labelKey: props.labelKey,
    multiple: props.multiple,
    multipleLimit: props.multipleLimit,
    virtual: props.virtual,

    'onUpdate:activeValue': setActiveValue,
    onOptionClick,
    onScroll: props.onScroll,
    onScrolledChange: props.onScrolledChange,
    onScrolledBottom: props.onScrolledBottom,
    _virtualScrollHeight: props.overlayHeight,
    _virtualScrollItemHeight: props.overlayItemHeight,
  }))
}
