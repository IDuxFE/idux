/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, ref, watch } from 'vue'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { type VKey, useState } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { ɵSelector, type ɵSelectorInstance } from '@idux/components/_private/selector'
import { useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister } from '@idux/components/form'
import { ɵUseOverlayState } from '@idux/components/select'
import { useGetKey, useOverlayContainer } from '@idux/components/utils'

import { useActiveState } from './composables/useActiveState'
import { useDataSource } from './composables/useDataSource'
import { useExpandable } from './composables/useExpandable'
import { useSearchable } from './composables/useSearchable'
import { useSelectedState } from './composables/useSelectedState'
import OverlayContent from './contents/OverlayContent'
import { cascaderToken } from './token'
import { cascaderProps } from './types'

const defaultOffset: [number, number] = [0, 8]

export default defineComponent({
  name: 'IxCascader',
  inheritAttrs: false,
  props: cascaderProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('cascader')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-cascader`)
    const mergedOverlayContainer = useOverlayContainer(props, config, common, mergedPrefixCls)

    const mergedChildrenKey = computed(() => props.childrenKey ?? config.childrenKey)
    const mergedClearIcon = computed(() => props.clearIcon ?? config.clearIcon)
    const mergedExpandIcon = computed(() => props.expandIcon ?? config.expandIcon)
    const mergedFullPath = computed(() => props.fullPath ?? config.fullPath)
    const mergedGetKey = useGetKey(props, config, 'components/cascader')
    const mergedLabelKey = computed(() => props.labelKey ?? config.labelKey)

    const triggerRef = ref<ɵSelectorInstance>()
    const [inputValue, setInputValue] = useState('')
    const focus = () => triggerRef.value?.focus()
    const blur = () => triggerRef.value?.blur()
    const clearInput = () => {
      props.searchable === 'overlay' ? setInputValue('') : triggerRef.value?.clearInput()
    }

    expose({ focus, blur })

    const { overlayRef, updateOverlay, overlayOpened, setOverlayOpened } = ɵUseOverlayState(props, config, triggerRef)

    const { accessor, control } = useAccessorAndControl()
    useFormItemRegister(control)

    const { mergedData, mergedDataMap } = useDataSource(
      props,
      mergedGetKey,
      mergedChildrenKey,
      mergedLabelKey,
      mergedFullPath,
    )
    const activeStateContext = useActiveState(props, mergedDataMap)
    const selectedStateContext = useSelectedState(props, accessor, mergedDataMap, mergedFullPath)
    const { searchedData } = useSearchable(props, mergedLabelKey, mergedDataMap, inputValue)
    const expandableContext = useExpandable(
      props,
      mergedGetKey,
      mergedChildrenKey,
      mergedLabelKey,
      mergedFullPath,
      mergedDataMap,
    )

    watch(overlayOpened, opened => {
      opened && focus()
      clearInput()
    })

    const handleOverlayClick = () => {
      if (props.searchable !== 'overlay') {
        focus()
      }
    }

    const handleBlur = () => accessor.markAsBlurred()
    const handleItemRemove = (key: VKey) => {
      focus()
      selectedStateContext.handleSelect(key)
    }

    provide(cascaderToken, {
      props,
      slots,
      config,
      mergedPrefixCls,
      mergedChildrenKey,
      mergedClearIcon,
      mergedExpandIcon,
      mergedFullPath,
      mergedGetKey,
      mergedLabelKey,
      accessor,
      inputValue,
      setInputValue,
      overlayOpened,
      setOverlayOpened,
      mergedData,
      mergedDataMap,
      ...activeStateContext,
      ...selectedStateContext,
      searchedData,
      ...expandableContext,
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
        dataSource={selectedStateContext.selectedData.value}
        disabled={accessor.disabled}
        maxLabel={props.maxLabel}
        multiple={props.multiple}
        opened={overlayOpened.value}
        placeholder={props.placeholder}
        readonly={props.readonly}
        searchable={props.searchable}
        size={props.size}
        suffix={props.suffix}
        value={selectedStateContext.selectedKeys.value}
        onBlur={handleBlur}
        onClear={selectedStateContext.handleClear}
        onInputValueChange={setInputValue}
        onItemRemove={handleItemRemove}
        //onKeydown={handleKeyDown}
        onOpenedChange={setOverlayOpened}
        onResize={updateOverlay}
        onSearch={props.onSearch}
        {...attrs}
      />
    )

    const renderContent = () => <OverlayContent onClick={handleOverlayClick} />

    return () => {
      const overlayProps = {
        class: overlayClasses.value,
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
