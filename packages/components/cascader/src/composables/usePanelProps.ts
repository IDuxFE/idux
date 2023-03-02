/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CascaderPanelProps, CascaderProps } from '../types'

import { type ComputedRef, computed } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

export function usePanelProps(
  props: CascaderProps,
  setOverlayOpened: (opened: boolean) => void,
): ComputedRef<Partial<CascaderPanelProps>> {
  const [expandedKeys, setExpandedKeys] = useControlledProp(props, 'expandedKeys')
  const [loadedKeys, setLoadedKeys] = useControlledProp(props, 'loadedKeys')
  const onSelect = () => {
    if (!props.multiple) {
      setOverlayOpened(false)
    }
  }
  return computed(() => ({
    expandedKeys: expandedKeys.value,
    loadedKeys: loadedKeys.value,
    childrenKey: props.childrenKey,
    customAdditional: props.customAdditional,
    disableData: props.disableData,
    empty: props.empty,
    expandIcon: props.expandIcon,
    expandTrigger: props.expandTrigger,

    fullPath: props.fullPath,
    getKey: props.getKey,
    labelKey: props.labelKey,
    loadChildren: props.loadChildren,

    maxLabel: props.maxLabel,
    multiple: props.multiple,
    multipleLimit: props.multipleLimit,

    searchable: props.searchable,
    searchFn: props.searchFn,
    strategy: props.strategy,
    virtual: props.virtual,

    'onUpdate:expandedKeys': setExpandedKeys,
    'onUpdate:loadedKeys': setLoadedKeys,
    onSelect,
  }))
}
