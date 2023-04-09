/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, ref, toRaw, toRef, watch } from 'vue'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { type VKey, callEmit, useState } from '@idux/cdk/utils'
import { ɵInput } from '@idux/components/_private/input'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { ɵSelector, type ɵSelectorInstance } from '@idux/components/_private/selector'
import { useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister, useFormSize, useFormStatus } from '@idux/components/form'
import { ɵUseOverlayState } from '@idux/components/select'
import { useGetDisabled, useGetKey } from '@idux/components/utils'

import { useDataSource } from './composables/useDataSource'
import { usePanelProps } from './composables/usePanelProps'
import { useSelectedData } from './composables/useSelectedData'
import { useSelectedState } from './composables/useSelectedState'
import Panel from './panel/Panel'
import { CASCADER_PANEL_DATA_TOKEN } from './token'
import { cascaderProps } from './types'

const defaultOffset: [number, number] = [0, 4]

export default defineComponent({
  name: 'IxCascader',
  inheritAttrs: false,
  props: cascaderProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('cascader')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-cascader`)

    const mergedChildrenKey = computed(() => props.childrenKey ?? config.childrenKey)
    const mergedClearIcon = computed(() => props.clearIcon ?? config.clearIcon)
    const mergedFullPath = computed(() => props.fullPath ?? config.fullPath)
    const mergedGetKey = useGetKey(props, config, 'components/cascader')
    const mergedGetDisabled = useGetDisabled(props)
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
    const mergedSize = useFormSize(props, config)
    const mergedStatus = useFormStatus(props, control)

    const dataSourceContext = useDataSource(props, mergedGetKey, mergedChildrenKey, mergedLabelKey, mergedFullPath)
    const { mergedDataMap } = dataSourceContext
    const selectedStateContext = useSelectedState(
      mergedDataMap,
      mergedFullPath,
      mergedGetDisabled,
      toRef(props, 'multiple'),
      toRef(props, 'strategy'),
      toRef(accessor, 'value'),
      keys => {
        const oldKeys = toRaw(accessor.value)
        accessor.setValue(keys)

        callEmit(props.onChange, keys, oldKeys)
      },
    )
    const { resolvedSelectedKeys, setValue } = selectedStateContext
    const selectedData = useSelectedData(resolvedSelectedKeys, mergedDataMap)

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
    const handleClear = (evt: MouseEvent) => {
      evt.stopPropagation()
      setValue([])
      callEmit(props.onClear, evt)
    }

    provide(CASCADER_PANEL_DATA_TOKEN, {
      ...dataSourceContext,
      ...selectedStateContext,
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
        clearIcon={mergedClearIcon.value}
        config={config}
        dataSource={selectedData.value}
        disabled={accessor.disabled}
        maxLabel={props.maxLabel}
        multiple={props.multiple}
        opened={overlayOpened.value}
        placeholder={props.placeholder}
        readonly={props.readonly}
        searchable={props.searchable}
        size={mergedSize.value}
        status={mergedStatus.value}
        suffix={props.suffix}
        value={resolvedSelectedKeys.value}
        onBlur={handleBlur}
        onClear={handleClear}
        onInputValueChange={setInputValue}
        onItemRemove={handleItemRemove}
        onOpenedChange={setOverlayOpened}
        onResize={updateOverlay}
        onSearch={props.onSearch}
        {...attrs}
      />
    )

    const panelProps = usePanelProps(props, inputValue, setOverlayOpened)
    const handleSearchInput = (evt: Event) => {
      const { value } = evt.target as HTMLInputElement
      setInputValue(value)
      props.searchable && callEmit(props.onSearch, value)
    }
    const handleSearchClear = () => setInputValue('')
    const renderContent = () => {
      const { searchable, overlayRender } = props
      const searchValue = inputValue.value
      const prefixCls = mergedPrefixCls.value
      const panelSlots = { empty: slots.empty, optionLabel: slots.optionLabel }

      const children = [
        <div key="__content" class={`${prefixCls}-overlay-content`}>
          <Panel {...panelProps.value} v-slots={panelSlots} />
        </div>,
      ]

      if (searchable === 'overlay') {
        children.unshift(
          <div key="__search-wrapper" class={`${prefixCls}-overlay-search-wrapper`}>
            <ɵInput
              clearable
              clearIcon={mergedClearIcon.value}
              clearVisible={!!searchValue}
              size="sm"
              suffix="search"
              value={searchValue}
              onClear={handleSearchClear}
              onInput={handleSearchInput}
            />
          </div>,
        )
      }

      return <div onClick={handleOverlayClick}>{overlayRender ? overlayRender(children) : children}</div>
    }

    return () => {
      const overlayProps = {
        class: overlayClasses.value,
        clickOutside: true,
        container: props.overlayContainer ?? config.overlayContainer,
        containerFallback: `.${mergedPrefixCls.value}-overlay-container`,
        disabled: accessor.disabled || props.readonly,
        offset: defaultOffset,
        placement: 'bottomStart',
        transitionName: `${common.prefixCls}-slide-auto`,
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
