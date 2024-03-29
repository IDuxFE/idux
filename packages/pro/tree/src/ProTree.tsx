/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Ref, computed, defineComponent, normalizeClass, normalizeStyle, onMounted, ref, watch } from 'vue'

import { isNil } from 'lodash-es'

import { type VKey, callEmit, useControlledProp, useEventListener, useState } from '@idux/cdk/utils'
import { ɵHeader } from '@idux/components/_private/header'
import { ɵInput } from '@idux/components/_private/input'
import { IxButton } from '@idux/components/button'
import { IxDivider } from '@idux/components/divider'
import { IxIcon } from '@idux/components/icon'
import { IxTree, type TreeInstance } from '@idux/components/tree'
import { useGlobalConfig } from '@idux/pro/config'
import { useThemeToken } from '@idux/pro/theme'

import { type ProTreeProps, proTreeProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxProTree',
  props: proTreeProps,
  setup(props, { expose, slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('proTree')
    registerToken(getThemeTokens)

    const config = useGlobalConfig('tree')
    const locale = useGlobalConfig('locale')

    const mergedPrefixCls = computed(() => `${common.prefixCls}-tree`)
    const mergedClearIcon = computed(() => props.clearIcon ?? config.clearIcon)
    const mergedCollapseIcon = computed(() => props.collapseIcon ?? config.collapseIcon)

    /**
     * true: 显示展开全部  false：显示收起全部
     */
    const [expandAllBtnStatus, setExpandAllBtnStatus] = useState(false)
    const treeRef = ref<TreeInstance>()
    const elRef = ref<HTMLElement>()

    const [searchValue, setSearchValue] = useControlledProp(props, 'searchValue', '')
    const [expandedKeys, setExpandedKeys] = useControlledProp(props, 'expandedKeys', [])

    const { collapsed, animatedCollapsed, isAnimating, setCollapsed } = useCollapsedState(props, elRef)

    onMounted(() => {
      setExpandAllBtnStatusWithFlattedNodes()
    })

    watch(
      expandedKeys,
      () => {
        setExpandAllBtnStatusWithFlattedNodes()
      },
      {
        flush: 'post',
      },
    )

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value

      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-collapsed`]: animatedCollapsed.value,
        [`${prefixCls}-animating`]: isAnimating.value,
      })
    })

    const style = computed(() => {
      return normalizeStyle({
        width: collapsed.value ? `${props.collapsedWidth}px` : null,
      })
    })

    const handleExpandAll = () => {
      const currStatus = expandAllBtnStatus.value
      setExpandAllBtnStatus(!currStatus)
      currStatus ? treeRef.value?.expandAll() : treeRef.value?.collapseAll()
    }

    const handleCollapsed = () => {
      setCollapsed(!collapsed.value)
      callEmit(props.onCollapsed, !collapsed.value)
    }

    const handleInput = (evt: Event) => {
      const inputValue = (evt.target as HTMLInputElement).value
      setSearchValue(inputValue)
      callEmit(props.onSearch, inputValue)
    }

    const handleClear = (evt: Event) => {
      setSearchValue('')
      callEmit(props.onClear, evt)
    }

    /**
     * 根据当前的树状态来动态改变【展开/收起】按钮的状态，例如搜索或者改变 expandedKeys；
     * 若当前渲染的节点中存在展开的节点则按钮的操作为收起全部
     */
    const setExpandAllBtnStatusWithFlattedNodes = () => {
      const nodes = treeRef.value?._getFlattedNodes() ?? []
      const expandedKeysLength = expandedKeys.value.length

      let nextStatus = !expandAllBtnStatus.value

      // 若不存在expandedKeys，则需要将按钮设置为全部展开
      if (!expandedKeysLength) {
        nextStatus = true
      } else {
        // 若当前渲染的节点有一个存在于expandedKeys中时，则按钮需要设置收起全部
        nextStatus = !nodes.some(node => {
          return expandedKeys.value.includes(node.key)
        })
      }

      setExpandAllBtnStatus(nextStatus)
    }

    expose({
      collapseAll: () => treeRef.value?.collapseAll(),
      expandAll: () => treeRef.value?.expandAll(),
      getNode: (key: VKey) => treeRef.value?.getNode(key),
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      const treeProps = {
        checkedKeys: props.checkedKeys,
        expandedKeys: expandedKeys.value,
        selectedKeys: props.selectedKeys,
        loadedKeys: props.loadedKeys,

        autoHeight: true,
        blocked: true,
        childrenKey: props.childrenKey,
        checkable: props.checkable,
        checkOnClick: props.checkOnClick,
        cascaderStrategy: props.cascaderStrategy,
        customAdditional: props.customAdditional,
        dataSource: props.dataSource,
        disabled: props.disabled,
        draggable: props.draggable,
        draggableIcon: props.draggableIcon,
        droppable: props.droppable,
        expandIcon: props.expandIcon,
        empty: props.empty,
        getKey: props.getKey,
        height: props.height,
        labelKey: props.labelKey,
        leafLineIcon: props.leafLineIcon,
        showLine: props.showLine,
        searchValue: searchValue.value,
        selectable: props.selectable,
        searchFn: props.searchFn,
        virtual: props.virtual,
        virtualItemHeight: props.virtualItemHeight,

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
        'onUpdate:expandedKeys': setExpandedKeys,
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
      const showHeaderIcon = !isNil(collapsed.value)
      const showHeader = props.header || slots.header || showHeaderIcon
      return (
        <div ref={elRef} class={classes.value} style={style.value}>
          {showHeader && (
            <div class={`${prefixCls}-header-wrapper`}>
              <ɵHeader v-slots={slots} header={props.header} />
              {showHeaderIcon && (
                <IxIcon
                  class={`${prefixCls}-collapsed-icon`}
                  name={collapsed.value ? mergedCollapseIcon.value[1] : mergedCollapseIcon.value[0]}
                  onClick={handleCollapsed}
                />
              )}
            </div>
          )}
          {props.searchable ? (
            <div class={`${prefixCls}-search-wrapper`}>
              <IxButton
                size="xs"
                shape="square"
                title={expandAllBtnStatus.value ? locale.tree.expandAll : locale.tree.collapseAll}
                icon={expandAllBtnStatus.value ? 'expand-all' : 'collapse-all'}
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
          ) : (
            !collapsed.value && <IxDivider />
          )}
          <IxTree ref={treeRef} v-slots={treeSlots} {...treeProps} />
        </div>
      )
    }
  },
})

function useCollapsedState(props: ProTreeProps, elRef: Ref<HTMLElement | undefined>) {
  const [collapsed, setCollapsed] = useControlledProp(props, 'collapsed')
  const [delayedCollapsed, setDelayedCollapsed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const animatedCollapsed = computed(() => delayedCollapsed.value || isAnimating.value)

  const handleTransitionStart = (evt: TransitionEvent) => {
    if (!evt || evt.target !== elRef.value) {
      return
    }

    setIsAnimating(true)
  }
  const handleTransitionEnd = (evt: TransitionEvent) => {
    if (!evt || evt.target !== elRef.value) {
      return
    }

    setIsAnimating(false)
  }

  // delay the collapsed state so that animating state always changes before collapsed state
  // otherwise there will be a short tick when it's collpased and transition hasn't started yet
  // which will cause the tree to blink
  watch(collapsed, _collapsed => {
    setTimeout(() => {
      setDelayedCollapsed(!!_collapsed)
    })
  })

  useEventListener(elRef, 'transitionstart', handleTransitionStart)
  useEventListener(elRef, 'transitionend', handleTransitionEnd)
  useEventListener(elRef, 'transitioncancel', handleTransitionEnd)

  return {
    collapsed,
    animatedCollapsed,
    isAnimating,
    setCollapsed,
  }
}
