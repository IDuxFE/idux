/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, ref, watch } from 'vue'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { VKey, callEmit, useState } from '@idux/cdk/utils'
import { type ControlTriggerSlots, IxControlTrigger } from '@idux/components/control-trigger'
import { useFormItemRegister, useFormStatus } from '@idux/components/form'
import { IxSelector, type SelectorInstance } from '@idux/components/selector'
import { useMergedCommonControlProps } from '@idux/components/utils'
import { useGlobalConfig } from '@idux/pro/config'
import { useThemeToken } from '@idux/pro/theme'

import { useKeyboardEvents } from './composables/useKeyboardEvents'
import { useOperations } from './composables/useOperations'
import { useOverlayState } from './composables/useOverlayState'
import { usePanelActiveState } from './composables/usePanelActiveState'
import { useRemoveConfirm } from './composables/useRemoveConfirm'
import { useSelectConfirm } from './composables/useSelectConfirm'
import { useSelectedState } from './composables/useSelectedState'
import { useTagColors } from './composables/useTagColors'
import { useTagData } from './composables/useTagData'
import { useTagEdit } from './composables/useTagEdit'
import SelectedTag from './content/SelectedTag'
import TagDataRemoveConfirmModal from './content/TagDataRemoveConfirmModal'
import TagSelectPanel from './content/TagSelectPanel'
import { proTagSelectContext } from './token'
import { proTagSelectProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxProTagSelect',
  inheritAttrs: false,
  props: proTagSelectProps,
  setup(props, { expose, slots, attrs }) {
    const commonConfig = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('proTagSelect')
    registerToken(getThemeTokens)

    const locales = useGlobalConfig('locale')
    const config = useGlobalConfig('tagSelect')
    const { accessor, control } = useAccessorAndControl()
    const commonControlProps = useMergedCommonControlProps(props, config)
    useFormItemRegister(control)
    const mergedStatus = useFormStatus(props, control)

    const [focused, setFocused] = useState(false)

    const mergedPrefixCls = computed(() => `${commonConfig.prefixCls}-tag-select`)

    const triggerRef = ref<SelectorInstance>()
    const focus = () => triggerRef.value?.focus()
    const blur = () => triggerRef.value?.blur()

    const tagColorsContext = useTagColors(props, locales.tagSelect)
    const tagDataContext = useTagData(props, tagColorsContext)
    const overlayStateContext = useOverlayState(props)
    const tagEditContext = useTagEdit(overlayStateContext)
    const selectedStateContext = useSelectedState(props, accessor, tagDataContext)
    const selectConfirmContext = useSelectConfirm(props, tagDataContext, selectedStateContext, overlayStateContext)
    const removeConfirmContext = useRemoveConfirm(tagDataContext, selectedStateContext, overlayStateContext)
    const operationContext = useOperations(
      tagDataContext,
      selectConfirmContext,
      removeConfirmContext,
      selectedStateContext,
    )
    const panelActiveStateContext = usePanelActiveState(tagDataContext, selectedStateContext)
    const handleKeydown = useKeyboardEvents(
      props,
      tagDataContext,
      selectedStateContext,
      selectConfirmContext,
      overlayStateContext,
      panelActiveStateContext,
      operationContext,
    )

    const { mergedData, inputValue, setInputValue } = tagDataContext
    const { selectedData, selectedValue } = selectedStateContext
    const { dataToSelect, handleTagSelectCancel } = selectConfirmContext
    const { dataToEdit } = tagEditContext
    const { overlayOpened, setOverlayOpened, setEditPanelOpened } = overlayStateContext
    const { handleTagClear } = operationContext

    const mergedSelectedData = computed(() => {
      const data = [...selectedData.value]

      if (dataToSelect.value) {
        data.push(dataToSelect.value)
      }

      return data
    })

    watch(mergedData, data => {
      if (
        (focused.value || overlayOpened.value) &&
        dataToEdit.value &&
        data.findIndex(item => item.key === dataToEdit.value?.key) < 0
      ) {
        setEditPanelOpened(false)
        setTimeout(() => {
          triggerRef.value?.focus()
        })
      }
    })
    provide(proTagSelectContext, {
      triggerRef,
      props,
      focused,
      mergedPrefixCls,
      locale: locales.tagSelect,
      mergedTagSelectColors: tagColorsContext.mergedTagSelectColors,
      maxExceeded: selectedStateContext.maxExceeded,
      selectedValue,
      ...tagDataContext,
      ...tagEditContext,
      ...operationContext,
      ...overlayStateContext,
      ...panelActiveStateContext,
    })

    expose({ focus, blur })

    const clearInput = () => {
      triggerRef.value?.clearInput()
    }

    const onFocus = (evt: FocusEvent) => {
      setFocused(true)
      callEmit(props.onFocus, evt)
    }
    const onBlur = (evt: FocusEvent) => {
      setFocused(false)
      clearInput()

      if (props.confirmBeforeSelect !== 'force' && dataToSelect.value) {
        handleTagSelectCancel()
      }

      accessor.markAsBlurred()
      callEmit(props.onBlur, evt)
    }

    const overlayClasses = computed(() => {
      const { overlayClassName } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [`${prefixCls}-overlay`]: true,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const renderSelectorItem = (options: {
      disabled?: boolean
      prefixCls: string
      removable?: boolean
      value?: VKey
    }) => <SelectedTag {...options} v-slots={slots} />

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
        v-slots={{
          selectedItem: renderSelectorItem,
          placeholder: slots.placeholder,
          suffix: slots.suffix,
          clearIcon: slots.clearIcon,
        }}
        class={mergedPrefixCls.value}
        input={inputValue.value}
        allowInput={true}
        borderless={borderless}
        clearable={clearable}
        clearIcon={clearIcon}
        dataSource={mergedSelectedData.value}
        disabled={disabled}
        focused={focused}
        maxLabel={props.maxTags}
        multiple={true}
        opened={opened}
        placeholder={props.placeholder}
        readonly={readonly}
        size={size}
        status={status}
        suffix={suffix}
        suffixRotate={suffixRotate}
        onClear={handleTagClear}
        onInputValueChange={setInputValue}
      />,
    ]

    const renderContent: ControlTriggerSlots['overlay'] = () => {
      return [<TagSelectPanel v-slots={slots} />, <TagDataRemoveConfirmModal v-slots={slots} />]
    }

    return () => {
      const { suffix, borderless, clearIcon, size } = commonControlProps.value
      const controlTriggerProps = {
        autofocus: false,
        overlayClassName: overlayClasses.value,
        overlayContainer: props.overlayContainer,
        overlayContainerFallback: `${mergedPrefixCls.value}-overlay-container`,
        overlayMatchWidth: props.overlayMatchWidth,
        class: [mergedPrefixCls.value, globalHashId.value, hashId.value],
        borderless,
        value: selectedValue.value,
        open: overlayOpened.value,
        readonly: props.readonly,
        size,
        status: mergedStatus.value,
        suffix,
        clearable: props.clearable,
        clearIcon,
        disabled: accessor.disabled,
        onKeydown: handleKeydown,
        onFocus,
        onBlur,
        'onUpdate:open': setOverlayOpened,
      }

      return (
        <IxControlTrigger
          v-slots={{ trigger: renderTrigger, overlay: renderContent }}
          {...controlTriggerProps}
          {...attrs}
        />
      )
    }
  },
})
