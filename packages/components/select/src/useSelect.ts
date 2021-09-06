/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComputedRef, Ref } from 'vue'
import type { OverlayOptions } from '@idux/cdk/overlay'
import type { SelectConfig } from '@idux/components/config'
import type IxSelectInput from './SelectInput.vue'
import type { SelectOptionProps, SelectOption, SelectProps } from './types'

import { computed, getCurrentInstance, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { useOverlay } from '@idux/cdk/overlay'
import { offResize, onResize, convertArray } from '@idux/cdk/utils'
import { useValueAccessor } from '@idux/cdk/forms'
import { useFormItemRegister } from '@idux/components/form'
import { selectToken } from './token'

export interface SelectOverlay {
  triggerRef: Ref<HTMLElement | null>
  overlayRef: Ref<HTMLElement | null>
  visibility: ComputedRef<boolean>
  show: (showDelay?: number) => void
  hide: (hideDelay?: number) => void
  overlayMinWidth: Ref<string>
  overlayMaxHeight: ComputedRef<string>
}

export const useSelectOverlay = (props: SelectProps): SelectOverlay => {
  const options: OverlayOptions = {
    scrollStrategy: 'reposition',
    placement: 'bottom',
    trigger: 'manual',
    offset: [0, 8],
    hideDelay: 0,
    showDelay: 0,
  }
  const overlay = useOverlay<HTMLElement, HTMLElement>(options)
  const { triggerRef, overlayRef, initialize, destroy, visibility, show, hide, update } = overlay

  const overlayMinWidth = ref('')
  const overlayMaxHeight = computed(() => {
    // todo const size = props.size || config.size
    // const size = props.size || config.size
    // const optionHeightMap = { large: 40, medium: 32, small: 24 }
    const optionItemHight = 32
    const optionMaxShowCount = 8
    const optionContainerPadding = 8
    return optionItemHight * optionMaxShowCount + optionContainerPadding + 'px'
  })

  const syncWidth = () => {
    overlayMinWidth.value = triggerRef.value?.getBoundingClientRect().width + 'px'
  }

  const onTargetResize = () => {
    syncWidth()
    if (props.multiple) {
      update()
    }
  }

  onMounted(() => {
    initialize()
    syncWidth()
    onResize(triggerRef.value!, onTargetResize)
    watch(
      () => props.open,
      open => (open ? show() : hide()),
      { immediate: true },
    )
    if (props.autofocus) {
      show(100)
    }
  })

  onUnmounted(() => {
    offResize(triggerRef.value!, onTargetResize)
    destroy()
  })

  return { triggerRef, overlayRef, visibility, show, hide, overlayMinWidth, overlayMaxHeight }
}

export const useSelectOptions = (props: SelectProps, config: SelectConfig): ComputedRef<SelectOption[]> => {
  return computed(() => {
    const originalOptions = props.options || []
    const labelKey = props.labelKey || config.labelKey
    const valueKey = props.valueKey || config.valueKey

    const options: SelectOption[] = []
    const groupMap = new Map<string, SelectOption>()
    originalOptions.forEach(option => {
      const item: SelectOption = { label: option[labelKey], value: option[valueKey], disabled: option.disabled }
      const groupLabel = option.groupLabel
      if (groupLabel) {
        if (groupMap.has(groupLabel)) {
          groupMap.get(groupLabel)!.children.push(item)
        } else {
          const groupOption = { label: groupLabel, value: groupLabel, children: [item] }
          groupMap.set(groupLabel, groupOption)
        }
      } else {
        options.push(item)
      }
    })

    groupMap.forEach(groupOption => options.push(groupOption))

    return options
  })
}

export interface SelectValueAccessor {
  disabled: ComputedRef<boolean>
  inputValue: Ref<string>
  activatedValue: Ref<any>
  selectedValue: Ref<any[]>
  showItem: Ref<boolean>
  showPlaceholder: Ref<boolean>
  isActive: Ref<boolean>
  onClear: (evt: MouseEvent) => void
  onItemDelete: (item: SelectOptionProps) => void
  onCompositionStart: (evt: CompositionEvent) => void
  onCompositionEnd: (evt: CompositionEvent) => void
  onInputValueChange: (value: string) => void
  onFocus: (evt: FocusEvent) => void
  onBlur: (evt: Event) => void
}

export const useSelectValueAccessor = (props: SelectProps): SelectValueAccessor => {
  const { emit } = getCurrentInstance()!
  const { accessor } = useValueAccessor()
  useFormItemRegister()
  const disabled = computed(() => accessor.disabled)
  const inputValue = ref('')
  const selectedValue = ref<any[]>(convertArray(accessor.value))
  const activatedValue = ref(null) as Ref<any>

  const isComposing = ref(false)
  const showItem = ref(false)
  const showPlaceholder = ref(true)

  const updateVariable = () => {
    const isEmpty = selectedValue.value.length === 0
    showItem.value = props.multiple || (!isEmpty && !isComposing.value && !inputValue.value)
    showPlaceholder.value = isEmpty && !isComposing.value && !inputValue.value
  }

  const onClear = (evt: MouseEvent) => {
    selectedValue.value = []
    updateVariable()
    emit('clear', evt)
  }

  const onItemDelete = (item: SelectOptionProps) => {
    selectedValue.value = selectedValue.value.filter(value => !props.compareWith(item.value, value))
  }

  const onCompositionStart = (evt: CompositionEvent) => {
    isComposing.value = true
    updateVariable()
    emit('compositionstart', evt)
  }
  const onCompositionEnd = (evt: CompositionEvent) => {
    if (isComposing.value) {
      isComposing.value = false
      updateVariable()
    }
    emit('compositionend', evt)
  }

  const onInputValueChange = (value: string) => {
    if (value !== inputValue.value) {
      inputValue.value = value
      updateVariable()
      emit('inputChange', value)
    }
  }

  const isActive = ref(false)
  const onFocus = (evt: FocusEvent) => {
    isActive.value = true
    emit('focus', evt)
  }
  const onBlur = (evt: Event) => {
    accessor.markAsBlurred?.()
    isActive.value = false
    emit('blur', evt)
  }

  watch(
    () => accessor.value,
    value => {
      const valueList = convertArray(value)
      if (valueList.length !== 0 || selectedValue.value.length !== 0) {
        selectedValue.value = valueList
        updateVariable()
      }
    },
  )

  watch(
    () => selectedValue.value,
    value => {
      const _value = props.multiple ? value : value[0]
      if (accessor.value !== _value) {
        accessor.setValue?.(_value)
        emit('change', _value)
      }
    },
  )

  onMounted(() => {
    updateVariable()
  })

  return {
    disabled,
    inputValue,
    activatedValue,
    selectedValue,
    showItem,
    showPlaceholder,
    isActive,
    onClear,
    onItemDelete,
    onCompositionStart,
    onCompositionEnd,
    onInputValueChange,
    onFocus,
    onBlur,
  }
}

export const useSelectClasses = (
  props: SelectProps,
  config: SelectConfig,
  visibility: Ref<boolean>,
  isActive: Ref<boolean>,
  disabled: ComputedRef<boolean>,
): ComputedRef<Record<string, boolean>> => {
  return computed(() => {
    const multiple = props.multiple
    const borderless = props.borderless ?? config.borderless
    const clearable = props.clearable ?? config.clearable
    const searchable = props.searchable ?? config.searchable
    const size = props.size ?? config.size
    const suffix = props.suffix ?? config.suffix
    const _disabled = disabled.value
    return {
      'ix-select': true,
      'ix-select-single': !multiple,
      'ix-select-multiple': multiple,
      'ix-select-opened': visibility.value,
      'ix-select-active': isActive.value,
      'ix-select-borderless': borderless,
      'ix-select-disabled': _disabled,
      'ix-select-clearable': !_disabled && clearable,
      'ix-select-searchable': !_disabled && (searchable || multiple),
      'ix-select-show-suffix': !!suffix || !multiple,
      [`ix-select-${size}`]: true,
    }
  })
}

interface SelectInput {
  selectInput: Ref<typeof IxSelectInput | null>
  focus: () => void
  blur: () => void
  clear: () => void
}

export const useSelectInput = (): SelectInput => {
  const selectInput = ref<typeof IxSelectInput | null>(null)

  const focus = () => {
    selectInput.value?.focus()
  }

  const blur = () => {
    selectInput.value?.blur()
  }

  const clear = () => {
    selectInput.value?.clear()
  }
  return { selectInput, focus, blur, clear }
}

export const useSelectProvider = (
  props: SelectProps,
  inputValue: Ref<string>,
  activatedValue: Ref<any>,
  selectedValue: Ref<any[]>,
  selectedOptions: Ref<SelectOptionProps[]>,
  hide: (hideDelay?: number) => void,
  focus: () => void,
  clear: () => void,
): void => {
  const activateHandler = (value: any) => {
    activatedValue.value = value
  }

  const selectHandler = (value: any) => {
    const currentSelected = selectedValue.value
    const targetIndex = currentSelected.findIndex(item => props.compareWith(item, value))
    if (!props.multiple) {
      if (targetIndex === -1) {
        selectedValue.value = [value]
      }
      hide()
    } else {
      if (targetIndex === -1) {
        if (currentSelected.length < props.multipleLimit) {
          selectedValue.value = [...currentSelected, value]
        }
      } else {
        selectedValue.value = currentSelected.filter((_, index) => index !== targetIndex)
      }
      focus()
      clear()
    }
  }

  const selectOptionHandler = (selected: boolean, option: SelectOptionProps) => {
    let currentSelectedOptions = selectedOptions.value
    const targetIndex = currentSelectedOptions.findIndex(item => props.compareWith(item.value, option.value))
    if (!props.multiple) {
      if (selected) {
        currentSelectedOptions = [option]
      } else {
        if (targetIndex > -1) {
          currentSelectedOptions = []
        }
      }
    } else {
      if (selected) {
        currentSelectedOptions = targetIndex === -1 ? [...currentSelectedOptions, option] : currentSelectedOptions
      } else {
        currentSelectedOptions =
          targetIndex > -1 ? currentSelectedOptions.filter((_, index) => index !== targetIndex) : currentSelectedOptions
      }
    }
    selectedOptions.value = currentSelectedOptions
  }

  provide(selectToken, {
    selectProps: props,
    inputValue,
    activatedValue,
    activateHandler,
    selectedValue,
    selectHandler,
    selectOptionHandler,
  })
}
