/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, ref, toRaw, toRef, watch } from 'vue'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { type VKey, callEmit, useControlledProp, useState } from '@idux/cdk/utils'
import { ɵInput } from '@idux/components/_private/input'
import { useGlobalConfig } from '@idux/components/config'
import { ControlTriggerSlots, IxControlTrigger } from '@idux/components/control-trigger'
import { useFormItemRegister, useFormStatus } from '@idux/components/form'
import { IxSelector, type SelectorInstance } from '@idux/components/selector'
import { useThemeToken } from '@idux/components/theme'
import { useGetDisabled, useGetKey, useMergedCommonControlProps } from '@idux/components/utils'

import { useDataSource } from './composables/useDataSource'
import { usePanelProps } from './composables/usePanelProps'
import { useSelectedData } from './composables/useSelectedData'
import { useSelectedState } from './composables/useSelectedState'
import Panel from './panel/Panel'
import { CASCADER_PANEL_DATA_TOKEN } from './token'
import { cascaderProps } from './types'
import { getThemeTokens } from '../theme'

const defaultOffset: [number, number] = [0, 4]

export default defineComponent({
  name: 'IxCascader',
  inheritAttrs: false,
  props: cascaderProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('cascader')
    registerToken(getThemeTokens)

    const config = useGlobalConfig('cascader')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-cascader`)

    const mergedChildrenKey = computed(() => props.childrenKey ?? config.childrenKey)
    const mergedClearIcon = computed(() => props.clearIcon ?? config.clearIcon)
    const mergedFullPath = computed(() => props.fullPath ?? config.fullPath)
    const mergedGetKey = useGetKey(props, config, 'components/cascader')
    const mergedGetDisabled = useGetDisabled(props)
    const mergedLabelKey = computed(() => props.labelKey ?? config.labelKey)

    const triggerRef = ref<SelectorInstance>()
    const [inputValue, _setInputValue] = useState('')
    const setInputValue = (input: string) => {
      _setInputValue(input)
      props.searchable && callEmit(props.onSearch, input)
    }

    const focus = () => triggerRef.value?.focus()
    const blur = () => triggerRef.value?.blur()
    const clearInput = () => {
      props.searchable === 'overlay' ? setInputValue('') : triggerRef.value?.clearInput()
    }

    expose({ focus, blur })

    const [overlayOpened, setOverlayOpened] = useControlledProp(props, 'open')

    const { accessor, control } = useAccessorAndControl()
    const commonControlProps = useMergedCommonControlProps(props, config)
    useFormItemRegister(control)
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

    const handleOverlayMousedown = () => {
      if (props.searchable !== 'overlay') {
        setTimeout(focus)
      }
    }

    const onFocus = (evt: FocusEvent) => {
      callEmit(props.onFocus, evt)
    }
    const onBlur = (evt: FocusEvent) => {
      accessor.markAsBlurred()
      callEmit(props.onBlur, evt)
    }

    const handleItemRemove = (key: VKey) => {
      focus()
      selectedStateContext.handleSelect(key)
    }
    const handleClear = (evt: MouseEvent) => {
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
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [`${prefixCls}-overlay`]: true,
        [`${prefixCls}-overlay-multiple`]: multiple,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const renderTrigger: ControlTriggerSlots['trigger'] = ({
      borderless,
      status,
      clearable,
      clearIcon,
      readonly,
      disabled,
      size,
      suffix,
      suffixRotate,
      focused,
      opened,
    }) => [
      <IxSelector
        ref={triggerRef}
        v-slots={slots}
        class={mergedPrefixCls.value}
        allowInput={props.searchable === true ? 'searchable' : false}
        autocomplete={props.autocomplete}
        autofocus={props.autofocus}
        borderless={borderless}
        clearable={clearable}
        clearIcon={clearIcon}
        dataSource={selectedData.value}
        disabled={disabled}
        focused={focused}
        maxLabel={props.maxLabel}
        multiple={props.multiple}
        opened={opened}
        placeholder={props.placeholder}
        readonly={readonly}
        size={size}
        status={status}
        suffix={suffix}
        suffixRotate={suffixRotate}
        onClear={handleClear}
        onInputValueChange={setInputValue}
        onItemRemove={handleItemRemove}
      />,
    ]

    const panelProps = usePanelProps(props, inputValue, setOverlayOpened)
    const handleSearchInput = (evt: Event) => {
      const { value } = evt.target as HTMLInputElement
      setInputValue(value)
    }
    const handleSearchClear = () => {
      setInputValue('')
    }
    const renderContent = () => {
      const { searchable, overlayRender, searchPlaceholder } = props
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
              placeholder={searchPlaceholder}
              onClear={handleSearchClear}
              onInput={handleSearchInput}
            />
          </div>,
        )
      }

      return (
        <div tabindex={-1} onMousedown={handleOverlayMousedown}>
          {overlayRender ? overlayRender(children) : children}
        </div>
      )
    }

    return () => {
      const { suffix, borderless, clearIcon, size } = commonControlProps.value
      const controlTriggerProps = {
        autofocus: props.autofocus,
        overlayClassName: overlayClasses.value,
        overlayContainer: props.overlayContainer ?? config.overlayContainer,
        overlayContainerFallback: `.${mergedPrefixCls.value}-overlay-container`,
        overlayMatchWidth: props.overlayMatchWidth ?? config.overlayMatchWidth,
        class: mergedPrefixCls.value,
        borderless,
        value: resolvedSelectedKeys.value,
        offset: defaultOffset,
        open: overlayOpened.value,
        readonly: props.readonly,
        size,
        status: mergedStatus.value,
        suffix,
        clearable: props.clearable,
        clearIcon,
        disabled: accessor.disabled,
        onFocus,
        onBlur,
        'onUpdate:open': setOverlayOpened,
      }
      const controlTriggerSlots = {
        trigger: renderTrigger,
        overlay: renderContent,
      }
      return <IxControlTrigger v-slots={controlTriggerSlots} {...controlTriggerProps} {...attrs} />
    }
  },
})
