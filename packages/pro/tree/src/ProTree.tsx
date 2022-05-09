/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, normalizeStyle, ref } from 'vue'

import { isNil } from 'lodash-es'

import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { ɵHeader } from '@idux/components/_private/header'
import { ɵInput } from '@idux/components/_private/input'
import { IxButton } from '@idux/components/button'
import { IxIcon } from '@idux/components/icon'
import { IxTree, type TreeInstance } from '@idux/components/tree'
import { useGlobalConfig } from '@idux/pro/config'

import { proTreeProps } from './types'

export default defineComponent({
  name: 'IxProTree',
  props: proTreeProps,
  setup(props, { expose, slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('proTree')

    const mergedPrefixCls = computed(() => `${common.prefixCls}-tree`)
    const expandIcon = computed(() => props.expandIcon ?? config.expandIcon)
    const mergedClearIcon = computed(() => props.clearIcon ?? config.clearIcon)

    const expandAllBtnStatus = ref(false)
    const treeRef = ref<TreeInstance>()

    const [searchValue, setSearchValue] = useControlledProp(props, 'searchValue', '')
    const [collapsed, setCollapsed] = useControlledProp(props, 'collapsed')

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value

      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-collapsed`]: collapsed.value,
      })
    })

    const style = computed(() => {
      return normalizeStyle({
        width: collapsed.value ? `${props.collapsedWidth}px` : null,
      })
    })

    const handleExpandAll = () => {
      const currStatus = expandAllBtnStatus.value
      expandAllBtnStatus.value = !currStatus
      expandAllBtnStatus.value ? treeRef.value?.collapseAll() : treeRef.value?.expandAll()
    }

    const handleCollapsed = () => {
      setCollapsed(!collapsed.value)
      callEmit(props.onCollapsed, !collapsed.value)
    }

    const handleInput = (evt: Event) => {
      setSearchValue((evt.target as HTMLInputElement).value)
      callEmit(props.onSearch, searchValue.value)
    }

    const handleClear = (evt: Event) => {
      setSearchValue('')
      callEmit(props.onClear, evt)
    }

    expose({
      blur: () => treeRef.value?.blur(),
      collapseAll: () => treeRef.value?.collapseAll(),
      expandAll: () => treeRef.value?.expandAll(),
      focus: () => treeRef.value?.focus(),
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      const treeProps = {
        checkedKeys: props.checkedKeys,
        expandedKeys: props.expandedKeys,
        selectedKeys: props.selectedKeys,
        loadedKeys: props.loadedKeys,

        blocked: true,
        cascade: true,
        childrenKey: props.childrenKey,
        checkable: props.checkable,
        checkStrategy: props.cascaderStrategy,
        customAdditional: props.customAdditional,
        dataSource: props.dataSource,
        disabled: props.disabled,
        expandIcon: expandIcon.value,
        empty: props.empty,
        getKey: props.getKey,
        labelKey: props.labelKey,
        leafLineIcon: props.leafLineIcon,
        showLine: props.showLine,
        searchValue: searchValue.value,
        selectable: props.selectable,
        searchFn: props.searchFn,
        virtual: props.virtual,

        loadChildren: props.loadChildren,
        onCheck: props.onCheck,
        onDragstart: props.onDragstart,
        onDragend: props.onDragend,
        onDragenter: props.onDragenter,
        onDragleave: props.onDragleave,
        onDragover: props.onDragover,
        onDrop: props.onDrop,
        onNodeClick: props.onNodeClick,
        onNodeContextmenu: props.onNodeContextmenu,
        onLoaded: props.onLoaded,
        onExpand: props.onExpand,
        onSelect: props.onSelect,
        onCheckedChange: props.onCheckedChange,
        onSelectedChange: props.onSelectedChange,
        onExpandedChange: props.onExpandedChange,
        onScroll: props.onScroll,
        onScrolledBottom: props.onScrolledBottom,
        onScrolledChange: props.onScrolledChange,
        'onUpdate:checkedKeys': props['onUpdate:checkedKeys'],
        'onUpdate:expandedKeys': props['onUpdate:expandedKeys'],
        'onUpdate:selectedKeys': props['onUpdate:selectedKeys'],
        'onUpdate:loadedKeys': props['onUpdate:loadedKeys'],
      }

      const treeSlots = {
        label: slots.label,
        prefix: slots.prefix,
        suffix: slots.suffix,
        leafLineIcon: slots.leafLineIcon,
        empty: slots.empty,
        expandIcon: slots.expandIcon,
      }
      return (
        <div class={classes.value} style={style.value}>
          <div class={`${prefixCls}-header-wrapper`}>
            <ɵHeader v-slots={slots} header={props.header} />
            {!isNil(collapsed.value) && <IxIcon name={collapsed.value ? 'right' : 'left'} onClick={handleCollapsed} />}
          </div>
          {props.searchable && (
            <div class={`${prefixCls}-search-wrapper`}>
              <IxButton
                size="xs"
                title={expandAllBtnStatus.value ? '展开全部' : '收起全部'}
                icon={expandAllBtnStatus.value ? 'tree-expand' : 'tree-unexpand'}
                onClick={handleExpandAll}
              />
              <ɵInput
                placeholder={props.placeholder}
                clearable
                clearIcon={mergedClearIcon.value}
                size="sm"
                suffix="search"
                value={searchValue.value}
                clearVisible={!!searchValue.value}
                onInput={handleInput}
                onClear={handleClear}
              />
            </div>
          )}
          <IxTree ref={treeRef} v-slots={treeSlots} {...treeProps} />
        </div>
      )
    }
  },
})
