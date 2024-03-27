/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, ref, watch } from 'vue'

import { isBoolean } from 'lodash-es'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { type VirtualScrollToFn } from '@idux/cdk/scroll'
import { type VKey, callEmit, useControlledProp, useState } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { type ControlTriggerSlots, IxControlTrigger } from '@idux/components/control-trigger'
import { useFormItemRegister, useFormSize, useFormStatus } from '@idux/components/form'
import { IxSelector, type SelectorInstance } from '@idux/components/selector'
import { IxSpin } from '@idux/components/spin'
import { useThemeToken } from '@idux/components/theme'
import { type TreeInstance } from '@idux/components/tree'
import { useGetKey } from '@idux/components/utils'

import { useMergeNodes } from './composables/useDataSource'
import { useSelectedState } from './composables/useSelectedState'
import Content from './content/Content'
import { treeSelectToken } from './token'
import { treeSelectProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxTreeSelect',
  inheritAttrs: false,
  props: treeSelectProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('treeSelect')
    registerToken(getThemeTokens)

    const locale = useGlobalConfig('locale')
    const config = useGlobalConfig('treeSelect')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tree-select`)
    const mergedChildrenKey = computed(() => props.childrenKey ?? config.childrenKey)
    const mergedGetKey = useGetKey(props, config, 'components/tree-select')
    const mergedLabelKey = computed(() => props.labelKey ?? config.labelKey)

    const triggerRef = ref<SelectorInstance>()
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
    const [overlayOpened, setOverlayOpened] = useControlledProp(props, 'open', false)

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
        setTimeout(focus)
      }
    }

    const handleNodeClick = () => {
      if (props.multiple) {
        clearInput()
      } else {
        setOverlayOpened(false)
      }
    }

    const handleFocus = (evt: FocusEvent) => {
      callEmit(props.onFocus, evt)
    }
    const handleBlur = (evt: FocusEvent) => {
      accessor.markAsBlurred()
      callEmit(props.onBlur, evt)
    }

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
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [`${prefixCls}-overlay`]: true,
        [`${prefixCls}-overlay-multiple`]: multiple,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const renderTrigger: ControlTriggerSlots['trigger'] = ({ focused, disabled, clearable, clearIcon, opened }) => [
      <IxSelector
        ref={triggerRef}
        v-slots={slots}
        class={mergedPrefixCls.value}
        allowInput={props.searchable === true ? 'searchable' : false}
        autocomplete={props.autocomplete}
        autofocus={props.autofocus}
        borderless={props.borderless}
        clearable={clearable}
        clearIcon={clearIcon}
        dataSource={selectedNodes.value}
        disabled={disabled}
        focused={focused}
        maxLabel={props.maxLabel}
        multiple={props.multiple}
        opened={opened}
        placeholder={props.placeholder}
        readonly={props.readonly}
        size={mergedSize.value}
        status={mergedStatus.value}
        suffix={props.suffix}
        onClear={handleClear}
        onInputValueChange={setInputValue}
        onItemRemove={handleItemRemove}
        {...attrs}
      />,
    ]

    const renderLoading = (children: JSX.Element) => {
      const { spin } = props
      const spinProps = isBoolean(spin) ? { spinning: spin } : spin
      return spinProps ? <IxSpin {...spinProps}>{children}</IxSpin> : children
    }

    const renderContent = () => renderLoading(<Content onMousedown={handleOverlayClick} />)

    return () => {
      const triggerProps = {
        autofocus: props.autofocus,
        clearable: props.clearable,
        clearIcon: props.clearIcon,
        disabled: accessor.disabled || props.readonly,
        readonly: props.readonly,
        value: selectedValue.value,
        open: overlayOpened.value,
        offset: props.offset ?? config.offset,
        overlayClassName: overlayClasses.value,
        overlayContainer: props.overlayContainer ?? config.overlayContainer,
        overlayContainerFallback: `.${mergedPrefixCls.value}-overlay-container`,
        overlayMatchWidth: props.overlayMatchWidth ?? config.overlayMatchWidth,
        'onUpdate:open': setOverlayOpened,
        onFocus: handleFocus,
        onBlur: handleBlur,
      }

      return <IxControlTrigger {...triggerProps} v-slots={{ trigger: renderTrigger, overlay: renderContent }} />
    }
  },
})
