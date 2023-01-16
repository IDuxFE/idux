/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, defineComponent, inject } from 'vue'

import { isFunction } from 'lodash-es'

import { NoopFunction, type VKey, callEmit, traverseTree, useState } from '@idux/cdk/utils'
import { IxButton } from '@idux/components/button'
import { IxTree, type TreeProps } from '@idux/components/tree'

import { proSearchContext } from '../token'
import { type ProSearchTreeSelectPanelProps, type TreeSelectPanelData, proSearchTreeSelectPanelProps } from '../types'

export default defineComponent({
  props: proSearchTreeSelectPanelProps,
  setup(props) {
    const { mergedPrefixCls, locale } = inject(proSearchContext)!

    const mergedCheckable = computed(() => props.multiple && props.checkable)
    const mergedCascaderStrategy = computed(() => {
      if (!mergedCheckable.value) {
        return 'off'
      }
      return props.cascaderStrategy
    })

    const { expandedKeys, setExpandedKeys } = useExpandedKeys(props)

    const changeSelected = (keys: VKey[]) => {
      if (!props.multiple && !keys.length) {
        return
      }

      props.onChange?.(keys)
    }

    const handleConfirm = () => {
      props.onConfirm?.()
    }
    const handleCancel = () => {
      props.onCancel?.()
    }
    const handleCheck = (checked: boolean, node: TreeSelectPanelData) => {
      const { onCheck } = props
      callEmit(onCheck, checked, node)
    }
    const handleSelect = (selected: boolean, node: TreeSelectPanelData) => {
      const { onSelect } = props

      if (!props.multiple && props.value?.[0] !== node.key) {
        callEmit(onSelect, selected, node)
      }
    }
    const handleExpand = (expanded: boolean, node: TreeSelectPanelData) => {
      const { onExpand } = props
      callEmit(onExpand, expanded, node)
    }
    const onLoaded = async (loadedKeys: VKey[], node: TreeSelectPanelData) => {
      callEmit(props.onLoaded, loadedKeys, node)
    }

    const renderFooter = (prefixCls: string) => {
      if (!props.multiple) {
        return
      }

      return (
        <div class={`${prefixCls}-footer`}>
          <IxButton mode="primary" size="xs" onClick={handleConfirm}>
            {locale.ok}
          </IxButton>
          <IxButton size="xs" onClick={handleCancel}>
            {locale.cancel}
          </IxButton>
        </div>
      )
    }

    return () => {
      const {
        dataSource,
        draggable,
        draggableIcon,
        expandIcon,
        multiple,
        leafLineIcon,
        virtual,
        showLine,
        searchValue,
        onDragstart,
        onDragend,
        onDragenter,
        onDragleave,
        onDragover,
        onDrop,
        droppable,
        loadChildren,
        searchFn,
      } = props

      const treeProps = {
        blocked: true,
        checkOnClick: true,
        checkedKeys: props.value,
        labelKey: 'label',
        checkable: mergedCheckable.value,
        cascaderStrategy: mergedCascaderStrategy.value,
        childrenKey: 'children',
        dataSource,
        draggable,
        draggableIcon,
        droppable,
        expandedKeys: expandedKeys.value,
        expandIcon: expandIcon,
        getKey: 'key',
        autoHeight: true,
        loadChildren,
        leafLineIcon,
        virtual,
        selectable: multiple ? 'multiple' : true,
        selectedKeys: props.value,
        searchValue,
        searchFn: isFunction(searchFn) ? searchFn : undefined,
        showLine: showLine,
        onCheck: handleCheck,
        onDragstart,
        onDragend,
        onDragenter,
        onDragleave,
        onDragover,
        onDrop,
        onExpand: handleExpand,
        onSelect: handleSelect,
        onLoaded,
        onCheckedChange: changeSelected,
        onSelectedChange: !mergedCheckable.value ? changeSelected : NoopFunction,
        onExpandedChange: setExpandedKeys,
      } as TreeProps

      const prefixCls = `${mergedPrefixCls.value}-tree-select-panel`

      return (
        <div class={prefixCls} tabindex={-1} onMousedown={evt => evt.preventDefault()}>
          <IxTree class={`${prefixCls}-body`} {...treeProps} />
          {renderFooter(prefixCls)}
        </div>
      )
    }
  },
})

function useExpandedKeys(props: ProSearchTreeSelectPanelProps): {
  expandedKeys: ComputedRef<VKey[]>
  setExpandedKeys: (keys: VKey[]) => void
} {
  const initialExpandedKeySet = new Set<VKey>()
  props.dataSource &&
    traverseTree(props.dataSource, 'children', (item, parents) => {
      if (props.value?.includes(item.key)) {
        parents.forEach(parent => initialExpandedKeySet.add(parent.key))
      }
    })

  const [expandedKeys, setExpandedKeys] = useState<VKey[]>([...initialExpandedKeySet])

  return {
    expandedKeys,
    setExpandedKeys,
  }
}
