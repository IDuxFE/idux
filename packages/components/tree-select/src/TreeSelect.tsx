/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, ref, watch } from 'vue'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { type VirtualScrollToFn } from '@idux/cdk/scroll'
import { Logger, type VKey, useControlledProp, useState } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { ɵSelector, type ɵSelectorInstance } from '@idux/components/_private/selector'
import { useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister, useFormSize, useFormStatus } from '@idux/components/form'
import { ɵUseOverlayState } from '@idux/components/select'
import { type TreeInstance } from '@idux/components/tree'
import { useOverlayContainer } from '@idux/components/utils'

import { useMergeNodes } from './composables/useDataSource'
import { useGetNodeKey } from './composables/useGetNodeKey'
import { useSelectedState } from './composables/useSelectedState'
import Content from './content/Content'
import { treeSelectToken } from './token'
import { treeSelectProps } from './types'

const defaultOffset: [number, number] = [0, 8]

export default defineComponent({
  name: 'IxTreeSelect',
  inheritAttrs: false,
  props: treeSelectProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const locale = useGlobalConfig('locale')
    const config = useGlobalConfig('treeSelect')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tree-select`)
    const mergedOverlayContainer = useOverlayContainer(props, config, common, mergedPrefixCls)
    const mergedChildrenKey = computed(() => props.childrenKey ?? config.childrenKey)
    const mergedGetKey = useGetNodeKey(props, config)
    const mergedLabelKey = computed(() => props.labelKey ?? config.labelKey)

    const triggerRef = ref<ɵSelectorInstance>()
    const [inputValue, setInputValue] = useState('')
    const focus = () => triggerRef.value?.focus()
    const blur = () => triggerRef.value?.blur()
    const clearInput = () => {
      props.searchable === 'overlay' ? setInputValue('') : triggerRef.value?.clearInput()
    }

    const [expandedKeys, setExpandedKeys] = useControlledProp(props, 'expandedKeys', () => [])

    const { accessor, control } = useAccessorAndControl()
    useFormItemRegister(control)
    const mergedSize = useFormSize(props, config)
    const mergedStatus = useFormStatus(props, control)

    const { mergedNodeMap } = useMergeNodes(props, mergedChildrenKey, mergedGetKey, mergedLabelKey)
    const { selectedValue, selectedNodes, changeSelected, handleRemove, handleClear } = useSelectedState(
      props,
      accessor,
      mergedNodeMap,
    )
    const { overlayRef, overlayStyle, updateOverlay, overlayOpened, setOverlayOpened } = ɵUseOverlayState(
      props,
      config,
      triggerRef,
    )

    const treeRef = ref<TreeInstance>()
    const scrollTo: VirtualScrollToFn = options => {
      treeRef.value?.scrollTo(options)
    }

    expose({
      focus,
      blur,
      collapseAll: () => treeRef.value?.collapseAll(),
      expandAll: () => treeRef.value?.expandAll(),
      scrollTo,
      getNode: (key: VKey) => (treeRef.value ? treeRef.value.getNode(key) : mergedNodeMap.value.get(key)?.rawData),
    })

    watch(overlayOpened, opened => {
      opened && focus()
      clearInput()
    })

    const handleOverlayClick = () => {
      if (props.searchable !== 'overlay') {
        focus()
      }
    }

    const handleNodeClick = () => {
      if (props.multiple) {
        clearInput()
      } else {
        setOverlayOpened(false)
      }
    }

    const handleBlur = () => accessor.markAsBlurred()
    const handleItemRemove = (key: VKey) => {
      focus()
      handleRemove(key)
    }

    provide(treeSelectToken, {
      props,
      slots,
      config,
      locale,
      mergedPrefixCls,
      mergedChildrenKey,
      mergedGetKey,
      mergedLabelKey,
      expandedKeys,
      mergedNodeMap,
      inputValue,
      setInputValue,
      treeRef,
      accessor,
      setExpandedKeys,
      overlayOpened,
      setOverlayOpened,
      handleNodeClick,
      selectedValue,
      changeSelected,
    })

    const overlayClasses = computed(() => {
      const { overlayClassName, multiple } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-overlay`]: true,
        [`${prefixCls}-overlay-multiple`]: multiple,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const renderTrigger = () => (
      <ɵSelector
        ref={triggerRef}
        v-slots={slots}
        className={mergedPrefixCls.value}
        allowInput={false}
        autocomplete={props.autocomplete}
        autofocus={props.autofocus}
        borderless={props.borderless}
        clearable={props.clearable}
        clearIcon={props.clearIcon}
        config={config}
        dataSource={selectedNodes.value}
        disabled={accessor.disabled}
        maxLabel={props.maxLabelCount ?? props.maxLabel}
        multiple={props.multiple}
        opened={overlayOpened.value}
        placeholder={props.placeholder}
        readonly={props.readonly}
        searchable={props.searchable}
        size={mergedSize.value}
        status={mergedStatus.value}
        suffix={props.suffix}
        value={selectedValue.value}
        onBlur={handleBlur}
        onClear={handleClear}
        onInputValueChange={setInputValue}
        onItemRemove={handleItemRemove}
        //onKeydown={handleKeyDown}
        onOpenedChange={setOverlayOpened}
        onResize={updateOverlay}
        onSearch={props.onSearch}
        {...attrs}
      />
    )

    const renderContent = () => <Content onClick={handleOverlayClick} />

    if (__DEV__) {
      props.cascade &&
        Logger.warn(
          'components/tree-select',
          'the `cascade` and `checkStrategy` are deprecated, please use `cascaderStrategy` instead.',
        )
      if (props.maxLabelCount) {
        Logger.warn('components/tree-select', 'the `maxLabelCount` are deprecated, please use `maxLabel` instead.')
      }
      if (props.nodeKey) {
        Logger.warn('components/tree-select', 'the `nodeKey` are deprecated, please use `getKey` instead.')
      }
      if (props.target) {
        Logger.warn('components/tree-select', 'the `target` are deprecated, please use `overlayContainer` instead.')
      }
      if (props.dataSource?.some(data => data.additional)) {
        Logger.warn(
          'components/tree-select',
          'the `additional` of TreeNode was deprecated, please use `customAdditional` instead.',
        )
      }
    }

    return () => {
      const overlayProps = {
        class: overlayClasses.value,
        style: overlayStyle.value,
        clickOutside: true,
        container: mergedOverlayContainer.value,
        disabled: accessor.disabled || props.readonly,
        offset: defaultOffset,
        placement: 'bottomStart',
        trigger: 'manual',
        triggerId: attrs.id,
        visible: overlayOpened.value,
        'onUpdate:visible': setOverlayOpened,
      } as const

      const overlaySlots = { default: renderTrigger, content: renderContent }

      return <ɵOverlay ref={overlayRef} {...overlayProps} v-slots={overlaySlots} />
    }
  },
})
